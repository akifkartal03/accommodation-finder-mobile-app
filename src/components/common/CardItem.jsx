import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, Button, Icon } from "react-native-elements";

const CardItem = (props) => {
  const onDetailPress = () => {
    props.nav.navigate("DormDetails", props.dorm);
  };
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={{ color: "black" }}>{props.dorm.Name}</Card.Title>
        <Card.Divider />
        <Image style={styles.img} source={{ uri: props.dorm.Images[0] }} />
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 2,
            marginTop: 15,
            backgroundColor: "#c9153c",
          }}
          onPress={onDetailPress}
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
    borderColor: "#01367a",
  },
  img: {
    width: 330,
    height: 200,
    marginTop: -10,
  },
});

export default CardItem;
