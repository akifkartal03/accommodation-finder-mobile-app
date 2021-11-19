import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const Avatars = (props) => {
  return (
    <View style={styles.container3}>
      <Icon
        name="camera"
        size={25}
        color="#900"
        style={{ padding: 10, paddingRight: 5, marginLeft: 5 }}
      />
      <Text style={styles.item}>Avatar :</Text>
      <TouchableOpacity onPress={() => props.setter}>
        <Image
          style={{ borderColor: props.imgPicker(0), ...styles.image }}
          source={{ uri: props.images[0] }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.setter}>
        <Image
          style={{ borderColor: props.imgPicker(1), ...styles.image }}
          source={{ uri: props.images[1] }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.setter}>
        <Image
          style={{ borderColor: props.imgPicker(2), ...styles.image }}
          source={{ uri: props.images[2] }}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => props.setter}>
        <Image
          style={{
            borderColor: () => {
              props.imgPicker(3);
            },
            ...styles.image,
          }}
          source={{ uri: props.images[3] }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  container2: {
    marginTop: 10,
  },
  container3: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    paddingTop: 10,
  },
  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 5,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    paddingLeft: 10,
    fontSize: 18,
    color: "black",
  },
  image: {
    width: 35,
    height: 35,
    borderWidth: 3,
    borderRadius: 75,
    marginTop: 6,
    marginLeft: 6,
    marginRight: 10,
  },
});

export default Avatars;
