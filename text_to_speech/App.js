import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {
  const [text, setText] = useState('')

  const speak = () => {
    Speech.speak(text);
  }

  return (
    <View style={styles.container}>
      <TextInput
          style={{width: 150, height: 50, borderColor: 'gray', borderWidth: 1, marginBottom: 10}}
          onChangeText={text => setText(text)}
          value={text}
      />
      <Button title="Press to hear text" onPress={() => speak()}/>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
