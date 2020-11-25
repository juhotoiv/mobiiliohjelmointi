import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      if (data.length > 0) {
        setContacts(data);
      }
    }
  }


  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
          style={{alignSelf: 'center', marginTop:30}}
          keyExtractor = { item => item.id }
          data={contacts}
          renderItem={({item}) =>
              <Text style={{fontSize: 15}}>{item.firstName + '  :  ' + item.phoneNumbers[0].number.toString()}</Text>}
      />
      <Button
              title="Show"
              onPress={() => getContacts()} />
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
