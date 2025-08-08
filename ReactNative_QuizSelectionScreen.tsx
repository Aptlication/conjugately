import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');

interface QuizSelectionScreenProps {
  onStartQuiz?: () => void;
  onNavigateToMiniCourses?: () => void;
}

const QuizSelectionScreen: React.FC<QuizSelectionScreenProps> = ({
  onStartQuiz,
  onNavigateToMiniCourses,
}) => {
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

  // Data arrays - using the comprehensive data from V3_frenchVerbData.js
  const difficulties = [
    { label: 'Beginner (4 verbs)', value: 'beginner' },
    { label: 'Easy (6 verbs)', value: 'easy' },
    { label: 'Moderate (8 verbs)', value: 'moderate' },
    { label: 'Difficult (13 verbs)', value: 'difficult' },
  ];

  const verbs = [
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

  const timeFrames = [
    { label: 'Present Tenses', value: 'present' },
    { label: 'Past Tenses', value: 'past' },
    { label: 'Future Tenses', value: 'future' },
    { label: 'All Time Frames', value: 'all' },
  ];

  const tenses = [
    { label: 'Présent', value: 'présent' },
    { label: 'Passé Composé', value: 'passé_composé' },
    { label: 'Passé Simple', value: 'passé_simple' },
    { label: 'Imparfait', value: 'imparfait' },
    { label: 'Plus-que-parfait', value: 'plus_que_parfait' },
    { label: 'Conditionnel', value: 'conditionnel' },
    { label: 'Futur Simple', value: 'futur_simple' },
    { label: 'Futur Proche', value: 'futur_proche' },
    { label: 'Présent Progressif', value: 'présent_progressif' },
  ];

  const handleChooseForMe = (type: 'difficulty' | 'verb' | 'timeframe' | 'tense') => {
    switch (type) {
      case 'difficulty':
        setSelectedDifficulty('moderate');
        setDifficultyChosen(true);
        break;
      case 'verb':
        if (selectedDifficulty) {
          setSelectedVerb('être');
          setVerbChosen(true);
        }
        break;
      case 'timeframe':
        setSelectedTimeFrame('present');
        setTimeFrameChosen(true);
        break;
      case 'tense':
        setSelectedTense('présent');
        setTenseChosen(true);
        break;
    }
  };

  const isFormComplete = () => {
    return selectedDifficulty && selectedVerb && selectedTimeFrame && selectedTense;
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
    <View style={styles.dropdownContainer}>
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
            <Text style={styles.chooseForMeText}>Choose for me</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={[styles.pickerContainer, disabled && styles.pickerDisabled]}>
        <Picker
          selectedValue={value}
          onValueChange={onValueChange}
          style={styles.picker}
          dropdownIconColor="#B8B8CC"
          enabled={!disabled}
        >
          <Picker.Item 
            label={placeholder} 
            value="" 
            color="#8A8A9E"
          />
          {items.map((item) => (
            <Picker.Item
              key={item.value}
              label={item.label}
              value={item.value}
              color="#FFFFFF"
            />
          ))}
        </Picker>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#4C1D95', '#7C3AED', '#A855F7']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Section */}
          <View style={styles.header}>
            <Text style={styles.mainTitle}>French Verb Master</Text>
            <Text style={styles.subtitle}>For serious students.</Text>
            <Text style={styles.description}>
              Master French verb conjugations—the key to fluency—with your own personalized
              quizzes and optional mini-courses.
            </Text>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton}>
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
          </View>

          {/* Selection Card */}
          <View style={styles.selectionCard}>
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
              'Choose difficulty first...',
              selectedVerb,
              setSelectedVerb,
              verbs,
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
              'Select tense type...',
              selectedTense,
              setSelectedTense,
              tenses,
              false,
              'tense',
              tenseChosen
            )}

            {/* Start Quiz Button */}
            <TouchableOpacity
              style={[
                styles.startQuizButton,
                !isFormComplete() && styles.startQuizButtonDisabled,
              ]}
              onPress={onStartQuiz}
              disabled={!isFormComplete()}
            >
              <Text style={[
                styles.startQuizText,
                !isFormComplete() && styles.startQuizTextDisabled,
              ]}>
                Complete all selections to start quiz
              </Text>
            </TouchableOpacity>
          </View>
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
  },
  chooseForMeButton: {
    backgroundColor: '#BB86FC',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  chooseForMeButtonActive: {
    backgroundColor: '#4CAF50',
  },
  chooseForMeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  pickerDisabled: {
    opacity: 0.5,
  },
  picker: {
    color: '#FFFFFF',
    backgroundColor: 'transparent',
    height: 50,
  },
  startQuizButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
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