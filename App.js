import React from 'react';

import HomePage from './HomePage';
import AddRecipe from './AddRecipe';
import CheckRecipes from './CheckRecipes';
import CharacterProfile from './CharacterProfile';

import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  const [text, onChangeText] = React.useState('');
  const [arr, updateArr] = React.useState([]);

  return (
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
  );
}