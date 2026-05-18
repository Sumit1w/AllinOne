import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Typography } from '../theme/theme';
import useWorkoutStore from '../store/useWorkoutStore';

export default function CreatePlanScreen({ navigation }) {
  const [planName, setPlanName] = useState('');
  const [exercises, setExercises] = useState([]);
  const [currentEx, setCurrentEx] = useState('');
  const [currentSets, setCurrentSets] = useState('');
  const [currentReps, setCurrentReps] = useState('');

  const addCustomPlan = useWorkoutStore(state => state.addCustomPlan);

  const handleAddExercise = () => {
    if (!currentEx || !currentSets || !currentReps) return;
    setExercises([...exercises, {
      id: Date.now().toString(),
      name: currentEx,
      sets: currentSets,
      reps: currentReps
    }]);
    setCurrentEx('');
    setCurrentSets('');
    setCurrentReps('');
  };

  const handleSavePlan = () => {
    if (!planName || exercises.length === 0) return;
    addCustomPlan(planName, exercises);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Custom Plan</Text>
      
      <TextInput
        style={styles.inputTitle}
        placeholder="Plan Name (e.g. My Leg Day)"
        placeholderTextColor={Colors.textSecondary}
        value={planName}
        onChangeText={setPlanName}
      />

      <View style={styles.addExContainer}>
        <TextInput
          style={[styles.input, { flex: 2 }]}
          placeholder="Exercise (e.g. Squat)"
          placeholderTextColor={Colors.textSecondary}
          value={currentEx}
          onChangeText={setCurrentEx}
        />
        <TextInput
          style={[styles.input, { flex: 1, marginHorizontal: 10 }]}
          placeholder="Sets"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="numeric"
          value={currentSets}
          onChangeText={setCurrentSets}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Reps"
          placeholderTextColor={Colors.textSecondary}
          keyboardType="numeric"
          value={currentReps}
          onChangeText={setCurrentReps}
        />
      </View>
      <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
        <Text style={styles.addButtonText}>+ Add Exercise</Text>
      </TouchableOpacity>

      <ScrollView style={styles.listContainer}>
        {exercises.map((ex, index) => (
          <View key={ex.id} style={styles.exerciseRow}>
            <Text style={styles.exName}>{index + 1}. {ex.name}</Text>
            <Text style={styles.exDetails}>{ex.sets} Sets × {ex.reps} Reps</Text>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={[styles.saveButton, (!planName || exercises.length === 0) && styles.disabled]} 
        onPress={handleSavePlan}
        disabled={!planName || exercises.length === 0}
      >
        <Text style={styles.saveButtonText}>Save Plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    paddingTop: 50,
  },
  header: {
    ...Typography.header,
    marginBottom: 20,
  },
  inputTitle: {
    backgroundColor: Colors.card,
    color: Colors.text,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
    fontSize: 18,
    marginBottom: 20,
  },
  addExContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    backgroundColor: Colors.card,
    color: Colors.text,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  addButton: {
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  addButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1,
  },
  exerciseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  exName: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  exDetails: {
    color: Colors.textSecondary,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  disabled: {
    backgroundColor: Colors.border,
  },
  saveButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
