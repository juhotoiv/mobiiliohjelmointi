import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {
    const[product, setProduct] = useState('')
    const[amount, setAmount] = useState('')
    const[listItems, setListItems] = useState([]);

    const db = SQLite.openDatabase('shoppingdb.db')

    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql('create table if not exists shoppingitem (id integer primary key not null, ' +
                'product text, amount text);');
        }, null, updateList)
    })

    const updateList = () => {
        db.transaction(tx => {
            tx.executeSql('select * from shoppingitem;', [], (_, { rows }) =>
            setListItems(rows._array)
            );
        });
    }

    const saveItem = () => {
        db.transaction(tx => {
            tx.executeSql('insert into shoppingitem (product, amount) values (?, ?);',
                [product, amount]);
        }, null, updateList);
        setProduct('');
        setAmount('');
    }

    const deleteItem = (id) => {
        db.transaction(tx => {
            tx.executeSql('delete from shoppingitem where id = ?;', [id]);
            }, null, updateList
        );
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
                    keyExtractor={item => item.id.toString()}
                    data={listItems}
                    renderItem={({item}) =>
                        <View style={styles.listcontainer}>
                            <Text style={styles.listtext}>{item.product}, {item.amount}</Text>
                            <Text style={styles.boughtlink} onPress={() => deleteItem(item.id)}>bought</Text>
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
