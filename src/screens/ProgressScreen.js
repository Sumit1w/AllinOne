import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors, Typography } from '../theme/theme';

export default function ProgressScreen() {
  const screenWidth = Dimensions.get('window').width;

  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [70, 70.2, 69.8, 69.5, 69.3, 69.0, 68.8],
        color: (opacity = 1) => `rgba(57, 255, 20, ${opacity})`, // primary color
        strokeWidth: 2
      }
    ]
  };

  const chartConfig = {
    backgroundGradientFrom: Colors.card,
    backgroundGradientTo: Colors.card,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Progress</Text>
      
      <View style={styles.card}>
        <Text style={styles.title}>Weight Tracking</Text>
        <Text style={styles.body}>Your weight over the last 7 days</Text>
        
        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <LineChart
            data={data}
            width={screenWidth - 80}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              borderRadius: 16
            }}
          />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Workout Consistency</Text>
        <Text style={styles.body}>4 workouts completed this week!</Text>
      </View>
    </ScrollView>
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

