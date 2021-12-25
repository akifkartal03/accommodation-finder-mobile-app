import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, Button, Icon } from "react-native-elements";
import { updateDorm } from "../../database/services/dormitory_service";
import { useStore } from "../../redux/store/Provider";
const CardItem = (props) => {
  const [{ user }, dispatch] = useStore();
  const onDetailPress = () => {
    props.nav.navigate("DormDetails", props.dorm);
  };
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <Card.Title style={{ color: "black", marginBottom: 5 }}>
          {props.dorm.Name}
        </Card.Title>
        <Card.Divider
          style={{
            marginBottom: 10,
            marginTop: 5,
            color: "#01367a",
            borderWidth: 1,
          }}
          color="#01367a"
        />
        <View style={styles.cnt}>
          <Image style={styles.img} source={{ uri: props.dorm.Images[0] }} />
        </View>
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
          title="Detaylı Bilgi"
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
  cnt: {
    flex: 1,
  },
  img: {
    height: 200,
  },
});

export default CardItem;
