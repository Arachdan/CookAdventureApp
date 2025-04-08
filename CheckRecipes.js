import { StyleSheet, ScrollView } from 'react-native';

import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RecipeComponent from './RecipeComponent';

export default function CheckRecipes( {navigation} ) {
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
        <ScrollView>
            {recipes.map((recipe, index) => (
                <RecipeComponent key={index} {...recipe} onDelete={deleteRecipe}/>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: '#EDAEC0',
        margin: 5,
        padding: 3
    }
});
