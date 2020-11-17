import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import * as firebase from 'firebase';

export default function App() {
  const[product, setProduct] = useState('')
  const[amount, setAmount] = useState('')
  const[listItems, setListItems] = useState([]);

  const firebaseConfig = {
      apiKey: "AIzaSyAWX9VBi0XPRn9PxRIRJdZw3rV9qqw6d_s",
      authDomain: "fir-demo-a15b0.firebaseapp.com",
      databaseURL: "https://fir-demo-a15b0.firebaseio.com",
      projectId: "fir-demo-a15b0",
      storageBucket: "fir-demo-a15b0.appspot.com",
      messagingSenderId: "924970458679",
      appId: "1:924970458679:web:79d1ef0c2d157d211369b2",
      measurementId: "G-341X862CFP"
  };

    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

  useEffect(() => {
    firebase.database().ref('shoppingitems/').on('value', snapshot => {
        const data = snapshot.val();
        if (data !== null) {
            const prods = Object.entries(data);
            console.log(prods)
            setListItems(prods);
        } else {
            setListItems([])
        }
    });
  }, []);

  const saveItem = () => {
    firebase.database().ref('shoppingitems/').push(
        {'product': product, 'amount': amount}
    );
    setProduct('');
    setAmount('');
  }

  const deleteItem = (id) => {
      console.log(id)
    const userRef = firebase.database().ref().child('shoppingitems/' + id);
    userRef.remove()
  }

  return (
      <View style={styles.container}>
        <TextInput
            style={{borderColor: 'gray', borderWidth: 1, minHeight: 40, margin: 8}}
            placeholder = 'Product'
            onChangeText={product => setProduct(product)}
            value={product}
        />
        <TextInput
            style={{borderColor: 'gray', borderWidth: 1, minHeight: 40, margin: 8}}
            placeholder = 'Amount'
            onChangeText={amount => setAmount(amount)}
            value={amount}
        />
        <StatusBar style="auto" />
        <View style={{alignSelf: 'center', width: '50%', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button title="SAVE" onPress={saveItem}/>
        </View>
        <View>
          <Text style={styles.header}>Shopping List</Text>
          <FlatList
              style={{alignSelf: 'center'}}
              keyExtractor={(item) => item[0]}
              data={listItems}
              renderItem={({item}) =>
                  <View style={styles.listcontainer}>
                    <Text style={styles.listtext}>{item[1].product}, {item[1].amount}</Text>
                    <Text style={styles.boughtlink} onPress={() => deleteItem(item[0])}>bought</Text>
                  </View>}
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
  header: {
    marginTop: 16,
    alignSelf: 'center',
    fontSize: 20,
    color: '#20919d'
  },
  listcontainer: {
    flexDirection: 'row'
  },
  listtext: {
    fontSize: 18,
    marginRight: 8
  },
  boughtlink: {
    color: '#0830bf',
    fontSize: 18
  }
});
