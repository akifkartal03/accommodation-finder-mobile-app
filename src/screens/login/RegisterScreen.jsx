import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../components/login/Background";
import Logo from "../../components/login/Logo";
import Header from "../../components/login/Header";
import Button from "../../components/login/Button";
import TextInput from "../../components/login/TextInput";
import TextInput2 from "../../components/login/PassText";
import BackButton from "../../components/login/BackButton";
import { theme } from "../../components/login/theme";
import { emailValidator } from "../../utils/validators/emailValidator";
import { passwordValidator } from "../../utils/validators/passwordValidator";
import { nameValidator } from "../../utils/validators/nameValidator";
import Firebase from "../../database/firebase_config";
import { getUserByID } from "../../database/services/user_service";
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";
import { getDorms } from "../../database/services/dormitory_service";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [load, setLoad] = useState(false);
  const [{ user }, dispatch] = useStore();

  /*useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user2) => {
      if (user2) {
        navigation.reset({
          index: 0,
          routes: [{ name: "DormData" }],
        });
      }
    });

    return unsubscribe;
  }, []);*/

  const onSignUpPressed = () => {
    setLoad(true);
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setLoad(false);
      return;
    }

    Firebase.auth()
      .createUserWithEmailAndPassword(email.value, password.value)
      .then((userCredentials) => {
        const user3 = userCredentials.user;
        const nameVal = name.value;
        const emailVal = email.value;
        const id = user3.uid;
        const likedComments = [];
        const age = 0;
        const department = "Belirtilmemiş";
        const grade = "Belirtilmemiş";
        const gender = "Seçiniz";
        const stayedDorms = [];
        const chatList = [];
        const avatar =
          "https://cdn-icons-png.flaticon.com/128/1177/1177568.png";
        const isLookForHouseMate = 0;
        Firebase.firestore().collection("users").doc(user3.uid).set({
          nameVal,
          emailVal,
          id,
          likedComments,
          age,
          department,
          grade,
          gender,
          stayedDorms,
          avatar,
          isLookForHouseMate,
          chatList,
        });
        getUserByID(user3.uid)
          .then((docRef) => {
            user.info = docRef.data();
            getDorms()
              .then((docRef2) => {
                user.nav = navigation;
                user.dorms = docRef2;
                dispatch(setUSer(user));
                setLoad(false);
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Dashboard", params: { mykey: 1 } }],
                });
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            console.log(error);
            setLoad(false);
          });
      })
      .catch((error) => {
        console.log(error.message);
        setLoad(false);
      });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Hesap Oluştur</Header>
      <TextInput
        label="Ad Soyad"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: "" })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Mail Adresi"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />

      <TextInput2
        label="Şifre"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 20 }}
        loading={load}
      >
        Kayıt Ol
      </Button>
      <View style={styles.row}>
        <Text>Zaten bir hesabınız varmı? </Text>
        <TouchableOpacity onPress={() => navigation.replace("LoginScreen")}>
          <Text style={styles.link}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
});
