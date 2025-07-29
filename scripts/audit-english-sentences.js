// Comprehensive English Sentence Audit Script
// Extracts all English sentences from quiz generation system for validation

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Import the quiz generator to access QUESTION_CONTEXTS
const quizGenerator = require('../server/quiz-generator.ts');

// All verbs in the system
const VERBS = ['être', 'avoir', 'faire', 'aller', 'voir', 'dire', 'savoir', 'pouvoir', 'vouloir', 'venir'];

// All tenses supported
const TENSES = ['Présent', 'Passé Composé', 'Passé Simple', 'Imparfait', 'Plus-que-parfait', 'Conditionnel', 'Futur Simple'];

// All difficulty levels
const DIFFICULTIES = ['Beginner', 'Easy', 'Moderate', 'Difficult'];

// All pronouns
const PRONOUNS = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles'];

async function auditAllEnglishSentences() {
  console.log('🔍 Starting comprehensive English sentence audit...');
  
  const allSentences = new Set();
  const issues = [];
  
  try {
    // Read the quiz generator file to extract QUESTION_CONTEXTS
    const quizGeneratorContent = fs.readFileSync(path.join(__dirname, '../server/quiz-generator.ts'), 'utf8');
    
    // Extract QUESTION_CONTEXTS using regex
    const contextMatch = quizGeneratorContent.match(/const QUESTION_CONTEXTS = \{([\s\S]*?)\};/);
    if (!contextMatch) {
      throw new Error('Could not find QUESTION_CONTEXTS in quiz-generator.ts');
    }
    
    // Parse each verb's contexts
    const verbContexts = {};
    VERBS.forEach(verb => {
      const verbMatch = quizGeneratorContent.match(new RegExp(`${verb}:\\s*\\[([\s\S]*?)\\]`, 'g'));
      if (verbMatch) {
        const contexts = [];
        const contextArray = verbMatch[0].match(/\{\s*en:\s*"([^"]+)"/g);
        if (contextArray) {
          contextArray.forEach(match => {
            const sentence = match.match(/en:\s*"([^"]+)"/)[1];
            contexts.push(sentence);
            allSentences.add(sentence);
          });
        }
        verbContexts[verb] = contexts;
      }
    });
    
    console.log(`📊 Found ${allSentences.size} unique English sentences`);
    
    // Analyze each sentence for common grammar issues
    allSentences.forEach(sentence => {
      // Check for third-person singular errors
      if (/\b(He|She)\s+(see|do|go|say|know|want|come|have)\b(?!s)/.test(sentence)) {
        issues.push({
          type: 'Third-person singular missing',
          sentence: sentence,
          issue: 'Missing "s" on third-person singular verb'
        });
      }
      
      // Check for incorrect contractions
      if (/\b(will\s+don't|will\s+doesn't|didn't\s+goes|didn't\s+does)\b/.test(sentence)) {
        issues.push({
          type: 'Incorrect contraction',
          sentence: sentence,
          issue: 'Malformed negative construction'
        });
      }
      
      // Check for double negatives
      if (/\b(don't\s+not|doesn't\s+not|won't\s+not)\b/.test(sentence)) {
        issues.push({
          type: 'Double negative',
          sentence: sentence,
          issue: 'Double negative construction'
        });
      }
      
      // Check for subject-verb disagreement
      if (/\b(We|They)\s+(is|was)\b/.test(sentence)) {
        issues.push({
          type: 'Subject-verb disagreement',
          sentence: sentence,
          issue: 'Plural subject with singular verb'
        });
      }
    });
    
    // Generate comprehensive report
    const report = {
      totalSentences: allSentences.size,
      verbBreakdown: verbContexts,
      issues: issues,
      allSentences: Array.from(allSentences).sort(),
      timestamp: new Date().toISOString()
    };
    
    // Write detailed report
    fs.writeFileSync(
      path.join(__dirname, '../english-sentence-audit.json'), 
      JSON.stringify(report, null, 2)
    );
    
    // Write human-readable summary
    let summary = `# English Sentence Audit Report\nGenerated: ${new Date().toLocaleString()}\n\n`;
    summary += `## Summary\n`;
    summary += `- Total unique sentences: ${allSentences.size}\n`;
    summary += `- Grammar issues found: ${issues.length}\n\n`;
    
    if (issues.length > 0) {
      summary += `## Issues Found\n\n`;
      issues.forEach((issue, index) => {
        summary += `### Issue ${index + 1}: ${issue.type}\n`;
        summary += `**Sentence:** "${issue.sentence}"\n`;
        summary += `**Problem:** ${issue.issue}\n\n`;
      });
    }
    
    summary += `## All English Sentences\n\n`;
    Array.from(allSentences).sort().forEach((sentence, index) => {
      summary += `${index + 1}. "${sentence}"\n`;
    });
    
    fs.writeFileSync(
      path.join(__dirname, '../english-sentence-audit.md'), 
      summary
    );
    
    console.log(`✅ Audit complete!`);
    console.log(`📝 Reports saved:`);
    console.log(`   - english-sentence-audit.json (detailed data)`);
    console.log(`   - english-sentence-audit.md (human-readable)`);
    console.log(`📊 Summary: ${allSentences.size} sentences, ${issues.length} issues`);
    
    return report;
    
  } catch (error) {
    console.error('❌ Audit failed:', error.message);
    throw error;
  }
}

// Run the audit if called directly
auditAllEnglishSentences()
  .then(report => {
    if (report.issues.length > 0) {
      console.log(`\n⚠️  Found ${report.issues.length} grammar issues that need fixing`);
      process.exit(1);
    } else {
      console.log('\n✅ No grammar issues found!');
      process.exit(0);
    }
  })
  .catch(error => {
    console.error('💥 Audit script failed:', error);
    process.exit(1);
  });

export { auditAllEnglishSentences };