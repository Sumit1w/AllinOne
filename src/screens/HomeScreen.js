import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Pedometer } from 'expo-sensors';
import { Colors, Typography } from '../theme/theme';

export default function HomeScreen() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState('checking');
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setHours(0,0,0,0); // Start of today

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      return Pedometer.watchStepCount(result => {
        setCurrentStepCount(result.steps);
      });
    }
  };

  useEffect(() => {
    const subscription = subscribe();
    return () => subscription && subscription.then(sub => sub && sub.remove());
  }, []);

  const totalSteps = pastStepCount + currentStepCount;
  const stepGoal = 10000;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Today's Workout</Text>
        <Text style={styles.body}>Push Day - Chest, Shoulders, Triceps</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.title}>Steps Goal</Text>
        <Text style={styles.body}>{totalSteps} / {stepGoal}</Text>
        <Text style={styles.statusText}>
          Sensor: {isPedometerAvailable === 'true' ? 'Active' : 'Unavailable on Emulator'}
        </Text>
      </View>
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
  statusText: {
    color: Colors.textSecondary,
    fontSize: 12,
    marginTop: 10,
    fontStyle: 'italic',
  }
});
