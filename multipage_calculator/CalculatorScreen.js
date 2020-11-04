import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function CalculatorScreen({ navigation }) {
    const[firstNumber, setFirstNumber] = useState('');
    const[secondNumber, setSecondNumber] = useState('');
    const[result, setResult] = useState('');
    const[history, setHistory] = useState(['History:']);

    useEffect(() => {
        if(firstNumber !== '' && secondNumber !== '') {
            console.log(window.value)
            setHistory([...history, {'value':firstNumber + ' ' + window.value + ' ' + secondNumber + ' = ' + result}]);
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
                style={{width: 100, borderColor: 'gray', borderWidth: 1}}
                keyboardType={'number-pad'}
                onChangeText={firstNumber => setFirstNumber(firstNumber)}
                value={firstNumber}
            />
            <TextInput
                style={{width: 100, borderColor: 'gray', borderWidth: 1}}
                keyboardType={'number-pad'}
                onChangeText={secondNumber => setSecondNumber(secondNumber)}
                value={secondNumber}
            />
            <StatusBar style="auto" />
            <View style={{alignSelf: 'center', width: '50%', flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button title="+" onPress={plusPressed}/>
                <Button title="-" onPress={minusPressed}/>
                <Button title="HISTORYY" onPress={() => navigation.navigate('History', {history: history})}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});