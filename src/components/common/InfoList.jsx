import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const InfoList = (props) => {
  function renderElement() {
    if (props.ind == 0) {
      let answer = "";
      if (props.dorm.Available == 0) {
        answer = "Hayır";
      } else if (props.dorm.Available == 1) {
        answer = "Evet";
      } else {
        answer = "Bilinmiyor";
      }
      return <Text style={styles.text}>{answer}</Text>;
    } else if (props.ind == 1) {
      let gender = "";
      if (props.dorm.GenderType == 1) {
        gender = "Erkek";
      } else if (props.dorm.GenderType == 2) {
        gender = "Kız";
      } else {
        gender = "Kız, Erkek";
      }
      return <Text style={styles.text}>{gender}</Text>;
    } else if (props.ind == 3) {
      return <Text style={styles.text}>{props.dorm.FoodStates}</Text>;
    } else if (props.ind == 5) {
      return <Text style={styles.text}>{props.dorm.Address}</Text>;
    } else if (props.ind == 6) {
      return <Text style={styles.text}>{props.dorm.OtherInfo}</Text>;
    } else {
      return;
    }
  }
  return (
    <View>
      <View style={styles.container}>
        <Icon
          name={props.itm.icon}
          size={25}
          color="#900"
          style={{ padding: 10, paddingRight: 5, marginLeft: 5 }}
        />
        <Text style={styles.item}>{props.itm.key}</Text>
      </View>
      {props.ind == 2
        ? props.dorm.MonthlyPrice.map((element) => {
            return (
              <View style={styles.container}>
                <Text style={styles.text2}>{element.RoomInfo + " Oda:"}</Text>
                <Text style={styles.text3}>{element.Price + " TL"}</Text>
              </View>
            );
          })
        : props.ind == 4
        ? props.dorm.TelephoneNumbers.map((element) => {
            return (
              <View style={styles.container}>
                <Text style={styles.text2}>{element}</Text>
              </View>
            );
          })
        : renderElement()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  text: {
    fontSize: 18,
    marginLeft: 20,
    padding: 10,
  },
  item: {
    padding: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: "#01367a",
  },
  item2: {
    padding: 10,
    paddingLeft: 5,
    fontSize: 18,
    color: "black",
  },
  text2: {
    fontSize: 18,
    marginLeft: 20,
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  text3: {
    fontSize: 18,
    marginLeft: 5,
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
    color: "black",
  },
});

export default InfoList;
