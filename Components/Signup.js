import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

function Signup({ navigation }) {
  const [signup, setsignup] = useState({
    id: "",
    pw: "",
    username: "",
    studentid: "",
  });

  const onChange = (keyvalue, e) => {
    const { text } = e.nativeEvent;
    setsignup({
      ...signup,
      [keyvalue]: text,
    });
  };

  const onClick = () => {
    const menu = {
      id: signup.id,
      pw: signup.pw,
      username: signup.username,
      studentid: signup.studentid,
    };
    fetch("http://localhost:8080/createuser", {
      method: "post", // 생성
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then((json) => {});
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <MaterialIcons
          name="local-dining"
          size={20}
          color="black"
          style={{ textAlign: "center", fontSize: 60, marginTop: 80 }}
        />
      </View>
      <View style={styles.loginbox}>
        <View>
          <Text style={{ marginTop: 20, fontSize: 16 }}>ID</Text>
          <TextInput
            style={styles.input}
            onChange={(e) => onChange("id", e)}
            value={signup.id}
          />
          <Text style={{ fontSize: 16 }}>PassWord</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChange={(e) => onChange("pw", e)}
            value={signup.pw}
          />
          <Text style={{ fontSize: 16 }}>UserName</Text>
          <TextInput
            style={styles.input}
            onChange={(e) => onChange("username", e)}
            value={signup.username}
          />
          <Text style={{ fontSize: 16 }}>Student ID</Text>
          <TextInput
            style={styles.input}
            onChange={(e) => onChange("studentid", e)}
            value={signup.studentid}
          />
          <TouchableOpacity
            style={{
              backgroundColor: "#3498db",
              padding: 8,
              height: 40,
              width: 100,
              borderRadius: 20,
              alignSelf: "center",
            }}
            onPress={() => {
              if (
                signup.id !== "" &&
                signup.pw !== "" &&
                signup.username !== "" &&
                signup.studentid !== ""
              ) {
                onClick();
                alert(`hello ${signup.username}!`);
                setsignup({ id: "", pw: "", username: "", studentid: "" });
                navigation.navigate("Login");
              } else {
                alert(`plz fill out / in`);
              }
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
              SignUp
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "column",
  },
  appTitle: {
    fontSize: 36,
    marginTop: 20,
    marginBottom: -10,
    fontWeight: "300",
    textAlign: "center",
  },
  loginbox: {
    borderWidth: 1,
    height: 500,
    borderWidth: 2,
    borderRadius: 50,
    borderStyle: "solid",
    padding: 20,
    margin: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },
});

export default Signup;
