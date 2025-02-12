import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "./screens/HomeScreen";
import { RestaurantScreen } from "./screens/RestaurantScreen";
import { OrderTrackingScreen } from "./screens/OrderTrackingScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { AuthScreen } from "./screens/AuthScreen";
import { AddressScreen } from "./screens/AddressScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
    <BaseNavigationContainer>
        <StackNavigator.Navigator
            initialRouteName="Auth"
            screenOptions={{
                headerShown: true,
            }}
        >
            <StackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
            <StackNavigator.Screen
                name="Home"
                component={HomeScreen}
                options={{ title: "Restaurants" }}
            />
            <StackNavigator.Screen
                name="Restaurant"
                component={RestaurantScreen}
            />
            <StackNavigator.Screen
                name="OrderTracking"
                component={OrderTrackingScreen}
                options={{ title: "Track Order" }}
            />
            <StackNavigator.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: "My Profile" }}
            />
            <StackNavigator.Screen
                name="Address"
                component={AddressScreen}
                options={{ title: "Manage Addresses" }}
            />
        </StackNavigator.Navigator>
    </BaseNavigationContainer>
);