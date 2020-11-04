import React from 'react';
import { Text, View, FlatList } from 'react-native';

export default function HistoryScreen({ route, navigation }) {
    const { history } = route.params;
    return (
        <View>
            <FlatList
                style={{alignSelf: 'center'}}
                data={history}
                renderItem={({item}) =>
                    <Text>{item.value}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};