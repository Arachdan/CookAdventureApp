import React from 'react';

import HomePage from './HomePage';
import AddRecipe from './AddRecipe';
import CheckRecipes from './CheckRecipes';
import CharacterProfile from './CharacterProfile';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
  const initialExpState = {
    experiencePoints: 0
  }
  const initialRequiredExpState = {
    requiredExperiencePoints: 100
  }
  const initialLevelState = {
    currentLevel: 1
  }
  
  function expReducer(state = initialExpState, action) {
    switch (action.type) {
        case 'INCREASE_EXPERIENCE_POINTS':
            return {
                ...state,
                experiencePoints: state.experiencePoints + action.data
            };
        case 'UPDATE_EXPERIENCE_POINTS':
            return {
                ...state,
                experiencePoints: action.data
            };
        default:
            return state;
    }
  }

  function requiredExpReducer(state = initialRequiredExpState, action) {
    switch (action.type) {
      case 'INCREASE_REQUIRED_EXPERIENCE':
        return {
          ...state,
          requiredExperiencePoints: Math.round(state.requiredExperiencePoints * action.data / 10) * 10
        }
      default:
        return state;
    }
  }

  function levelReducer(state = initialLevelState, action) {
    switch (action.type) {
      case 'INCREASE_LEVEL':
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