import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Button,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import Axios from "axios";
import { Feather } from "@expo/vector-icons";

function Basket() {
  const [view, setview] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:8080/selectbasket").then((response) => {
      setview(response.data); //데이터 받아옴
    });
  });

  const onDelete = () => {
    const menu = {
      id: a.id,
    };
    fetch("http://localhost:8080/deletemenu", {
      method: "DELETE", // 삭제
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(menu),
    })
      .then((res) => res.json())
      .then((json) => {});
  };

  const viewer = view.map((view) => {
    const imgSrc = { url: view.url };
    return (
      <View key={view.id}>
        <View style={styles.menuBox}>
          <View style={styles.inner}>
            <Image style={styles.img} source={imgSrc} />
            <Text
              style={{
                fontSize: 14,
                marginLeft: 10,
              }}
            >
              {view.menu}
            </Text>
            <Text>
              <Feather name="x" size={40} color="black" />
            </Text>
          </View>
        </View>
      </View>
    );
  });

  return (
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
      <View>{viewer}</View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  menuBox: {
    borderWidth: 1,
    marginTop: 20,
    marginLeft: 3,
    width: "98%",
    height: 122,
  },
  img: {
    width: 158,
    height: 120,
    borderBottom: 1,
    borderBottomColor: "black",
    alignSelf: "flex-start",
  },
  menu: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 5,
  },
  price: {
    fontSize: 17,
    fontWeight: "lighter",
    marginTop: 5,
  },
  kcal: {
    fontSize: 14,
    marginTop: 5,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  modalbox: {
    borderRadius: 20,
    height: 500,
    width: 270,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "#ffffff",
    padding: 5,
  },
});

export default Basket;
