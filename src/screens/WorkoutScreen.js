import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Typography } from '../theme/theme';
import useWorkoutStore from '../store/useWorkoutStore';

export default function WorkoutScreen({ navigation }) {
  const customPlans = useWorkoutStore(state => state.customPlans);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Workouts</Text>
      
      <View style={styles.actionRow}>
        <TouchableOpacity 
          style={[styles.createButton, { flex: 1, marginRight: 10 }]} 
          onPress={() => navigation.navigate('CreatePlan')}
        >
          <Text style={styles.createButtonText}>+ Custom Plan</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.createButton, { flex: 1, backgroundColor: Colors.secondary }]} 
          onPress={() => navigation.navigate('ExerciseLibrary')}
        >
          <Text style={styles.createButtonText}>Library</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.listContainer} contentContainerStyle={{ paddingBottom: 20 }}>
        <Text style={styles.sectionTitle}>Your Plans</Text>
        {customPlans.length === 0 ? (
          <Text style={styles.emptyText}>You haven't created any plans yet.</Text>
        ) : (
          customPlans.map((plan) => (
            <TouchableOpacity 
              key={plan.id} 
              style={styles.card}
              onPress={() => navigation.navigate('ActiveWorkout', { planName: plan.name })}
            >
              <Text style={styles.title}>{plan.name}</Text>
              <Text style={styles.body}>{plan.exercises.length} Exercises</Text>
              <Text style={styles.startText}>Tap to Start</Text>
            </TouchableOpacity>
          ))
        )}

        <Text style={[styles.sectionTitle, { marginTop: 20 }]}>AI Suggested Plan</Text>
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('ActiveWorkout', { planName: 'Full Body Basics' })}
        >
          <Text style={styles.title}>Full Body Basics</Text>
          <Text style={styles.body}>Based on your profile</Text>
          <Text style={styles.startText}>Tap to Start</Text>
        </TouchableOpacity>
      </ScrollView>
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
  createButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  startText: {
    color: Colors.primary,
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
  },
  sectionTitle: {
    ...Typography.title,
    marginBottom: 10,
    color: Colors.textSecondary,
  },
  card: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    ...Typography.title,
    marginBottom: 5,
  },
  body: {
    ...Typography.body,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontStyle: 'italic',
    marginBottom: 15,
  }
});

