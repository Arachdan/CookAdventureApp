import { View, Button, TextInput, Alert, Pressable, Text } from 'react-native';

import React from 'react';

import { useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { connect } from 'react-redux';
import {increaseExperiencePoints, increaseRequiredExperience, updateExperiencePoints, increaseLevel } from './redux_actions';

import styles from './styles';

import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

function AddRecipe(props) {
    const [titleText, setTitleText] = React.useState('');
    const [ingredientsText, setIngredientsText] = React.useState('');
    const [recipeText, setRecipeText] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
        const onBackPress = () => {
            props.navigation.navigate('Home');
            return true;
        };

        const subscription = BackHandler.addEventListener(
            'hardwareBackPress',
            onBackPress
        );

        return () => subscription.remove();
        }, [])
    );

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
            <View style = {styles.form_container}>
                <TextInput
                    style = {styles.input_one}
                    placeholder = "Title"
                    value = {titleText}
                    onChangeText = {setTitleText}
                    placeholderTextColor={'#63C7C7'}
                />
                <TextInput
                    style = {styles.input_two}
                    placeholder = "Ingredients"
                    multiline = {true}
                    value = {ingredientsText}
                    onChangeText = {setIngredientsText}
                    placeholderTextColor={'#63C7C7'}
                />
                <TextInput
                    style = {styles.input_three}
                    placeholder = "Recipe"
                    multiline = {true}
                    value = {recipeText}
                    onChangeText = {setRecipeText}
                    placeholderTextColor={'#63C7C7'}
                />
                <Pressable
                    onPress={() => saveNewRecipe(titleText, ingredientsText, recipeText)}
                    style = {[styles.button, styles.save_recipe_button]}
                >
                    <Text style={styles.button_text}>Save recipe</Text>
                </Pressable>
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