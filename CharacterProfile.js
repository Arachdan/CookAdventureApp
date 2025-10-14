import React, { useEffect } from 'react';
import { View, TextInput, Text, Button, Modal, Pressable } from 'react-native';
import BreakLine from './BreakLine';
import ProgressBar from 'react-native-progress/Bar';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updatePersonalGoal, updatePlayerName } from './redux_actions';
import styles from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { BackHandler } from 'react-native';

function CharacterProfile(props) {
    const [progress, setProgress] = React.useState(0);
    const [goal_modal_visibility, setGoalModalVisibility] = React.useState(false);
    const [name_modal_visibility, setNameModalVisibility] = React.useState(false);
    const [input_memory, setInputMemory] = React.useState('');

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                BackHandler.exitApp();
                return true;
            };

            const subscription = BackHandler.addEventListener(
                'hardwareBackPress',
                onBackPress
            );

            return () => subscription.remove();
        }, [])
    );

    useEffect(() => {
        setProgress(props.experiencePoints / props.requiredExperiencePoints);
    }, [props.experiencePoints, props.requiredExperiencePoints]);

    const onRestartCharacterValues = async () => {
        try {
            await AsyncStorage.removeItem('experiencePoints');
            await AsyncStorage.removeItem('requiredExperiencePoints');
            await AsyncStorage.removeItem('currentLevel');
            await AsyncStorage.removeItem('personalGoal');
            await AsyncStorage.removeItem('player_name');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View style={styles.character_profile_container}>
            <View style={styles.options_container}>
                <Modal
                    animationType = 'fade'
                    transparent = {false}
                    visible = {goal_modal_visibility}
                    onRequestClose = {() => {
                        console.log('Personal goal modal has been cancelled.');
                        setGoalModalVisibility(false);
                    }}
                >
                    <View style={[styles.container, styles.modal_container]}>
                        <View>
                            <Text style={styles.mini_heading}>Current personal goal:</Text>
                            <Text style={[styles.mini_heading, styles.mini_heading_text]}>{props.personalGoal}</Text>
                        </View>
                        <View>
                            <Text>Set your new personal goal here:</Text>
                            <TextInput
                                style = {styles.input}
                                placeholder = 'Enter your personal goal'
                                onChangeText={(text) => setInputMemory(text)}
                            />
                            <Pressable
                                onPress = {() => {
                                    props.updatePersonalGoal(input_memory)
                                    setGoalModalVisibility(false);
                                }}
                                style = {[styles.button, styles.modal_button]}
                            >
                                <Text style={styles.button_text}>Set a goal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    onPress={() => setGoalModalVisibility(true)}
                    style = {[styles.button, styles.options_button]}
                >
                    <Text style={styles.button_text}>Goal</Text>
                </Pressable>
                <Modal
                    animationType = 'fade'
                    transparent = {false}
                    visible = {name_modal_visibility}
                    onRequestClose = {() => {
                        console.log('Name modal has been cancelled.');
                        setNameModalVisibility(false);
                    }}
                >
                    <View style={[styles.container, styles.modal_container]}>
                        <View>
                            <Text style={styles.mini_heading}>Current name:</Text>
                            <Text style={[styles.mini_heading, styles.mini_heading_text]}>{props.player_name}</Text>
                        </View>
                        <View>
                            <Text style={styles.text}>Set your new name here:</Text>
                            <TextInput
                                style = {styles.input}
                                placeholder = 'Enter your name'
                                onChangeText={(text) => setInputMemory(text)}
                            />
                            <Pressable
                                onPress = {() => {
                                    props.updatePlayerName(input_memory)
                                    setNameModalVisibility(false);
                                }}
                                style = {[styles.button, styles.modal_button]}
                            >
                                <Text style={styles.button_text}>Set a name</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <Pressable
                    onPress={() => setNameModalVisibility(true)}
                    style = {[styles.button, styles.options_button]}
                >
                    <Text style={styles.button_text}>Name</Text>
                </Pressable>
                <Pressable
                    onPress={() => onRestartCharacterValues()}
                    style = {[styles.button, styles.options_button]}
                >
                    <Text style={styles.button_text}>Restart</Text>
                </Pressable>
            </View>
            <Text>{props.player_name}</Text>
            <BreakLine/>
            <Text>Level {props.currentLevel}</Text>
            <Text>Experience Points: {props.experiencePoints} / {props.requiredExperiencePoints}</Text>
            {
                //Experiment with animation type of a progress bar. Just for fun (and learning).
            }
            <ProgressBar progress={progress} width={200}/>
            <BreakLine/>
            <Text style={styles.text}>Personal goal: {"\n"} {props.personalGoal}</Text>
            <BreakLine/>
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
        experiencePoints: state.exp,
        requiredExperiencePoints: state.requiredExp,
        currentLevel: state.level,
        personalGoal: state.goals,
        player_name: state.name
    };
};
const mapDispatchToProps =  {
    updatePersonalGoal,
    updatePlayerName,
};

export default connect(mapStateToProps, mapDispatchToProps)(CharacterProfile);