import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Colors, Typography } from '../theme/theme';
import { EXERCISE_LIBRARY, MUSCLE_GROUPS } from '../data/exercises';

export default function ExerciseLibraryScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState('All');

  const filteredExercises = EXERCISE_LIBRARY.filter(ex => {
    const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscle = selectedMuscle === 'All' || ex.muscle === selectedMuscle;
    return matchesSearch && matchesMuscle;
  });

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseCard}>
      <Text style={styles.exName}>{item.name}</Text>
      <View style={styles.badges}>
        <Text style={styles.badgeText}>{item.muscle}</Text>
        <Text style={styles.badgeText}>{item.category}</Text>
      </View>
      <Text style={styles.exTips}>{item.tips}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Exercise Library</Text>
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search exercises..."
        placeholderTextColor={Colors.textSecondary}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          data={MUSCLE_GROUPS}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedMuscle === item && styles.filterChipSelected
              ]}
              onPress={() => setSelectedMuscle(item)}
            >
              <Text style={[
                styles.filterText,
                selectedMuscle === item && styles.filterTextSelected
              ]}>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={filteredExercises}
        keyExtractor={item => item.id}
        renderItem={renderExercise}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={<Text style={styles.emptyText}>No exercises found.</Text>}
      />
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
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: Colors.card,
    color: Colors.text,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 15,
  },
  filterContainer: {
    marginBottom: 15,
    maxHeight: 40,
  },
  filterChip: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.card,
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: 'rgba(57, 255, 20, 0.1)',
  },
  filterText: {
    color: Colors.textSecondary,
    fontWeight: 'bold',
  },
  filterTextSelected: {
    color: Colors.primary,
  },
  exerciseCard: {
    backgroundColor: Colors.card,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  exName: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  badges: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  badgeText: {
    color: Colors.secondary,
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 87, 34, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  exTips: {
    color: Colors.textSecondary,
    fontSize: 14,
    fontStyle: 'italic',
  },
  emptyText: {
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 20,
  }
});
