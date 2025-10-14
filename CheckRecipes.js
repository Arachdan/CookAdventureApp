import { FlatList, ScrollView } from 'react-native';

import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RecipeComponent from './RecipeComponent';

import styles from './styles';

import { BackHandler } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function CheckRecipes( {navigation} ) {
    useFocusEffect(
        React.useCallback(() => {
        const onBackPress = () => {
            navigation.navigate('Home');
            return true;
        };

        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => subscription.remove();
        }, [])
    );

    const [recipes, setRecipes] = React.useState([]);

    useEffect(() => {
        const getAllRecipes = async () => {
            try {
                const val = await AsyncStorage.getItem('recipes');
                const parsedVal = JSON.parse(val);
                
                setRecipes(parsedVal || []);
            } catch (error) {
                console.log(error);
            }
    
            console.log('Reading: Done.');
        }

        getAllRecipes(); 
    }, []);

    const deleteRecipe = async (title) => {
        try {
            const storageContents = await AsyncStorage.getItem('recipes');
            let recipes = storageContents ? JSON.parse(storageContents) : [];
            recipes = recipes.filter((recipe) => recipe.title !== title);
            await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
            setRecipes(recipes);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <FlatList
            style = {styles.recipes_container}
            data = {recipes}
            renderItem={({item}) => <RecipeComponent {...item} onDelete={deleteRecipe}/>}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle = {styles.recipes_flatlist}
        />
    );
}
