import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React from 'react';

export default function App() {
  const [text, onChangeText] = React.useState('');
  const [arr, updateArr] = React.useState([]);

  return (
    <View style={styles.container}>
      <Text>{arr}</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Button
          title="Press me"
          onPress={() => {
            updateArr([
              ...arr,
              "\n" + text
            ]);
            onChangeText('');
          }}
        />
      <StatusBar style="auto" />
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
