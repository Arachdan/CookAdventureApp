import HomePage from './HomePage';
import AddRecipe from './AddRecipe';
import CheckRecipes from './CheckRecipes';
import CharacterProfile from './CharacterProfile';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { combineReducers } from 'redux';
import { Provider } from 'react-redux';

import { combineSlices, configureStore } from '@reduxjs/toolkit';

import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect } from 'react';

import { View, ActivityIndicator } from 'react-native';

import styles from './styles';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = React.useState(false);
  const [preloadedState, setPreloadedState] = React.useState(null);
  
  const saveStats = async (stat, value) => {
    try {
      const passedValue = JSON.stringify(value);
      await AsyncStorage.setItem(stat, passedValue);
    } catch (error) {
      console.log(error);
    }
  };
  const getSavedStats = async (value) => {
    try {
        const readValue = await AsyncStorage.getItem(value);
        const parsedValue = JSON.parse(readValue);
        if (parsedValue !== null) {
            return parsedValue;
        }
        else return null;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const loadState = async () => {
      const exp = await getSavedStats('experiencePoints');
      const requiredExp = await getSavedStats('requiredExperiencePoints');
      const level = await getSavedStats('currentLevel');
      const personalGoal = await getSavedStats('personalGoal');
      const playerName = await getSavedStats('player_name');

      setPreloadedState({
        experiencePoints: exp ?? 0,
        requiredExperiencePoints: requiredExp ?? 100,
        currentLevel: level ?? 1,
        personalGoal: personalGoal ?? "Learn to cook for yourself and your loved ones!",
        playerName: playerName ?? "Brave Cooking Adventurer"
      });
      setIsReady(true);
    };
    loadState();
  }, []);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#008080"/>
      </View>
    );
  }
  
  function expReducer(state = preloadedState.experiencePoints, action) {
    switch (action.type) {
        case 'INCREASE_EXPERIENCE_POINTS':
            saveStats('experiencePoints', state + action.data);
            return state + action.data;
        case 'UPDATE_EXPERIENCE_POINTS':
            saveStats('experiencePoints', action.data);
            return action.data;
        default:
            return state;
    }
  }

  function requiredExpReducer(state = preloadedState.requiredExperiencePoints, action) {
    switch (action.type) {
      case 'INCREASE_REQUIRED_EXPERIENCE':
        saveStats('requiredExperiencePoints', Math.round(state * action.data / 10) * 10);
        return Math.round(state * action.data / 10) * 10;
      default:
        return state;
    }
  }

  function levelReducer(state = preloadedState.currentLevel, action) {
    switch (action.type) {
      case 'INCREASE_LEVEL':
        saveStats('currentLevel', state + action.data);
        return state + action.data;
      default:
        return state;
    }
  }

  function goalsReducer(state = preloadedState.personalGoal, action) {
    switch (action.type) {
      case 'UPDATE_PERSONAL_GOAL':
        saveStats('personalGoal', action.data);
        return action.data;
      default:
        return state;
    }
  }

  function playerNameReducer(state = preloadedState.playerName, action) {
    switch (action.type) {
      case 'UPDATE_PLAYER_NAME':
        saveStats('player_name', action.data);
        return action.data;
      default:
        return state;
    }
  }

  const rootReducer = combineSlices({
    exp: expReducer,
    requiredExp: requiredExpReducer,
    level: levelReducer,
    goals: goalsReducer,
    name: playerNameReducer
  })
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
  });

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            animation: 'slide_from_left',
            headerTintColor: 'white',
            headerTitleStyle: {fontWeight: 'bold', color: 'white'},
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#EB874D'},
            headerShown: false
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomePage}
            options={{
              title: "Home"
            }}
          />
          <Stack.Screen
            name="AddRecipe"
            component={AddRecipe}
            options={{
              title:"AddRecipe",
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen
            name="CheckRecipes"
            component={CheckRecipes}
            options={{
              title:"CheckRecipes",
              animation: 'slide_from_right'
            }}
          />
          <Stack.Screen
            name="CharacterProfile"
            component={CharacterProfile}
            options={{
              title: "Profile"
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}