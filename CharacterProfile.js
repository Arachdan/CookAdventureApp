import React, { use } from 'react';
import { StyleSheet, View, TextInput, Text, Button } from 'react-native';
import BreakLine from './BreakLine';
import ProgressBar from 'react-native-progress/Bar';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CharacterProfile(props) {
    const [name, setName] = React.useState('Brave Cooking Adventurer');
    const [progress, setProgress] = React.useState(0);;

    useEffect(() => {
        setProgress(props.experiencePoints / props.requiredExperiencePoints);
    }, [props.experiencePoints, props.requiredExperiencePoints]);

    const onRestartCharacterValues = async () => {
        try {
            await AsyncStorage.removeItem('experiencePoints');
            await AsyncStorage.removeItem('requiredExperiencePoints');
            await AsyncStorage.removeItem('currentLevel');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text>( Place for an avatar/photo )</Text>
            <BreakLine/>
            <Text>CHARACTER'S NAME</Text>
            <Text>{name}</Text>
            <BreakLine/>
            <Text>CHARACTER'S LEVEL</Text>
            <Text>Level {props.currentLevel}</Text>
            <Text>Experience Points: {props.experiencePoints} / {props.requiredExperiencePoints}</Text>
            {
                //Experiment with animation type of a progress bar. Just for fun (and learning).
            }
            <ProgressBar progress={progress} width={200}/>
            <BreakLine/>
            <Text>Feature during tests</Text>
            <Button
                title = 'Restart character values'
                onPress = { onRestartCharacterValues }
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

export default connect(mapStateToProps)(CharacterProfile);

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