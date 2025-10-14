import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D47B47',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      backgroundColor: '#008080',
      width: 155,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10
    },
    button_text: {
      color: 'white'
    },

    character_profile_container: {
        alignItems: 'center',
    },

    options_container: {
        marginTop: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20
    },
    options_button: {
        width: 70,
        height: 40,
        borderWidth: 3,
        borderColor: 'black',
        borderStyle: 'dotted'
    },
    modal_container: {
        backgroundColor: '#008080',
        justifyContent: 'space-evenly',
        
    },
    modal_button: {
        backgroundColor: '#D47B47',
        alignSelf: 'center'
    },
    input: {
        width: '80%',
        minWidth: '50%',
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    mini_heading: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    mini_heading_text: {
        fontWeight: 'normal'
    },
    text: {
        textAlign: 'center'
    },

    form_container: {
        flex: 1,
        backgroundColor: '#D47B47',
        paddingTop: 25,
    },
    input_one: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color: 'white'
    },
    input_two: {
        height: 100,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top',
        color: 'white'
    },
    input_three: {
        flex: 1,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        textAlignVertical: 'top',
        color: 'white'
    },
    save_recipe_button: {
        width: '100%',
        marginBottom: '15%',
    },

    recipes_container: {
        backgroundColor: '#D47B47',
    },
    recipes_flatlist: {
        paddingTop: 30,
        paddingBottom: '15%'
    },
    recipe: {
        flex: 1,
        backgroundColor: '#63C7C7',
        margin: 5,
        padding: 3,
        minHeight: 50
    },
    titleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 6
    },
    title: {
    },
    sub_title: {
        fontWeight: 'bold'
    },
    delete_button_container: {
        width: 30,
        height: 30,
        backgroundColor: '#d11f31',
        borderRadius: 5,
    },
    delete_button: {
        padding: 5,
        textAlign: 'center'
    },
    cook_button: {
        alignSelf: 'center',
        width: '100%'
    }
});

export default styles;