import React from 'react';

import HomePage from './HomePage';
import AddRecipe from './AddRecipe';
import CheckRecipes from './CheckRecipes';
import CharacterProfile from './CharacterProfile';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function App() {
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
  
  const initialState = {
    experiencePoints: 0,
    requiredExperiencePoints: 0,
    currentLevel: 0
  }
  const setInitialStateValues = async () => {
    const exp = await getSavedStats('experiencePoints');
    const requiredExp = await getSavedStats('requiredExperiencePoints');
    const level = await getSavedStats('currentLevel');

    initialState.experiencePoints = exp ? exp : 0;
    initialState.requiredExperiencePoints = requiredExp ? requiredExp : 100;
    initialState.currentLevel = level ? level : 1;
  }
  setInitialStateValues();
  
  function expReducer(state = initialState, action) {
    switch (action.type) {
        case 'INCREASE_EXPERIENCE_POINTS':
            saveStats('experiencePoints', state.experiencePoints + action.data);
            return {
                ...state,
                experiencePoints: state.experiencePoints + action.data
            };
        case 'UPDATE_EXPERIENCE_POINTS':
            saveStats('experiencePoints', action.data);
            return {
                ...state,
                experiencePoints: action.data
            };
        default:
            return state;
    }
  }

  function requiredExpReducer(state = initialState, action) {
    switch (action.type) {
      case 'INCREASE_REQUIRED_EXPERIENCE':
        saveStats('requiredExperiencePoints', Math.round(state.requiredExperiencePoints * action.data / 10) * 10);
        return {
          ...state,
          requiredExperiencePoints: Math.round(state.requiredExperiencePoints * action.data / 10) * 10
        }
      default:
        return state;
    }
  }

  function levelReducer(state = initialState, action) {
    switch (action.type) {
      case 'INCREASE_LEVEL':
        saveStats('currentLevel', state.currentLevel + action.data);
        return {
          ...state,
          currentLevel: state.currentLevel + action.data
        }
      default:
        return state;
    }
  }

  const rootReducer = combineReducers({
    exp: expReducer,
    requiredExp: requiredExpReducer,
    level: levelReducer
  })
  
  const store = createStore(rootReducer);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
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
              title:"AddRecipe"
            }}
          />
          <Stack.Screen
            name="CheckRecipes"
            component={CheckRecipes}
            options={{
              title:"CheckRecipes"
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