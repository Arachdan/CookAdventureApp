import React from 'react';
import { StyleSheet, View, TextInput, Text } from 'react-native';
import BreakLine from './BreakLine';
import ProgressBar from 'react-native-progress/Bar';

export default function CharacterProfile( {navigation} ) {
    const [name, setName] = React.useState('Brave Cooking Adventurer');
    const [level, setLevel] = React.useState(1);
    const [ownExperience, setOwnExperience] = React.useState(0);
    const [requiredExperience, setRequiredExperience] = React.useState(100);
    const [progress, setProgress] = React.useState(ownExperience / requiredExperience);

    return (
        <View style={styles.container}>
            <Text>( Place for an avatar/photo )</Text>
            <BreakLine/>
            <Text>CHARACTER'S NAME</Text>
            <Text>{name}</Text>
            <BreakLine/>
            <Text>CHARACTER'S LEVEL</Text>
            <Text>Level {level}</Text>
            <Text>Experience Points: {ownExperience} / {requiredExperience}</Text>
            {
                //Experiment with animation type of a progress bar. Just for fun (and learning).
            }
            <ProgressBar progress={progress} width={200}/>
        </View>
    );
}

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