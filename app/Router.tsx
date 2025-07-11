import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import SuccessScreen from './screens/SuccessScreen';

export type RootStackParamList = {
    TeacherDiscovery: undefined;
    Success: {
        bookingData: {
            teacherId: string;
            studentName: string;
            age: string;
            trialDate: Date;
            learningDays: string;
            bookingDate: Date;
        };
        teacher: {
            id: string;
            name: { en: string; vi: string };
            subject: { en: string; vi: string };
            fee: { amount: number; currency: string };
        };
    };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function Router() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TeacherDiscovery" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="TeacherDiscovery" component={HomeScreen} />
                <Stack.Screen name="Success" component={SuccessScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}