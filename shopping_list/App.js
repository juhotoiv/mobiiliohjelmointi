import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';

export default function App() {
  const[list, setList] = useState([]);
  const[item, setItem] = useState('')

  const addPressed = () => {
    setList([...list, {key: item}]);
    setItem('')
  }

  const clearPressed = () => {
    setList([]);
  }

  return (
      <View style={styles.container}>
        <TextInput
            style={{borderColor: 'gray', borderWidth: 1}}
            onChangeText={item => setItem(item)}
            value={item}
        />
        <StatusBar style="auto" />
        <View style={{alignSelf: 'center', width: '50%', flexDirection: 'row', justifyContent: 'space-around'}}>
          <Button title="ADDD" onPress={addPressed}/>
          <Button title="CLEAR" onPress={clearPressed}/>
        </View>
        <View>
          <Text style={styles.header}>Shopping List</Text>
          <FlatList
              style={{alignSelf: 'center'}}
              data={list}
              renderItem={({item}) =>
                  <Text>{item.key}</Text>}
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
    alignSelf: 'center',
    fontSize: 20,
    color: '#0830bf'
  }
});
