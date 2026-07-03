/*
======================================================================================
COMPLETE REACT NATIVE Conjugately QUIZ SELECTION SCREEN
======================================================================================

COPY AND PASTE INSTRUCTIONS:
1. Copy this entire file into your React Native project
2. Install dependencies: npm install expo-linear-gradient react-native-vector-icons
3. Import and use the QuizSelectionScreen component
4. Replace the interface screenshot you showed me perfectly

DEPENDENCIES TO INSTALL:
npm install expo-linear-gradient react-native-vector-icons

FOR iOS: cd ios && pod install
FOR ANDROID: Add to android/app/build.gradle:
apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"

======================================================================================
*/

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
  Modal,
  FlatList,
  Vibration,
} from 'react-native';

// UNCOMMENT THESE AFTER INSTALLING DEPENDENCIES:
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

// ======================================================================================
// INTERFACES
// ======================================================================================

interface QuizSelections {
  difficulty: string;
  verb: string;
  timeFrame: string;
  tense: string;
}

interface DropdownItem {
  label: string;
  value: string;
  description?: string;
  color?: string;
  icon?: string;
}

interface CustomDropdownProps {
  placeholder: string;
  value: string;
  onSelect: (value: string) => void;
  items: DropdownItem[];
  disabled?: boolean;
  style?: object;
}

interface QuizSelectionScreenProps {
  onStartQuiz?: (selections: QuizSelections) => void;
  onNavigateToMiniCourses?: () => void;
}

