import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

const CardItem = (props) => {
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title>{props.title}</Card.Title>
        <Card.Divider />
        <Image
          style={styles.img}
          source={require("../../../assets/images/hudayi.jpg")}
        />
        <Button
          buttonStyle={{
            borderRadius: 3,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
            marginTop: 15,
            backgroundColor: "#c9153c",
          }}
          title="Detaylar"
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 10,
  },
  header: {
    height: 70,
    padding: 15,
    backgroundColor: "darkslateblue",
  },
  text: {
    color: "#fff",
    fontSize: 30,
    textAlign: "center",
  },
  card: {
    borderWidth: 2,
    borderColor: "#f6911b",
  },
  img: {
    width: 345,
    height: 200,
  },
});

export default CardItem;
