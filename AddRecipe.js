import { StyleSheet, View, Button, TextInput, Alert } from 'react-native';

import React from 'react';

import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';
import {increaseExperiencePoints, increaseRequiredExperience, updateExperiencePoints, increaseLevel } from './redux_actions';

function AddRecipe(props) {
    const [titleText, setTitleText] = React.useState('');
    const [ingredientsText, setIngredientsText] = React.useState('');
    const [recipeText, setRecipeText] = React.useState('');

    const saveNewRecipe = async (inputed_title, inputed_ingredients, inputed_recipe_text) => {
        try {
            const recipeObj = {
                title: inputed_title,
                ingredients: inputed_ingredients,
                recipe_text: inputed_recipe_text
            };
            const storageContents = await AsyncStorage.getItem('recipes');
            let recipes = storageContents ? JSON.parse(storageContents) : [];
            recipes.push(recipeObj);
            await AsyncStorage.setItem('recipes', JSON.stringify(recipes));
            Alert.alert('New recipe!', 'Congrats! You\'ve added a brand new recipe to your repertoire. All that\'s left is to give it a try!', [{
                text: 'Okay',
                onPress: () => {
                    props.navigation.goBack();
                }
            }]);
        } catch (error) {
            console.log(error);
        }
        props.increaseExperiencePoints(10);
        console.log('Saving: Done.')
    }

    useEffect(() => {
        if (props.experiencePoints >= props.requiredExperiencePoints) {
            props.increaseLevel(1);
            props.increaseRequiredExperience(1.2);
            const updatedExperiencePoints = props.experiencePoints - props.requiredExperiencePoints;
            props.updateExperiencePoints(updatedExperiencePoints);
            
        }
    }, [props.experiencePoints, props.requiredExperiencePoints]);

    return (
        <View style = {styles.container}>
            <TextInput
                style = {styles.input_one}
                placeholder = "Title"
                value = {titleText}
                onChangeText = {setTitleText}
            />
            <TextInput
                style = {styles.input_two}
                placeholder = "Ingredients"
                multiline = {true}
                value = {ingredientsText}
                onChangeText = {setIngredientsText}
            />
            <TextInput
                style = {styles.input_three}
                placeholder = "Recipe"
                multiline = {true}
                value = {recipeText}
                onChangeText = {setRecipeText}
            />
            <Button
                title="Save recipe"
                onPress={() => saveNewRecipe(titleText, ingredientsText, recipeText)}
            />
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        experiencePoints: state.exp.experiencePoints,
        requiredExperiencePoints: state.requiredExp.requiredExperiencePoints,
        currentLevel: state.level.currentLevel
    };
};

const mapDispatchToProps = {
    increaseExperiencePoints,
    increaseRequiredExperience,
    updateExperiencePoints,
    increaseLevel
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    input_one: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    input_two: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top'
    },
    input_three: {
        flex: 1,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top'
    }
});