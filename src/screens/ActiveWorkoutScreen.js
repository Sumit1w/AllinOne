import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { Colors, Typography } from '../theme/theme';

export default function ActiveWorkoutScreen({ route, navigation }) {
  const { planName = 'Free Workout' } = route.params || {};
  
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [sets, setSets] = useState([{ id: 1, weight: '', reps: '', completed: false }]);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const formatTime = (totalSeconds) => {
    const getSeconds = `0${(totalSeconds % 60)}`.slice(-2);
    const minutes = `${Math.floor(totalSeconds / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(totalSeconds / 3600)}`.slice(-2);
    return `${getHours > 0 ? getHours + ':' : ''}${getMinutes}:${getSeconds}`;
  };

  const addSet = () => {
    setSets([...sets, { id: sets.length + 1, weight: '', reps: '', completed: false }]);
  };

  const updateSet = (id, field, value) => {
    setSets(sets.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const toggleComplete = (id) => {
    setSets(sets.map(s => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const finishWorkout = () => {
    Alert.alert('Workout Finished!', `Great job! Duration: ${formatTime(seconds)}`, [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.header}>{planName}</Text>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.exerciseBlock}>
          <Text style={styles.exerciseName}>Current Exercise</Text>
          
          <View style={styles.tableHeader}>
            <Text style={styles.colHeader}>Set</Text>
            <Text style={styles.colHeader}>kg</Text>
            <Text style={styles.colHeader}>Reps</Text>
            <Text style={styles.colHeader}>✓</Text>
          </View>

          {sets.map((s, index) => (
            <View key={s.id} style={[styles.setRow, s.completed && styles.setRowCompleted]}>
              <Text style={styles.setNumber}>{index + 1}</Text>
              <TextInput 
                style={styles.input} 
                keyboardType="numeric" 
                placeholder="-" 
                placeholderTextColor={Colors.textSecondary}
                value={s.weight}
                onChangeText={(val) => updateSet(s.id, 'weight', val)}
                editable={!s.completed}
              />
              <TextInput 
                style={styles.input} 
                keyboardType="numeric" 
                placeholder="-" 
                placeholderTextColor={Colors.textSecondary}
                value={s.reps}
                onChangeText={(val) => updateSet(s.id, 'reps', val)}
                editable={!s.completed}
              />
              <TouchableOpacity 
                style={[styles.checkButton, s.completed && styles.checkButtonActive]}
                onPress={() => toggleComplete(s.id)}
              >
                <Text style={styles.checkText}>✓</Text>
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity style={styles.addSetButton} onPress={addSet}>
            <Text style={styles.addSetText}>+ Add Set</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.finishButton} onPress={finishWorkout}>
        <Text style={styles.finishButtonText}>Finish Workout</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    ...Typography.header,
    fontSize: 24,
  },
  timer: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    fontVariant: ['tabular-nums'],
  },
  content: {
    flex: 1,
  },
  exerciseBlock: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  exerciseName: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  colHeader: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  setRowCompleted: {
    opacity: 0.5,
  },
  setNumber: {
    color: Colors.text,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  input: {
    backgroundColor: Colors.background,
    color: Colors.text,
    flex: 1,
    marginHorizontal: 5,
    textAlign: 'center',
    borderRadius: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  checkButton: {
    flex: 1,
    backgroundColor: Colors.border,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  checkButtonActive: {
    backgroundColor: Colors.primary,
  },
  checkText: {
    color: '#000',
    fontWeight: 'bold',
  },
  addSetButton: {
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10,
  },
  addSetText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: Colors.secondary,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 10,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
