import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SendOtpScreen from "./src/screens/SendOtpScreen";
import VerifyOtpScreen from "./src/screens/VerifyOtpScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Send" component={SendOtpScreen} />
        <Stack.Screen name="Verify" component={VerifyOtpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