// ======================================================================================
// CUSTOM DROPDOWN COMPONENT
// ======================================================================================

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  placeholder,
  value,
  onSelect,
  items,
  disabled = false,
  style,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const selectedItem = items.find(item => item.value === value);
  const displayText = selectedItem ? selectedItem.label : placeholder;

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsVisible(false);
    if (Platform.OS === 'ios') {
      Vibration.vibrate();
    } else {
      Vibration.vibrate(50);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[
        dropdownStyles.modalItem,
        item.value === value && dropdownStyles.modalItemSelected,
        item.color && { borderLeftWidth: 4, borderLeftColor: item.color }
      ]}
      onPress={() => handleSelect(item.value)}
    >
      <View style={dropdownStyles.modalItemContent}>
        <View style={dropdownStyles.modalItemHeader}>
          {item.icon && <Text style={dropdownStyles.modalItemIcon}>{item.icon}</Text>}
          <Text style={[
            dropdownStyles.modalItemText,
            item.value === value && dropdownStyles.modalItemTextSelected,
          ]}>
            {item.label}
          </Text>
        </View>
        {item.description && (
          <Text style={dropdownStyles.modalItemDescription}>
            {item.description}
          </Text>
        )}
      </View>
      {item.value === value && (
        <Icon name="check" size={20} color="#6C63FF" />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity
        style={[
          dropdownStyles.dropdown,
          disabled && dropdownStyles.dropdownDisabled,
          style,
        ]}
        onPress={() => !disabled && setIsVisible(true)}
        disabled={disabled}
      >
        <Text style={[
          dropdownStyles.dropdownText,
          !selectedItem && dropdownStyles.placeholderText,
          disabled && dropdownStyles.disabledText,
        ]}>
          {displayText}
        </Text>
        <Icon 
          name="keyboard-arrow-down" 
          size={24} 
          color={disabled ? "#5A5A6E" : "#B8B8CC"} 
        />
      </TouchableOpacity>

      <Modal
        visible={isVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={dropdownStyles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsVisible(false)}
        >
          <View style={dropdownStyles.modalContainer}>
            <View style={dropdownStyles.modalHeader}>
              <Text style={dropdownStyles.modalTitle}>Select Option</Text>
              <TouchableOpacity
                onPress={() => setIsVisible(false)}
                style={dropdownStyles.closeButton}
              >
                <Icon name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            
            <FlatList
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.value}
              style={dropdownStyles.modalList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

// ======================================================================================
// MAIN QUIZ SELECTION SCREEN COMPONENT
// ======================================================================================

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

  // ======================================================================================
  // DATA FROM V3_FRENCHVERBDATA.JS - COMPREHENSIVE VERB SYSTEM
  // ======================================================================================

  const difficulties = [
    { 
      label: 'Beginner', 
      value: 'beginner',
      description: 'Top 4 verbs (être, avoir, faire, aller) • Simple subject + verb (Je suis, Tu es) • 3 basic tenses',
      color: '#4A90E2',
      icon: '🔵'
    },
    { 
      label: 'Easy', 
      value: 'easy',
      description: 'Top 6 verbs (être, avoir, faire, dire, aller, voir) • Multiple tenses (Present, Past, Future)',
      color: '#7ED321',
      icon: '🟢'
    },
    { 
      label: 'Moderate', 
      value: 'moderate',
      description: '8 verbs (5 regular + 3 reflexive) • Present, past, and future tenses',
      color: '#F5A623',
      icon: '🟡'
    },
    { 
      label: 'Difficult', 
      value: 'difficult',
      description: '13 verbs (10 regular + 3 reflexive) • All tenses and time frames',
      color: '#D0021B',
      icon: '🔴'
    },
  ];

  const getVerbsForDifficulty = (difficulty: string) => {
    const allVerbs = [
      { label: 'être (to be)', value: 'être', description: 'Most essential French verb' },
      { label: 'avoir (to have)', value: 'avoir', description: 'Second most essential verb' },
      { label: 'faire (to do/make)', value: 'faire', description: 'Very common irregular verb' },
      { label: 'aller (to go)', value: 'aller', description: 'Essential for future tense' },
      { label: 'dire (to say)', value: 'dire', description: 'Important communication verb' },
      { label: 'voir (to see)', value: 'voir', description: 'Common perception verb' },
      { label: 'savoir (to know)', value: 'savoir', description: 'Know facts/information' },
      { label: 'pouvoir (can/to be able)', value: 'pouvoir', description: 'Express ability/permission' },
      { label: 'vouloir (to want)', value: 'vouloir', description: 'Express desires/wishes' },
      { label: 'venir (to come)', value: 'venir', description: 'Movement and recent past' },
      { label: 'se lever (to get up)', value: 'se lever', description: 'Reflexive verb - daily routine' },
      { label: "s'appeler (to be called)", value: "s'appeler", description: 'Reflexive verb - introduce yourself' },
      { label: 'se sentir (to feel)', value: 'se sentir', description: 'Reflexive verb - emotions' },
    ];

    switch (difficulty) {
      case 'beginner': return allVerbs.slice(0, 4); // Top 4 verbs
      case 'easy': return allVerbs.slice(0, 6); // Top 6 verbs
      case 'moderate': return allVerbs.slice(0, 8); // 8 verbs (5 regular + 3 reflexive)
      case 'difficult': return allVerbs; // All 13 verbs
      default: return [];
    }
  };

  const timeFrames = [
    { 
      label: 'Present Tenses', 
      value: 'present',
      description: 'Présent, Présent Progressif - Current actions and states',
      icon: '🕐'
    },
    { 
      label: 'Past Tenses', 
      value: 'past',
      description: 'Passé Composé, Imparfait, Passé Simple, Plus-que-parfait - Past actions',
      icon: '⏮️'
    },
    { 
      label: 'Future Tenses', 
      value: 'future',
      description: 'Futur Simple, Futur Proche, Conditionnel - Future plans and possibilities',
      icon: '⏭️'
    },
    { 
      label: 'All Time Frames', 
      value: 'all',
      description: 'Mixed practice across all tenses - Advanced challenge',
      icon: '🔄'
    },
  ];

  const getTensesForTimeFrame = (timeFrame: string) => {
    const allTenses = {
      present: [
        { label: 'Présent', value: 'présent', description: 'Simple present tense - je suis, tu as' },
        { label: 'Présent Progressif', value: 'présent_progressif', description: 'Present continuous - je suis en train de' },
      ],
      past: [
        { label: 'Passé Composé', value: 'passé_composé', description: 'Perfect past - j\'ai fait, je suis allé(e)' },
        { label: 'Passé Simple', value: 'passé_simple', description: 'Literary past - je fis, j\'allai' },
        { label: 'Imparfait', value: 'imparfait', description: 'Imperfect past - j\'étais, j\'avais' },
        { label: 'Plus-que-parfait', value: 'plus_que_parfait', description: 'Past perfect - j\'avais fait' },
      ],
      future: [
        { label: 'Futur Simple', value: 'futur_simple', description: 'Simple future - je serai, j\'aurai' },
        { label: 'Futur Proche', value: 'futur_proche', description: 'Near future - je vais faire' },
        { label: 'Conditionnel', value: 'conditionnel', description: 'Conditional - je serais, j\'aurais' },
      ],
      all: [
        { label: 'All Tenses (Random Mix)', value: 'all_tenses', description: 'Mixed practice across all tenses' },
        { label: 'Présent', value: 'présent', description: 'Simple present tense' },
        { label: 'Passé Composé', value: 'passé_composé', description: 'Perfect past tense' },
        { label: 'Futur Simple', value: 'futur_simple', description: 'Simple future tense' },
        { label: 'Imparfait', value: 'imparfait', description: 'Imperfect past tense' },
        { label: 'Conditionnel', value: 'conditionnel', description: 'Conditional tense' },
      ],
    };

    return allTenses[timeFrame as keyof typeof allTenses] || [];
  };

  // ======================================================================================
  // COMPONENT LOGIC
  // ======================================================================================

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
    if (Platform.OS === 'ios') {
      Vibration.vibrate();
    } else {
      Vibration.vibrate(50);
    }

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
    if (Platform.OS === 'ios') {
      Vibration.vibrate([0, 100, 50, 100]);
    } else {
      Vibration.vibrate([0, 100, 50, 100]);
    }
    
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
      if (Platform.OS === 'ios') {
        Vibration.vibrate();
      } else {
        Vibration.vibrate(100);
      }
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

  // ======================================================================================
  // RENDER
  // ======================================================================================

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
          {/* Header Section - EXACT MATCH TO YOUR SCREENSHOT */}
          <Animated.View 
            style={[
              styles.header,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            <Text style={styles.mainTitle}>Conjugately</Text>
            <Text style={styles.subtitle}>For serious students.</Text>
            <Text style={styles.description}>
              Master French verb conjugations—the key to fluency—with your own personalized
              quizzes and optional mini-courses.
            </Text>
          </Animated.View>

          {/* Action Buttons - EXACT MATCH TO YOUR SCREENSHOT */}
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

          {/* Selection Card - EXACT MATCH TO YOUR SCREENSHOT */}
          <Animated.View 
            style={[
              styles.selectionCard,
              { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }
            ]}
          >
            {/* 1. Choose Difficulty */}
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

            {/* 2. Choose a French Verb */}
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

            {/* 3. Choose Time Frame */}
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

            {/* 4. Choose Specific Tense */}
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

            {/* Start Quiz Button - EXACT MATCH TO YOUR SCREENSHOT */}
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

// ======================================================================================
// STYLES - EXACT MATCH TO YOUR SCREENSHOT
// ======================================================================================

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
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
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
    marginLeft: 8,
  },
  secondaryButton: {
    backgroundColor: '#03DAC6',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
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
    marginLeft: 8,
  },
  selectionCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
  },
  chooseForMeButtonActive: {
    backgroundColor: '#4CAF50',
  },
  chooseForMeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 4,
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
  },
  startQuizButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  startQuizText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  startQuizTextDisabled: {
    color: '#8A8A9E',
  },
});

