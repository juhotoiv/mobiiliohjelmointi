import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TextInput, Button, Image, Picker } from 'react-native';

export default function App() {
  const [rates, setRates] = useState([]);
  const [currencies, setCurrencies] = useState([])
  const [amount, setAmount] = useState('');
  const [sum, setSum] = useState(0.00);
  const [currency, setCurrency] = useState('');

  const getRates = () => {
    const url = 'https://api.exchangeratesapi.io/latest';
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          setRates(responseJson.rates);
          setCurrencies(Object.keys(responseJson.rates))
        })
        .catch((error) => {
          Alert.alert('Error', error.toString());
        });
  }

  const calculatePressed = () => {
      setSum(amount / rates[currency])
  }

  useEffect(() => {
    getRates()
  }, []);

  return (
      <View style={styles.container}>
          <Image
              source={require('./assets/euro.png')}
              style={{
                  width:200,
                  height:200,
                  resizeMode:'contain',
                  margin:8
              }}/>
          <Text style={{fontSize: 20}}>{sum.toFixed(2) + ' €'}</Text>
          <StatusBar style="auto" />
          <View style={{marginTop: 30, marginBottom: 30, alignSelf: 'center', width: '50%', flexDirection: 'row', justifyContent: 'space-around'}}>
              <TextInput
                  style={{width: 100, borderColor: 'gray', borderWidth: 1}}
                  keyboardType={'number-pad'}
                  onChangeText={amount => setAmount(amount)}
                  value={amount}
              />
              <Picker
                  selectedValue={currency}
                  style={{height: 50, width: 100}}
                  onValueChange={(currency) =>
                      setCurrency(currency)
                  }>
                  {currencies.map((item, index) => {
                      return(<Picker.Item label={item} value={item} key={index}/>)
                  })}
              </Picker>
          </View>
          <Button title="Calculate" onPress={() => {setSum(amount / rates[currency])}}/>
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
});
