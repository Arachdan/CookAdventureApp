import React from 'react';

import HomePage from './HomePage';
import AddRecipe from './AddRecipe';
import CheckRecipes from './CheckRecipes';
import CharacterProfile from './CharacterProfile';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator();

export default function App() {
  const initialExperiencePointsState = {
    experiencePoints: 20
  }
  
  function reducer(state = initialExperiencePointsState, action) {
    switch (action.type) {
        case 'INCREASE_EXPERIENCE_POINTS':
            return {
                ...state,
                experiencePoints: state.experiencePoints + action.payload,
            };
        default:
            return state;
    }
  }
  
  const store = createStore(reducer);

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