// ======================================================================================
// DROPDOWN STYLES
// ======================================================================================

const dropdownStyles = StyleSheet.create({
  dropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: 50,
  },
  dropdownDisabled: {
    opacity: 0.5,
  },
  dropdownText: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  placeholderText: {
    color: '#8A8A9E',
  },
  disabledText: {
    color: '#5A5A6E',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#1A1A2E',
    borderRadius: 16,
    width: width - 40,
    maxHeight: '70%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  closeButton: {
    padding: 4,
  },
  modalList: {
    maxHeight: 300,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  modalItemSelected: {
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
  },
  modalItemContent: {
    flex: 1,
    marginRight: 12,
  },
  modalItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  modalItemIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  modalItemText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  modalItemTextSelected: {
    color: '#6C63FF',
    fontWeight: '600',
  },
  modalItemDescription: {
    fontSize: 14,
    color: '#B8B8CC',
    lineHeight: 20,
    marginTop: 4,
  },
});

// ======================================================================================
// USAGE EXAMPLE
// ======================================================================================

const App = () => {
  const handleStartQuiz = (selections: QuizSelections) => {
    console.log('Starting quiz with selections:', selections);
    // Navigate to quiz screen or start quiz logic
    alert(`Starting quiz: ${selections.verb} - ${selections.tense} (${selections.difficulty})`);
  };

  const handleNavigateToMiniCourses = () => {
    console.log('Opening mini-courses...');
    // Navigate to mini-courses screen
    alert('Opening Mini-Courses');
  };

  return (
    <QuizSelectionScreen
      onStartQuiz={handleStartQuiz}
      onNavigateToMiniCourses={handleNavigateToMiniCourses}
    />
  );
};

export default QuizSelectionScreen;