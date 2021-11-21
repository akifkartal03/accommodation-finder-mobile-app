import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useStore } from "../../redux/store/Provider";

const InfoDetails = (props) => {
  const [{ user }, dispatch] = useStore();
  return (
    <View>
      {props.ind == 0 ? (
        <View style={styles.container}>
          <Image style={styles.image} source={{ uri: props.dr.avatar }} />
          <Text style={styles.text3}>{props.dr.nameVal}</Text>
        </View>
      ) : props.ind == 1 ? (
        <View style={styles.container}>
          <Icon
            name={props.itm.icon}
            size={25}
            color="green"
            style={{
              padding: 10,
              paddingRight: 5,
              marginLeft: 10,
              marginTop: 5,
            }}
          />
          <Text style={styles.item}>{props.itm.key + " :"}</Text>
          <Text style={styles.item2}>{props.dr.age}</Text>
        </View>
      ) : props.ind == 2 ? (
        <View style={styles.container}>
          <Icon
            name={props.itm.icon}
            size={25}
            color="green"
            style={{
              padding: 10,
              paddingRight: 5,
              marginLeft: 10,
              marginTop: 5,
            }}
          />
          <Text style={styles.item}>{props.itm.key + " :"}</Text>
          <Text style={styles.item2}>{props.dr.department}</Text>
        </View>
      ) : props.ind == 3 ? (
        <View style={styles.container}>
          <Icon
            name={props.itm.icon}
            size={25}
            color="green"
            style={{
              padding: 10,
              paddingRight: 5,
              marginLeft: 10,
              marginTop: 10,
            }}
          />
          <Text style={styles.item}>{props.itm.key + " :"}</Text>
          <Text style={styles.item2}>{props.dr.grade}</Text>
        </View>
      ) : props.ind == 4 ? (
        <View style={styles.container}>
          <Icon
            name={props.itm.icon}
            size={25}
            color="green"
            style={{
              padding: 10,
              paddingRight: 5,
              marginLeft: 10,
              marginTop: 5,
            }}
          />
          <Text style={styles.item}>{props.itm.key + " :"}</Text>
          <Text style={styles.item2}>
            {props.dr.gender == "Seçiniz" ? "Belirtilmemiş" : props.dr.gender}
          </Text>
        </View>
      ) : (
        <View style={styles.container}>
          <Icon
            name={props.itm.icon}
            size={25}
            color="green"
            style={{
              padding: 10,
              paddingRight: 5,
              marginLeft: 10,
              marginTop: 10,
            }}
          />
          <Text style={styles.item}>{props.itm.key + " :"}</Text>
        </View>
      )}
      <View style={props.ind == 5 ? styles.header : styles.header2}>
        {props.ind == 5 ? (
          props.dr.stayedDorms.map((element, index) => {
            index = index + 1;
            return (
              <View style={styles.container2}>
                <Text style={styles.text2}>
                  {"- " + user.dorms.find(({ id }) => id == element).Name}
                </Text>
              </View>
            );
          })
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  header2: {
    marginBottom: 0,
  },
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
  container2: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
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
    color: "green",
    marginTop: 10,
    fontWeight: "bold",
  },
  item2: {
    padding: 10,
    paddingLeft: 0,
    fontSize: 18,
    color: "black",
    marginTop: 10,
  },
  text2: {
    fontSize: 18,
    marginLeft: 20,
    padding: 10,
    paddingBottom: 5,
    paddingTop: 5,
  },
  text3: {
    fontSize: 23,
    marginLeft: 15,
    padding: 10,
    paddingBottom: 5,
    paddingTop: 15,
    color: "black",
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginLeft: 20,
    marginTop: 5,
  },
});

export default InfoDetails;
