import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../../theme/theme';
import useUserStore from '../../store/useUserStore';

const LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

export default function ExperienceScreen({ navigation }) {
  const [selectedLevel, setSelectedLevel] = useState(null);
  const setProfileField = useUserStore(state => state.setProfileField);
  const completeOnboarding = useUserStore(state => state.completeOnboarding);

  const handleFinish = () => {
    setProfileField('experience', selectedLevel);
    // This will change the global state and AppNavigator will automatically 
    // switch from Onboarding Stack to Main App Stack
    completeOnboarding();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Experience Level</Text>
      <Text style={styles.subtitle}>How long have you been training?</Text>

      <View style={styles.optionsContainer}>
        {LEVELS.map((level) => (
          <TouchableOpacity 
            key={level}
            style={[
              styles.optionCard, 
              selectedLevel === level && styles.optionCardSelected
            ]}
            onPress={() => setSelectedLevel(level)}
          >
            <Text style={[
              styles.optionText,
              selectedLevel === level && styles.optionTextSelected
            ]}>{level}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.spacer} />

      <TouchableOpacity 
        style={[styles.button, !selectedLevel && styles.buttonDisabled]}
        onPress={handleFinish}
        disabled={!selectedLevel}
      >
        <Text style={styles.buttonText}>Finish Setup</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    ...Typography.header,
    fontSize: 32,
    marginBottom: 5,
  },
  subtitle: {
    ...Typography.body,
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 15,
  },
  optionCard: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  optionCardSelected: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
  },
  optionText: {
    ...Typography.title,
    fontSize: 16,
    textAlign: 'center',
  },
  optionTextSelected: {
    color: Colors.primary,
  },
  spacer: {
    flex: 1,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonDisabled: {
    backgroundColor: Colors.border,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
