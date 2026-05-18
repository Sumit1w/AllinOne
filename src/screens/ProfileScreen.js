import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../theme/theme';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.body}>Theme, App Updates, and Account</Text>
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
});
