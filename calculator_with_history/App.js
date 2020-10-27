import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const[firstNumber, setFirstNumber] = useState('');
  const[secondNumber, setSecondNumber] = useState('');
  const[result, setResult] = useState('');
  const[history, setHistory] = useState(['History:']);

  useEffect(() => {
      if(firstNumber !== '' && secondNumber !== '') {
          console.log(window.value)
          setHistory([...history, firstNumber + ' ' + window.value + ' ' + secondNumber + ' = ' + result]);
          setFirstNumber('');
          setSecondNumber('');
      }
      }, [result]);

  const plusPressed = () => {
      setResult(parseInt(firstNumber) + parseInt(secondNumber));
      let current_operator;
      window.value = "+"
  }

  const minusPressed = () => {
    setResult(parseInt(firstNumber) - parseInt(secondNumber));
      window.value = "-"
  }

  return (
      <View style={styles.container}>
        <Text style={{alignSelf: 'center'}}>Result: {result}</Text>
        <TextInput
            style={{borderColor: 'gray', borderWidth: 1}}
            keyboardType={'number-pad'}
            onChangeText={firstNumber => setFirstNumber(firstNumber)}
            value={firstNumber}
        />
        <TextInput
            style={{borderColor: 'gray', borderWidth: 1}}
            keyboardType={'number-pad'}
            onChangeText={secondNumber => setSecondNumber(secondNumber)}
            value={secondNumber}
        />
        <StatusBar style="auto" />
        <View style={{alignSelf: 'center', width: '50%', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button title="+" onPress={plusPressed}/>
          <Button title="-" onPress={minusPressed}/>
        </View>
          <View>
              <FlatList
                  style={{alignSelf: 'center'}}
                  data={history}
                  renderItem={({item}) =>
                      <Text>{item}</Text>}
              />
          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});
