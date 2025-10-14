import { StatusBar } from 'expo-status-bar';
import { View, Pressable, Text } from 'react-native';

import styles from './styles';

import BreakLine from './BreakLine';

import CharacterProfile from './CharacterProfile';

export default function HomePage( {navigation} ) {
    return (
        <View style={styles.container}>
          <CharacterProfile/>
          <BreakLine/>
          <Pressable
            onPress={() => navigation.navigate("AddRecipe")}
            style = {styles.button}
          >
            <Text style={styles.button_text}>ADD A RECIPE</Text>
          </Pressable>
          <BreakLine/>
          <Pressable
            onPress={() => navigation.navigate("CheckRecipes")}
            style = {styles.button}
          >
            <Text style={styles.button_text}>CHECK RECIPES</Text>
          </Pressable>
          <StatusBar/>
        </View>
    );
}