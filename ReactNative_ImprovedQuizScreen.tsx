import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
  StatusBar,
  Animated,
  Vibration,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDropdown from './ReactNative_CustomDropdown';

const { width, height } = Dimensions.get('window');

interface QuizSelectionScreenProps {
  onStartQuiz?: (selections: QuizSelections) => void;
  onNavigateToMiniCourses?: () => void;
}

interface QuizSelections {
  difficulty: string;
  verb: string;
  timeFrame: string;
  tense: string;
}

const QuizSelectionScreen: React.FC<QuizSelectionScreenProps> = ({
  onStartQuiz,
  onNavigateToMiniCourses,
}) => {
  // Animation values
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  // State for dropdown selections
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [selectedVerb, setSelectedVerb] = useState<string>('');
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<string>('');
  const [selectedTense, setSelectedTense] = useState<string>('');

  // Auto-selection states for "Choose for me" buttons
  const [difficultyChosen, setDifficultyChosen] = useState<boolean>(false);
  const [verbChosen, setVerbChosen] = useState<boolean>(false);
  const [timeFrameChosen, setTimeFrameChosen] = useState<boolean>(false);
  const [tenseChosen, setTenseChosen] = useState<boolean>(false);

  // Data arrays from V3_frenchVerbData.js
  const difficulties = [
    { label: 'Beginner (4 verbs: être, avoir, faire, aller)', value: 'beginner' },
    { label: 'Easy (6 verbs: + dire, voir)', value: 'easy' },
    { label: 'Moderate (8 verbs: + savoir, pouvoir)', value: 'moderate' },
    { label: 'Difficult (13 verbs: + 5 reflexive verbs)', value: 'difficult' },
  ];

  const getVerbsForDifficulty = (difficulty: string) => {
    const allVerbs = [
      { label: 'être (to be)', value: 'être' },
      { label: 'avoir (to have)', value: 'avoir' },
      { label: 'faire (to do/make)', value: 'faire' },
      { label: 'aller (to go)', value: 'aller' },
      { label: 'dire (to say)', value: 'dire' },
      { label: 'voir (to see)', value: 'voir' },
      { label: 'savoir (to know)', value: 'savoir' },
      { label: 'pouvoir (can/to be able)', value: 'pouvoir' },
      { label: 'vouloir (to want)', value: 'vouloir' },
      { label: 'venir (to come)', value: 'venir' },
      { label: 'se lever (to get up)', value: 'se lever' },
      { label: "s'appeler (to be called)", value: "s'appeler" },
      { label: 'se sentir (to feel)', value: 'se sentir' },
    ];

    switch (difficulty) {
      case 'beginner': return allVerbs.slice(0, 4);
      case 'easy': return allVerbs.slice(0, 6);
      case 'moderate': return allVerbs.slice(0, 8);
      case 'difficult': return allVerbs;
      default: return [];
    }
  };

  const timeFrames = [
    { label: 'Present Tenses (Présent, Présent Progressif)', value: 'present' },
    { label: 'Past Tenses (Passé Composé, Imparfait, etc.)', value: 'past' },
    { label: 'Future Tenses (Futur Simple, Futur Proche)', value: 'future' },
    { label: 'All Time Frames (Mixed Practice)', value: 'all' },
  ];

  const getTensesForTimeFrame = (timeFrame: string) => {
    const allTenses = {
      present: [
        { label: 'Présent', value: 'présent' },
        { label: 'Présent Progressif', value: 'présent_progressif' },
      ],
      past: [
        { label: 'Passé Composé', value: 'passé_composé' },
        { label: 'Passé Simple', value: 'passé_simple' },
        { label: 'Imparfait', value: 'imparfait' },
        { label: 'Plus-que-parfait', value: 'plus_que_parfait' },
      ],
      future: [
        { label: 'Futur Simple', value: 'futur_simple' },
        { label: 'Futur Proche', value: 'futur_proche' },
        { label: 'Conditionnel', value: 'conditionnel' },
      ],
      all: [
        { label: 'All Tenses (Random Mix)', value: 'all_tenses' },
        { label: 'Présent', value: 'présent' },
        { label: 'Passé Composé', value: 'passé_composé' },
        { label: 'Futur Simple', value: 'futur_simple' },
        { label: 'Imparfait', value: 'imparfait' },
        { label: 'Conditionnel', value: 'conditionnel' },
      ],
    };

    return allTenses[timeFrame as keyof typeof allTenses] || [];
  };

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleChooseForMe = (type: 'difficulty' | 'verb' | 'timeframe' | 'tense') => {
    // Haptic feedback
    Vibration.vibrate(50);

    switch (type) {
      case 'difficulty':
        setSelectedDifficulty('moderate');
        setDifficultyChosen(true);
        // Auto-select verb after difficulty
        setTimeout(() => {
          setSelectedVerb('être');
          setVerbChosen(true);
        }, 300);
        break;
      case 'verb':
        if (selectedDifficulty) {
          const availableVerbs = getVerbsForDifficulty(selectedDifficulty);
          setSelectedVerb(availableVerbs[0]?.value || 'être');
          setVerbChosen(true);
        }
        break;
      case 'timeframe':
        setSelectedTimeFrame('present');
        setTimeFrameChosen(true);
        // Auto-select tense after timeframe
        setTimeout(() => {
          setSelectedTense('présent');
          setTenseChosen(true);
        }, 300);
        break;
      case 'tense':
        const availableTenses = getTensesForTimeFrame(selectedTimeFrame);
        setSelectedTense(availableTenses[0]?.value || 'présent');
        setTenseChosen(true);
        break;
    }
  };

  const handleChooseAllForMe = () => {
    Vibration.vibrate([0, 100, 50, 100]);
    
    // Animated sequence for all selections
    setSelectedDifficulty('moderate');
    setDifficultyChosen(true);
    
    setTimeout(() => {
      setSelectedVerb('être');
      setVerbChosen(true);
    }, 200);
    
    setTimeout(() => {
      setSelectedTimeFrame('present');
      setTimeFrameChosen(true);
    }, 400);
    
    setTimeout(() => {
      setSelectedTense('présent');
      setTenseChosen(true);
    }, 600);
  };

  const isFormComplete = () => {
    return selectedDifficulty && selectedVerb && selectedTimeFrame && selectedTense;
  };

  const handleStartQuiz = () => {
    if (isFormComplete() && onStartQuiz) {
      Vibration.vibrate(100);
      onStartQuiz({
        difficulty: selectedDifficulty,
        verb: selectedVerb,
        timeFrame: selectedTimeFrame,
        tense: selectedTense,
      });
    }
  };

  const renderDropdown = (
    title: string,
    placeholder: string,
    value: string,
    onValueChange: (value: string) => void,
    items: Array<{ label: string; value: string }>,
    disabled: boolean = false,
    chooseForMeType?: 'difficulty' | 'verb' | 'timeframe' | 'tense',
    isChosen?: boolean
  ) => (
    <Animated.View 
      style={[
        styles.dropdownContainer,
        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
      ]}
    >
      <View style={styles.dropdownHeader}>
        <Text style={styles.dropdownTitle}>{title}</Text>
        {chooseForMeType && (
          <TouchableOpacity
            style={[
              styles.chooseForMeButton,
              isChosen && styles.chooseForMeButtonActive,
            ]}
            onPress={() => handleChooseForMe(chooseForMeType)}
          >
            <Icon 
              name={isChosen ? "check" : "auto-awesome"} 
              size={16} 
              color="#FFFFFF" 
            />
            <Text style={styles.chooseForMeText}>
              {isChosen ? "Chosen" : "Choose for me"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      
      <CustomDropdown
        placeholder={placeholder}
        value={value}
        onSelect={onValueChange}
        items={items}
        disabled={disabled}
        style={disabled && styles.dropdownDisabled}
      />
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4C1D95" />
      <LinearGradient
        colors={['#4C1D95', '#7C3AED', '#A855F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={true}
        >
          {/* Header Section */}
          <Animated.View 
            style={[
              styles.header,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            <Text style={styles.mainTitle}>French Verb Master</Text>
            <Text style={styles.subtitle}>For serious students.</Text>
            <Text style={styles.description}>
              Master French verb conjugations—the key to fluency—with your own personalized
              quizzes and optional mini-courses.
            </Text>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View 
            style={[
              styles.actionButtons,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={handleChooseAllForMe}
            >
              <Icon name="auto-awesome" size={20} color="#FFFFFF" />
              <Text style={styles.primaryButtonText}>Choose All for Me</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={onNavigateToMiniCourses}
            >
              <Icon name="school" size={20} color="#FFFFFF" />
              <Text style={styles.secondaryButtonText}>Mini-Courses</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Selection Card */}
          <Animated.View 
            style={[
              styles.selectionCard,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            {/* Difficulty Selection */}
            {renderDropdown(
              '1. Choose Difficulty',
              'Select difficulty level...',
              selectedDifficulty,
              setSelectedDifficulty,
              difficulties,
              false,
              'difficulty',
              difficultyChosen
            )}

            {/* Verb Selection */}
            {renderDropdown(
              '2. Choose a French Verb',
              selectedDifficulty ? 'Choose a verb...' : 'Choose difficulty first...',
              selectedVerb,
              setSelectedVerb,
              getVerbsForDifficulty(selectedDifficulty),
              !selectedDifficulty,
              'verb',
              verbChosen
            )}

            {/* Time Frame Selection */}
            {renderDropdown(
              '3. Choose Time Frame',
              'Select time frame...',
              selectedTimeFrame,
              setSelectedTimeFrame,
              timeFrames,
              false,
              'timeframe',
              timeFrameChosen
            )}

            {/* Tense Selection */}
            {renderDropdown(
              '4. Choose Specific Tense',
              selectedTimeFrame ? 'Select tense type...' : 'Choose time frame first...',
              selectedTense,
              setSelectedTense,
              getTensesForTimeFrame(selectedTimeFrame),
              !selectedTimeFrame,
              'tense',
              tenseChosen
            )}

            {/* Start Quiz Button */}
            <Animated.View style={{ opacity: fadeAnim }}>
              <TouchableOpacity
                style={[
                  styles.startQuizButton,
                  !isFormComplete() && styles.startQuizButtonDisabled,
                ]}
                onPress={handleStartQuiz}
                disabled={!isFormComplete()}
              >
                <Icon 
                  name={isFormComplete() ? "play-arrow" : "info"} 
                  size={20} 
                  color={isFormComplete() ? "#FFFFFF" : "#8A8A9E"} 
                />
                <Text style={[
                  styles.startQuizText,
                  !isFormComplete() && styles.startQuizTextDisabled,
                ]}>
                  {isFormComplete() ? "Start Quiz (20 Questions)" : "Complete all selections to start quiz"}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: -0.5,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '400',
    color: '#E0E7FF',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#C7D2FE',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  primaryButton: {
    backgroundColor: '#6C63FF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#03DAC6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    gap: 8,
    shadowColor: '#03DAC6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  selectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
  },
  dropdownContainer: {
    marginBottom: 24,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dropdownTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  chooseForMeButton: {
    backgroundColor: '#BB86FC',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  chooseForMeButtonActive: {
    backgroundColor: '#4CAF50',
  },
  chooseForMeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  dropdownDisabled: {
    opacity: 0.5,
  },
  startQuizButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  startQuizButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  startQuizText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  startQuizTextDisabled: {
    color: '#8A8A9E',
  },
});

export default QuizSelectionScreen;