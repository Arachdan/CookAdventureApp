import { StyleSheet, View, Text, Pressable, Button } from 'react-native';

import React, { useEffect } from 'react';

import BreakLine from './BreakLine';

export default function RecipeComponent(props) {
    const [showDetails, setShowDetails] = React.useState(false);
    const [deletedState, setDeletedState] = React.useState(false);

    const handleDelete = async () => {
        try {
            props.onDelete(props.title);
        } catch (error) {
            console.log(error);
        }
    };

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
                    </View>
                )}
            </View>
        </Pressable>
    );

    useEffect(() => {
        RecipeComponent();
        setDeletedState(false);
    }, [deletedState]);
};

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
