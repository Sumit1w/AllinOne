import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Colors, Typography } from '../theme/theme';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    
    // TODO: Implement Firebase Auth here
    // auth().createUserWithEmailAndPassword(email, password)...
    
    // For MVP, navigate to Onboarding
    navigation.navigate('Welcome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Create Account</Text>
      <Text style={styles.subtitle}>Join us and start your transformation</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.textSecondary}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.textSecondary}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        placeholderTextColor={Colors.textSecondary}
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Already have an account? Log In</Text>
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
  header: {
    ...Typography.header,
    fontSize: 32,
    marginBottom: 5,
  },
  subtitle: {
    ...Typography.body,
    marginBottom: 30,
  },
  input: {
    backgroundColor: Colors.card,
    color: Colors.text,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: Colors.primary,
    textAlign: 'center',
    fontSize: 16,
  },
});
