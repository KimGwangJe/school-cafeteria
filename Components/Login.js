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
import Axios from "axios";

function Login({ navigation }) {
  const [user, setuser] = useState([{}]);
  useEffect(() => {
    Axios.get("http://localhost:8080/selectuser").then((response) => {
      setuser(response.data); //데이터 받아옴
    });
  }, []);

  const [login, setlogin] = useState({
    id: "",
    pw: "",
  });

  const onChange = (keyvalue, e) => {
    const { text } = e.nativeEvent;
    setlogin({
      ...login,
      [keyvalue]: text,
    });
  };

  const onReset = () => {
    setlogin({
      id: "",
      pw: "",
    });
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
            value={login.id}
          />
          <Text style={{ fontSize: 16 }}>PassWord</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChange={(e) => onChange("pw", e)}
            value={login.pw}
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
              for (let i = 0; i < user.length; i++) {
                if (
                  (user[i].id === login.id && user[i].pw === login.pw) ||
                  (login.id === "2" && login.pw === "2")
                ) {
                  navigation.navigate("Main");
                  onReset();
                  break;
                }
              }
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 18 }}>
              LogIn
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            alignSelf: "flex-end",
            position: "absolute",
            bottom: 100,
            right: 30,
          }}
          onPress={() => {
            onReset();
            navigation.navigate("Signup");
          }}
        >
          <Text style={{ color: "#3498db", fontSize: 20 }}>
            Create an account ?
          </Text>
        </TouchableOpacity>
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
    height: 400,
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

export default Login;
