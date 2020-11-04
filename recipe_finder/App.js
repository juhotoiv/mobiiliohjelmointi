import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, FlatList, TextInput, Button, Image } from 'react-native';

export default function App() {
  const [ingredient, setIngredient] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    const url = 'http://www.recipepuppy.com/api/?i=' + ingredient;
    fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
          setRecipes(responseJson.results);
        })
        .catch((error) => {
          Alert.alert('Error', 'Error fetching recipes');
        });
  }

  const listSeparator = () => {
      return (
          <View
              style={{
                height: 1,
                width: "80%",
                backgroundColor: "#CED0CE",
                marginLeft: "10%"
              }}
          />
      );
  };

  return (
      <View style={styles.container}>
          <View ></View>
          <FlatList
              style={{marginLeft : "5%"}}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) =>
                  <View style={{flex:1, flexDirection: 'row'}}>
                      <Image source={{uri: item.thumbnail}} // Use item to set the image source
                      style={{
                          width:50,
                          height:50,
                          borderWidth:2,
                          borderColor:'#d35647',
                          resizeMode:'contain',
                          margin:8
                      }}/>
                      <Text>{item.title}</Text>
                  </View>
                  }
              ItemSeparatorComponent={listSeparator}
              data={recipes}
          />
          <TextInput
              style={{fontSize: 18, width: 200}}
              value={ingredient}
              placeholder="Write ingredient..."
              onChangeText={(ingredient) => setIngredient(ingredient)}
          />
          <Button title="Search" onPress={getRecipes} />
          <StatusBar style="auto" />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
