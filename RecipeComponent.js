import { StyleSheet, View, Text, Pressable, Button } from 'react-native';

import React, { useEffect } from 'react';

import BreakLine from './BreakLine';

import { connect } from 'react-redux';
import {increaseExperiencePoints, increaseRequiredExperience, updateExperiencePoints, increaseLevel } from './redux_actions';

function RecipeComponent(props) {
    const [showDetails, setShowDetails] = React.useState(false);
    const [deletedState, setDeletedState] = React.useState(false);

    const handleDelete = async () => {
        try {
            props.onDelete(props.title);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCook = () => {
        props.increaseExperiencePoints(20);
    }

    useEffect(() => {
        setDeletedState(false);
    }, [deletedState]);

    useEffect(() => {
        if (props.experiencePoints >= props.requiredExperiencePoints) {
            props.increaseLevel(1);
            props.increaseRequiredExperience(1.2);
            const updatedExperiencePoints = props.experiencePoints - props.requiredExperiencePoints;
            props.updateExperiencePoints(updatedExperiencePoints);
            
        }
    }, [props.experiencePoints, props.requiredExperiencePoints]);

    return (
        <Pressable onPress={() => setShowDetails(!showDetails)}>
            <View style={styles.container}>
                <Text>
                    {props.title}
                    <Button
                        style = {styles.delete_button}
                        title = "X"
                        onPress = {handleDelete}
                    />
                </Text>
                {showDetails && (
                    <View>
                        <BreakLine/>
                        <Text style={styles.sub_title}>Ingredients:</Text>
                        <Text>{props.ingredients}</Text>
                        <BreakLine/>
                        <Text style={styles.sub_title}>Recipe:</Text>
                        <Text>{props.recipe_text}</Text>
                        <BreakLine/>
                        <Button
                            title='Cook'
                            onPress = {handleCook}
                        />
                    </View>
                )}
            </View>
        </Pressable>
    );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(RecipeComponent);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: '#EDAEC0',
        margin: 5,
        padding: 3,
        minHeight: 50
    },
    title: {
    },
    sub_title: {
        fontWeight: 'bold'
    },
    delete_button: {
        // Style that.
    }
});
