import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';

export default function App() {
  const[text, setText] = useState('Guess a number between 1-100');
  const[guess, setGuess] = useState(0);
  const[guessCount, setGuessCount] = useState(0);
  const[secretNumber, setSecretNumber] = useState(Math.floor(Math .random() * 100) + 1);

  const doGuess = () => {
    setGuessCount(guessCount + 1);

    if (guess === secretNumber) {
      Alert.alert(
          '',
          'You guessed the number in ' + (guessCount + 1) + ' guesses',
          [{text: 'Play again', onPress: () => setGuessCount(0)}]);
      setSecretNumber(Math.floor(Math .random() * 100) + 1)
      setText('Guess a number between 1-100')
    } else {
      if (guess < secretNumber) {
        setText('Your guess ' + guess + ' is too low')
      } else {
        setText('Your guess ' + guess + ' is too high')
      }
    }

    setGuess('')
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput
          style={{borderColor: 'gray', borderWidth: 1}}
          keyboardType={'number-pad'}
          onChangeText={guess => setGuess(parseInt(guess))}
          value={guess}
      />
      <Button title="Make a guess" onPress={doGuess}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});
