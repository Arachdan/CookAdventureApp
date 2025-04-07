import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';

import React from 'react';

import BreakLine from './BreakLine';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomePage( {navigation} ) {
    const getMyRecipe= async () => {
        try {
            const JSONval = await AsyncStorage.getItem('key');
            const val = JSON.parse(JSONval);
            console.log(val);
            console.log("Recipe title: " + val.title);
            console.log("Needed ingredients: " + val.ingredients);
            console.log("Detailed instructions: " + val.recipe_text);
            console.log("Reading: Done.");
        } catch (error) {
            console.log(error);
        }
    }

    const getRecipesList = async () => {
      try {
          const value = await AsyncStorage.getItem('titles_list');
          if (value !== null) {
            return value;
          }
        } catch (error) {
          console.log(error);
      }
  }

    return (
        <View style={styles.container}>
            <Button
              title="Add a recipe"
              onPress={() =>
                navigation.navigate("AddRecipe")
              }
            />
            <BreakLine/>
            <Button
              title="Check recipes"
              onPress={() => 
                navigation.navigate("CheckRecipes")
              }
            />
            <StatusBar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      width: 100,
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    }
  });
  