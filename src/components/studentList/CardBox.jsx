import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Card, Button } from "react-native-elements";
import { useStore } from "../../redux/store/Provider";
import Icon from "react-native-vector-icons/FontAwesome5";

const CardBox = (props) => {
  const [{ user }, dispatch] = useStore();
  const onDetailPress = () => {
    props.nav.navigate("StaticProfile", props.dorm);
  };
  return (
    <View style={styles.container}>
      <Card containerStyle={styles.card}>
        <View style={styles.parent2}>
          <View style={styles.commentz}>
            <Image style={styles.avat} source={{ uri: props.dorm.avatar }} />
            <Text style={styles.name}>{props.dorm.nameVal}</Text>
          </View>
        </View>
        <Card.Divider />
        <View style={styles.container2}>
          <Icon
            name="user-graduate"
            size={25}
            color="#01367a"
            style={{
              padding: 10,
              paddingRight: 5,
              paddingLeft: 5,
              marginLeft: 5,
              marginTop: 0,
              paddingTop: 0,
            }}
          />
          <Text style={styles.item}>{"Bölüm" + " :"}</Text>
          <Text style={styles.item2}>{props.dorm.department}</Text>
        </View>
        <View style={styles.container2}>
          <Icon
            name="user-check"
            size={25}
            color="#01367a"
            style={{
              padding: 10,
              paddingRight: 5,
              paddingLeft: 5,
              marginLeft: 5,
              marginTop: 0,
              paddingTop: 0,
            }}
          />
          <Text style={styles.item}>{"Cinsiyet" + " :"}</Text>
          <Text style={styles.item2}>
            {props.dorm.gender == "Seçiniz"
              ? "Belirtilmemiş"
              : props.dorm.gender}
          </Text>
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
  container2: {
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
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
    borderColor: "green",
  },
  img: {
    width: 330,
    height: 200,
    marginTop: -10,
  },
  parent2: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  avat: {
    justifyContent: "flex-start",
    margin: 10,
    marginTop: 0,
    marginLeft: 5,
    width: 60,
    height: 60,
    borderRadius: 100,
  },
  name: {
    color: "black",
    fontSize: 25,
    alignSelf: "flex-start",
    margin: 10,
    marginTop: 15,
  },
  commentz: {
    flexDirection: "row",
    alignSelf: "flex-start",
  },
  item: {
    padding: 10,
    paddingLeft: 5,
    fontSize: 18,
    color: "#01367a",
    marginTop: 0,
    fontWeight: "bold",
    paddingTop: 3,
  },
  item2: {
    padding: 10,
    paddingLeft: 0,
    fontSize: 18,
    color: "black",
    marginTop: 0,
    paddingTop: 3,
  },
});

export default CardBox;
