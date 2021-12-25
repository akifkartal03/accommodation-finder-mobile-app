import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import { useStore } from "../../redux/store/Provider";
import MainPageHeader from "../../components/header/mainPageHeader";
import { getUserReports } from "../../database/services/report_service";
import { useIsFocused } from "@react-navigation/native";
import Spinner from "react-native-loading-spinner-overlay";

const ReportCheck = ({ navigation, route }) => {
  const [{ user }, dispatch] = useStore();
  const [comment, setComment] = useState("");
  const [data, setData] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const [users, setUsers] = useState([]);
  const image = "https://bootdey.com/img/Content/avatar/avatar7.png";
  const isFocused = useIsFocused();

  useEffect(() => {
    setSpinner(true);
    getUserReports(user.info.id)
      .then((docRef) => {
        setData(
          docRef.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
        setSpinner(false);
      })
      .catch((error) => {
        setSpinner(false);
        alert(error);
      });
    setSpinner(false);
  }, [isFocused]);

  const datePicker = (date) => {
    const monthNames = [
      "Ocak",
      "Şubat",
      "Mart",
      "Nisan",
      "Mayıs",
      "Haziran",
      "Temmuz",
      "Ağustos",
      "Eylül",
      "Ekim",
      "Kasım",
      "Aralık",
    ];
    const dateObj = date;
    const month = monthNames[dateObj.getMonth()];
    const day = String(dateObj.getDate()).padStart(2, "0");
    const year = dateObj.getFullYear();
    return day + " " + month + " " + year;
  };
  return !spinner ? (
    <View style={styles.common}>
      <MainPageHeader
        headTitle={"Hata Bildirimlerin"}
        nav={navigation}
        size={23}
      />
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: user.info.avatar ? user.info.avatar : image,
          }}
        />

        <View style={styles.content}>
          <View style={styles.contentHeader}>
            <Text style={styles.name2}>{user.info.nameVal}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          borderBottomColor: "green",
          borderBottomWidth: 1,
        }}
      />
      <FlatList
        style={styles.root}
        data={data}
        extraData={spinner}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        renderItem={(item) => {
          const Notification = item.item;
          return (
            <View style={styles.container}>
              <View style={styles.content}>
                <View style={styles.contentHeader}>
                  <View
                    style={{
                      justifyContent: "flex-start",
                      alignItems: "flex-start",
                      flex: 1,
                    }}
                  >
                    <Text style={styles.name}>{Notification.dormName}</Text>
                  </View>
                  <Text style={styles.time}>
                    {datePicker(new Date(Notification.date))}
                  </Text>
                </View>
                <Text rkType="primary3 mediumLine">{Notification.message}</Text>
                <View style={styles.commentz}>
                  <Text style={styles.star3}>{"Durumu: "}</Text>
                  <Text style={styles.star}>
                    {Notification.resolved ? "Çözüldü" : "Kontrol ediliyor"}
                  </Text>
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  ) : (
    <View style={styles.spin}>
      <Spinner
        visible={true}
        textContent={"Yükleniyor..."}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  spin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
  root: {
    backgroundColor: "#ffffff",
    marginTop: 5,
    marginBottom: 10,
  },
  container: {
    paddingLeft: 15,
    paddingRight: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  content: {
    marginLeft: 10,
    flex: 1,
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#CCCCCC",
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginLeft: 2,
  },
  time: {
    fontSize: 11,
    color: "#808080",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  name: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 5,
    paddingTop: 0,
    marginTop: -3,
  },
  name2: {
    color: "black",
    fontSize: 20,
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 5,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  common: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    marginLeft: 10,
    marginBottom: 3,
    fontSize: 17,
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "white",
    borderBottomColor: "#66737C",
  },
  commentx: {
    flexDirection: "row",
  },
  commenty: {
    flex: 1,
    flexDirection: "row",
  },
  like: {
    flexDirection: "row",
    alignSelf: "flex-end",
    margin: 5,
    marginBottom: 0,
  },
  star: {
    alignSelf: "flex-start",
    marginBottom: 0,
    marginTop: 20,
    fontSize: 13,
    color: "#808080",
  },
  star3: {
    alignSelf: "flex-start",
    marginBottom: 0,
    marginTop: 20,
    fontSize: 13,
    color: "#808080",
    fontWeight: "bold",
  },
  star2: {
    alignSelf: "flex-start",
    marginBottom: 0,
    marginTop: 21,
    marginRight: 8,
  },
  tx: {
    marginTop: 4,
    marginLeft: 2,
    fontSize: 12,
    marginRight: 17,
  },
  spinnerTextStyle: {
    color: "green",
  },
  commentz: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginRight: 10,
  },
});
export default ReportCheck;
