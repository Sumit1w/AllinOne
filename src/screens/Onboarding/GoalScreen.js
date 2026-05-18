import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../../theme/theme';
import useUserStore from '../../store/useUserStore';

const GOALS = ['Muscle Build', 'Fat Loss', 'Body Recomposition', 'Strength Gain', 'General Fitness'];

export default function GoalScreen({ navigation }) {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const setProfileField = useUserStore(state => state.setProfileField);

  const handleNext = () => {
    setProfileField('goal', selectedGoal);
    navigation.navigate('Experience');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Goal</Text>
      <Text style={styles.subtitle}>What do you want to achieve?</Text>

      <View style={styles.optionsContainer}>
        {GOALS.map((goal) => (
          <TouchableOpacity 
            key={goal}
            style={[
              styles.optionCard, 
              selectedGoal === goal && styles.optionCardSelected
            ]}
            onPress={() => setSelectedGoal(goal)}
          >
            <Text style={[
              styles.optionText,
              selectedGoal === goal && styles.optionTextSelected
            ]}>{goal}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.spacer} />

      <TouchableOpacity 
        style={[styles.button, !selectedGoal && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!selectedGoal}
      >
        <Text style={styles.buttonText}>Next</Text>
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
