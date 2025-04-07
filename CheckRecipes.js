import { StyleSheet, ScrollView } from 'react-native';

import React, { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RecipeComponent from './RecipeComponent';

/*
    What to do:
    Add a way to delete a saved recipe from a list of saved recipes and from AsyncStorage.
*/

export default function CheckRecipes( {navigation} ) {
    const [recipes, setRecipes] = React.useState([]);

    useEffect(() => {
        /*
        const getMyRecipe = async (key) => {
            try {
                const JSONval = await AsyncStorage.getItem(key);
                const val = JSON.parse(JSONval);
                
                setRecipeTitle(val.title);
                setRecipeIngredients(val.ingredients);
                setRecipeText(val.recipe_text);
            } catch (error) {
                console.log(error);
            }
    
            console.log('Reading: Done.');
        }
        */

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
