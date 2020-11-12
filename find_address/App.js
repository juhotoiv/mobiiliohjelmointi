import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location'

export default function App() {
    const [location, setLocation] = useState(null)
    const [address, setAddress] = useState('');
    const [googleApiResponse, setGoogleApiResponse] = useState('')
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [region, setRegion] = useState({
        latitude: 60.200692,
        longitude: 24.934302,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,});
    const [markers, setMarkers] = useState([{latlng: { latitude: 60.201373, longitude: 24.934041}, title:'Haaga-Helia'}])

    const fetchCoordinates = () => {
        let addressEncoded = address.replace(' ', '%20');

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + addressEncoded + '&key=AIzaSyBEzGG2lzNO193XVs5_0b-Tsj-F0Soll9s')
            .then(response => response.json())
            .then(data => setGoogleApiResponse(data));
    };

    const getLocation = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to access location');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        }
    }

    useEffect(() => {
        getLocation();
    }, [])

    useEffect(() => {
        if (location !== null) {
            setLat(location.coords.latitude);
            setLng(location.coords.longitude);
        };
        console.log(location);
    }, [location])

    useEffect(() => {
        if (googleApiResponse !== '') {
            console.log('Latituudi: ' + googleApiResponse.results[0].geometry.location.lat);
            console.log('Longtituudi: ' + googleApiResponse.results[0].geometry.location.lng);
            setLat(googleApiResponse.results[0].geometry.location.lat);
            setLng(googleApiResponse.results[0].geometry.location.lng);
        }
    }, [googleApiResponse])

    useEffect(() => {
        if (lat !== '') {
            let reg = {...region};
            reg.latitude = parseFloat(lat);
            reg.longitude = parseFloat(lng);
            setRegion(reg);

            let newMarker = [{latlng: { latitude: parseFloat(lat), longitude: parseFloat(lng)}, title:address}];
            setMarkers(newMarker);
        }
    }, [lat]);

    return (
        <View style={styles.container}>
            <MapView
                style={{  flex: 1  }}
                region={ region }
                annotations={markers}>
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        coordinate={marker.latlng}
                        title={marker.title}
                    />
                ))}
            </MapView>
            <StatusBar style="auto" />
            <View style={{ flex: 0.1, marginBottom: 10}}>
                <TextInput
                    style={{flex: 1, minHeight: 50, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={address => setAddress(address)}
                    value={address}
                />
                <Button style={{ flex: 1 }}
                        title="Show"
                        onPress={() => fetchCoordinates()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
    },
});
