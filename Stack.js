import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Main from "./Components/Main";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import Basket from "./Components/Food/Basket";

const Stack = createStackNavigator();

function StackNavigation() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen
        name="Main"
        component={Main}
        options={() => ({
          title: "Hoseo",
          headerLeft: () => null,
        })}
      />
      <Stack.Screen name="Basket" component={Basket} />
    </Stack.Navigator>
  );
}

export default StackNavigation;
