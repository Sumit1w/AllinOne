import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Typography } from '../theme/theme';

export default function CardioScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Cardio</Text>
      <View style={styles.card}>
        <Text style={styles.title}>Running</Text>
        <Text style={styles.body}>Track your outdoor runs</Text>
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
