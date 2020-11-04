import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer} from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import CalculatorScreen from "./CalculatorScreen";
import HistoryScreen from "./HistoryScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Calculator" component={CalculatorScreen} />
                <Stack.Screen name="History" component={HistoryScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
