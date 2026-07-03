// Comprehensive Grammar Check Script for Conjugately
// Tests all difficulty levels and identifies grammar issues in generated questions

import { execSync } from 'child_process';

const testCases = [
  // Beginner Level Tests
  { verb: 'être', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Beginner', label: 'Beginner Past (être)' },
  { verb: 'être', timeFrame: 'present', tenseType: 'Présent', difficulty: 'Beginner', label: 'Beginner Present (être)' },
  { verb: 'être', timeFrame: 'future', tenseType: 'Futur Simple', difficulty: 'Beginner', label: 'Beginner Future (être)' },
  { verb: 'avoir', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Beginner', label: 'Beginner Past (avoir)' },
  { verb: 'avoir', timeFrame: 'present', tenseType: 'Présent', difficulty: 'Beginner', label: 'Beginner Present (avoir)' },
  { verb: 'avoir', timeFrame: 'future', tenseType: 'Futur Simple', difficulty: 'Beginner', label: 'Beginner Future (avoir)' },
  { verb: 'faire', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Beginner', label: 'Beginner Past (faire)' },
  { verb: 'faire', timeFrame: 'present', tenseType: 'Présent', difficulty: 'Beginner', label: 'Beginner Present (faire)' },
  { verb: 'faire', timeFrame: 'future', tenseType: 'Futur Simple', difficulty: 'Beginner', label: 'Beginner Future (faire)' },

  // Easy Level Tests
  { verb: 'être', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Easy', label: 'Easy Past (être)' },
  { verb: 'être', timeFrame: 'present', tenseType: 'Présent', difficulty: 'Easy', label: 'Easy Present (être)' },
  { verb: 'être', timeFrame: 'future', tenseType: 'Futur Simple', difficulty: 'Easy', label: 'Easy Future (être)' },
  { verb: 'avoir', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Easy', label: 'Easy Past (avoir)' },
  { verb: 'aller', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Easy', label: 'Easy Past (aller)' },
  { verb: 'faire', timeFrame: 'present', tenseType: 'Présent', difficulty: 'Easy', label: 'Easy Present (faire)' },

  // Moderate Level Tests  
  { verb: 'être', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Moderate', label: 'Moderate Past (être)' },
  { verb: 'avoir', timeFrame: 'present', tenseType: 'Présent', difficulty: 'Moderate', label: 'Moderate Present (avoir)' },
  { verb: 'faire', timeFrame: 'future', tenseType: 'Futur Simple', difficulty: 'Moderate', label: 'Moderate Future (faire)' },
  { verb: 'dire', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Moderate', label: 'Moderate Past (dire)' },
  { verb: 'aller', timeFrame: 'present', tenseType: 'Présent', difficulty: 'Moderate', label: 'Moderate Present (aller)' },
  { verb: 'voir', timeFrame: 'future', tenseType: 'Futur Simple', difficulty: 'Moderate', label: 'Moderate Future (voir)' },

  // Difficult Level Tests
  { verb: 'être', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Difficult', label: 'Difficult Past (être)' },
  { verb: 'avoir', timeFrame: 'present', tenseType: 'Présent', difficulty: 'Difficult', label: 'Difficult Present (avoir)' },
  { verb: 'faire', timeFrame: 'future', tenseType: 'Futur Simple', difficulty: 'Difficult', label: 'Difficult Future (faire)' },
  { verb: 'dire', timeFrame: 'past', tenseType: 'Imparfait', difficulty: 'Difficult', label: 'Difficult Imparfait (dire)' },
  { verb: 'se lever', timeFrame: 'present', tenseType: 'Présent', difficulty: 'Difficult', label: 'Difficult Present (se lever)' },
  { verb: 's\'appeler', timeFrame: 'past', tenseType: 'Passé Composé', difficulty: 'Difficult', label: 'Difficult Past (s\'appeler)' }
];

// Grammar issue patterns to detect
const grammarIssues = [
  // Past tense "was/were" issues
  { pattern: /You \(informal\) was/, issue: 'Should be "You (informal) were"' },
  { pattern: /We was/, issue: 'Should be "We were"' },
  { pattern: /They.*was/, issue: 'Should be "They were"' },
  
  // Negation issues with "didn't"
  { pattern: /didn't did/, issue: 'Should be "didn\'t do"' },
  { pattern: /didn't made/, issue: 'Should be "didn\'t make"' },
  { pattern: /didn't went/, issue: 'Should be "didn\'t go"' },
  { pattern: /didn't saw/, issue: 'Should be "didn\'t see"' },
  { pattern: /didn't said/, issue: 'Should be "didn\'t say"' },
  
  // "Had" negation issues
  { pattern: /don't.*had/, issue: 'Should be "didn\'t have"' },
  { pattern: /doesn't.*had/, issue: 'Should be "didn\'t have"' },
  
  // Double negation issues
  { pattern: /won't don't/, issue: 'Double negation error' },
  { pattern: /didn't don't/, issue: 'Double negation error' },
  
  // "Used to" negation issues
  { pattern: /used to don't/, issue: 'Should be "didn\'t use to"' },
  { pattern: /used to doesn't/, issue: 'Should be "didn\'t use to"' },
  
  // Auxiliary verb issues
  { pattern: /I don't was/, issue: 'Should be "I wasn\'t"' },
  { pattern: /He don't was/, issue: 'Should be "He wasn\'t"' },
  { pattern: /She don't was/, issue: 'Should be "She wasn\'t"' }
];

// Function to test a single case
async function testGrammarCase(testCase) {
  try {
    const curlCommand = `curl -s -X POST http://localhost:5000/api/get-quiz -H "Content-Type: application/json" -d '${JSON.stringify(testCase)}'`;
    const response = execSync(curlCommand, { encoding: 'utf-8' });
    const data = JSON.parse(response);
    const questions = data.quiz?.questions || [];
    
    const issues = [];
    
    // Check each question for grammar issues
    questions.forEach((q, index) => {
      const question = q.question;
      if (!question) return;
      
      grammarIssues.forEach(issuePattern => {
        if (issuePattern.pattern.test(question)) {
          issues.push({
            questionIndex: index + 1,
            question: question,
            issue: issuePattern.issue
          });
        }
      });
    });
    
    return {
      label: testCase.label,
      questionsChecked: questions.length,
      issues: issues
    };
    
  } catch (error) {
    return {
      label: testCase.label,
      questionsChecked: 0,
      issues: [],
      error: error.message
    };
  }
}

// Main function to run all tests
async function runGrammarCheck() {
  console.log('🔍 Starting Comprehensive Grammar Check...\n');
  
  const results = [];
  let totalIssues = 0;
  
  for (const testCase of testCases) {
    console.log(`Testing: ${testCase.label}...`);
    const result = await testGrammarCase(testCase);
    results.push(result);
    
    if (result.error) {
      console.log(`❌ Error: ${result.error}`);
    } else if (result.issues.length > 0) {
      console.log(`⚠️  Found ${result.issues.length} grammar issues:`);
      result.issues.forEach(issue => {
        console.log(`   Q${issue.questionIndex}: "${issue.question}" - ${issue.issue}`);
      });
      totalIssues += result.issues.length;
    } else {
      console.log(`✅ No grammar issues found (${result.questionsChecked} questions checked)`);
    }
    console.log('');
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  // Summary
  console.log('📊 GRAMMAR CHECK SUMMARY');
  console.log('========================');
  console.log(`Total test cases: ${testCases.length}`);
  console.log(`Total grammar issues found: ${totalIssues}`);
  
  if (totalIssues === 0) {
    console.log('🎉 All grammar checks passed! No issues found.');
  } else {
    console.log(`🔧 ${totalIssues} grammar issues need to be fixed.`);
    
    // Group issues by type
    const issuesByType = {};
    results.forEach(result => {
      result.issues.forEach(issue => {
        const issueType = issue.issue;
        if (!issuesByType[issueType]) {
          issuesByType[issueType] = 0;
        }
        issuesByType[issueType]++;
      });
    });
    
    console.log('\n📈 Issues by type:');
    Object.entries(issuesByType).forEach(([type, count]) => {
      console.log(`   ${type}: ${count} occurrences`);
    });
  }
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { runGrammarCheck, testCases, grammarIssues };
}

// Run if called directly
if (typeof require !== 'undefined' && require.main === module) {
  runGrammarCheck().catch(console.error);
}