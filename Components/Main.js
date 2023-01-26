import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import HangCup from "./Food/Hangcup";
import MisterRamen from "./Food/MisterRamen";
import Eggselent from "./Food/Eggselent";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createMaterialTopTabNavigator();

function Main({ navigation }) {
  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Basket")}>
        <FontAwesome
          name="shopping-basket"
          size={24}
          color="black"
          style={{ marginRight: 20 }}
        />
      </TouchableOpacity>
    ),
  });
  return (
    <Tab.Navigator
      screenOptions={{
        initialRouteName: "HangCup",
      }}
    >
      <Tab.Screen
        name="행컵"
        component={HangCup}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons name="food-apple" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="미스터라멘"
        component={MisterRamen}
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="ramen-dining" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="에그셀런트"
        component={Eggselent}
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="hamburger-check"
              size={24}
              color="black"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  appTitle: {
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: "300",
    textAlign: "center",
  },
});

export default Main;
