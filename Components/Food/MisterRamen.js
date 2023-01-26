import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Button,
  TouchableOpacity,
  Modal,
} from "react-native";
import Axios from "axios";
import { Feather } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";

function MisterRamen() {
  const [view, setview] = useState([{}]);

  useEffect(() => {
    Axios.get("http://localhost:8080/selectmisterramen").then((response) => {
      setview(response.data); //데이터 받아옴
    });
  }, []);

  const viewer = view.map((view) => {
    const imgSrc = { uri: view.url };
    return (
      <TouchableOpacity
        key={view.id}
        onPress={() => {
          setVisibleModal({
            mode: true,
            menu: view.menu,
            price: view.price,
            Kcal: view.Kcal,
            url: view.url,
          });
          setimage(imgSrc);
        }}
      >
        <View style={styles.menuBox}>
          <View key={view.id} style={styles.inner}>
            <Image style={styles.img} source={imgSrc} />
            <Text style={styles.menu}>{view.menu}</Text>
            <Text style={styles.price}>${view.price}</Text>
            <Text style={styles.kcal}>Kcal: {view.Kcal}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  });

  const [visibleMoal, setVisibleModal] = useState({
    mode: false,
    menu: "",
    price: "",
    Kcal: "",
    url: "",
  });

  const [image, setimage] = useState("");

  const insertBasket = () => {
    const menu = {
      menu: visibleMoal.menu,
      price: visibleMoal.price,
      kcal: visibleMoal.Kcal,
      url: visibleMoal.url,
    };
    fetch("http://localhost:8080/insertbasket", {
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
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignSelf: "flex-start",
          flexDirection: "row",
          flexWrap: "wrap",
          width: "100%",
        }}
      >
        {viewer}
      </SafeAreaView>
      <SafeAreaView>
        {/* Modal 구현 */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={visibleMoal.mode}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setVisibleModal({ mode: false, menu: "" });
              }}
            >
              <Feather
                name="x"
                size={40}
                color="black"
                style={{ marginLeft: 290 }}
              />
            </TouchableOpacity>
            <View style={styles.modalbox}>
              <Image style={styles.modalimg} source={image} />
              <View style={styles.lineStyle} />
              <Text style={{ fontSize: 30 }}>{visibleMoal.menu}</Text>
              <View style={styles.lineStyle} />
              <Text style={{ fontSize: 25 }}>$ {visibleMoal.price}</Text>
              <View style={styles.lineStyle} />
              <Text style={{ fontSize: 18 }}>Kcal : {visibleMoal.Kcal}</Text>
              <View style={styles.lineStyle} />

              <TouchableOpacity
                onPress={() => {
                  insertBasket();
                  setVisibleModal({ mode: false, menu: "" });
                }}
              >
                <Fontisto
                  name="shopping-basket-add"
                  size={24}
                  color="black"
                  style={styles.basketBox}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
}
const styles = StyleSheet.create({
  menuBox: {
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 20,
    marginLeft: 3,
    width: 160,
    height: 230,
  },
  img: {
    width: 158,
    height: 120,
    marginTop: 10,
    borderBottom: 1,
    borderBottomColor: "black",
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
    alignItems: "center",
  },
  modalbox: {
    borderRadius: 20,
    height: 500,
    width: 270,
    borderWidth: 3,
    borderColor: "black",
    backgroundColor: "#ffffff",
    padding: 5,
    flexDirection: "cloumn",
    alignItems: "center",
  },
  modalimg: {
    width: 260,
    height: 220,
    marginTop: 10,
  },
  basketBox: {
    // borderColor: "black",
    backgroundColor: "black",
    padding: 8,
    height: 40,
    width: 100,
    marginTop: 15,
    alignSelf: "center",
    textAlign: "center",
    color: "white",
  },
  lineStyle: {
    borderWidth: 1,
    borderColor: "black",
    margin: 10,
    width: 200,
  },
});

export default MisterRamen;
