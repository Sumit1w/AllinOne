import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Colors, Typography } from '../../theme/theme';
import useUserStore from '../../store/useUserStore';

export default function PersonalInfoScreen({ navigation }) {
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const setProfileField = useUserStore(state => state.setProfileField);

  const handleNext = () => {
    setProfileField('age', age);
    setProfileField('weight', weight);
    navigation.navigate('Goal');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>About You</Text>
      <Text style={styles.subtitle}>Help us personalize your experience.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Age</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 25" 
          placeholderTextColor={Colors.textSecondary}
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Weight (kg)</Text>
        <TextInput 
          style={styles.input} 
          placeholder="e.g. 70" 
          placeholderTextColor={Colors.textSecondary}
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
      </View>
      
      <View style={styles.spacer} />

      <TouchableOpacity 
        style={[styles.button, (!age || !weight) && styles.buttonDisabled]}
        onPress={handleNext}
        disabled={!age || !weight}
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
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    ...Typography.title,
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.card,
    color: Colors.text,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 16,
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
