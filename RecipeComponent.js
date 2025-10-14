import { View, Text, Pressable, Button } from 'react-native';

import React, { useEffect } from 'react';

import BreakLine from './BreakLine';

import { connect } from 'react-redux';
import { handleExperienceAndLeveling } from './redux_actions';

import styles from './styles';

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
        props.handleExperienceAndLeveling();
    }

    useEffect(() => {
        setDeletedState(false);
    }, [deletedState]);
    
    return (
        <Pressable onPress={() => setShowDetails(!showDetails)}>
            <View style={styles.recipe}>
                <View style={styles.titleSection}>
                    <Text>{props.title}</Text>
                    <Pressable
                        style = {styles.delete_button_container}
                        onPress = {handleDelete}>
                        <Text style={styles.delete_button}>X</Text>
                    </Pressable>
                </View>
                {showDetails && (
                    <View>
                        <BreakLine/>
                        <Text style={styles.sub_title}>Ingredients:</Text>
                        <Text>{props.ingredients}</Text>
                        <BreakLine/>
                        <Text style={styles.sub_title}>Recipe:</Text>
                        <Text>{props.recipe_text}</Text>
                        <BreakLine/>
                        <Pressable
                            onPress = {handleCook}
                            style = {[
                                styles.button,
                                styles.cook_button
                            ]}
                        >
                            <Text style={styles.button_text}>Cook</Text>
                        </Pressable>
                    </View>
                )}
            </View>
        </Pressable>
    );
};

const mapStateToProps = (state) => {
    return {
        experiencePoints: state.exp,
        requiredExperiencePoints: state.requiredExp,
        currentLevel: state.level
    };
};

const mapDispatchToProps = {
    handleExperienceAndLeveling
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeComponent);