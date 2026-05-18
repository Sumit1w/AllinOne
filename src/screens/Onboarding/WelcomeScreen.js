import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Typography } from '../../theme/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>AllinOne Gym</Text>
        <Text style={styles.subtitle}>Your Ultimate Fitness Companion</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('PersonalInfo')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: Colors.primary,
    marginBottom: 10,
  },
  subtitle: {
    ...Typography.body,
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
