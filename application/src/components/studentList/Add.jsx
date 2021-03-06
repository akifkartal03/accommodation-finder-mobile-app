import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";
import { updateUser } from "../../database/services/user_service";
import { getHomeMate } from "../../database/services/user_service";
const Add = (props) => {
  const [{ user }, dispatch] = useStore();
  const addUser = () => {
    if (user.info.isLookForHouseMate == 1) {
      Alert.alert("Uyarı", "Zaten Eklisiniz!", [
        { text: "Tamam", onPress: () => {} },
      ]);
    } else {
      user.info.isLookForHouseMate = 1;
      dispatch(setUSer(user));
      updateUser(user.info.id, user.info)
        .then((docRef) => {
          //console.log(docRef);
          getHomeMate()
            .then((docRef) => {
              props.set(docRef);
            })
            .catch((error) => {
              alert("Bir hata oluştu. Lütfen tekrar deneyin.");
            });
        })
        .catch((error) => {
          alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        });

      Alert.alert("Başarılı", "Ev arkadaşı arayanlar listesine eklendiniz.", [
        {
          text: "Tamam",
          onPress: () => {},
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={addUser} style={styles.container}>
        <Icon
          name="plus-circle"
          size={25}
          color="green"
          style={{ padding: 10, paddingRight: 8 }}
        />
        <Text style={styles.text}>{props.msg}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    marginTop: 5,
  },
  text: {
    fontSize: 18,
    color: "blue",
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    paddingLeft: 20,
    fontSize: 18,
    height: 44,
  },
});

export default Add;
