import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Button } from 'react-native';

import React from 'react';

import BreakLine from './BreakLine';

export default function HomePage( {navigation} ) {
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
  