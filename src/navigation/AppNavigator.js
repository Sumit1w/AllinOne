import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import PersonalInfoScreen from '../screens/Onboarding/PersonalInfoScreen';
import GoalScreen from '../screens/Onboarding/GoalScreen';
import ExperienceScreen from '../screens/Onboarding/ExperienceScreen';
import CreatePlanScreen from '../screens/CreatePlanScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';
import ExerciseLibraryScreen from '../screens/ExerciseLibraryScreen';
import ActiveWorkoutScreen from '../screens/ActiveWorkoutScreen';
import useUserStore from '../store/useUserStore';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const isOnboarded = useUserStore(state => state.isOnboarded);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isOnboarded ? (
          // Auth & Onboarding Flow
          <Stack.Group>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
            <Stack.Screen name="Goal" component={GoalScreen} />
            <Stack.Screen name="Experience" component={ExperienceScreen} />
          </Stack.Group>
        ) : (
          // Main App Flow
          <Stack.Group>
            <Stack.Screen name="Main" component={BottomTabNavigator} />
            <Stack.Screen name="CreatePlan" component={CreatePlanScreen} />
            <Stack.Screen name="ExerciseLibrary" component={ExerciseLibraryScreen} />
            <Stack.Screen name="ActiveWorkout" component={ActiveWorkoutScreen} />
          </Stack.Group>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
