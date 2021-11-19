import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
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
import Firebase from "../../database/firebase_config";
import { getUserByID } from "../../database/services/user_service";
import { useStore } from "../../redux/store/Provider";
import { setUSer } from "../../redux/actions/LoginAction";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [load, setLoad] = useState(false);
  const [{ user }, dispatch] = useStore();

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "DormData" }],
        });
      }
    });

    return unsubscribe;
  }, []);

  const onLoginPressed = () => {
    setLoad(true);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      setLoad(false);
      return;
    }
    var t0 = performance.now();
    Firebase.auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((userCredentials) => {
        var t1 = performance.now();
        console.log("Login time " + (t1 - t0) + " milliseconds.");
        const user2 = userCredentials.user;
        getUserByID(user2.uid)
          .then((docRef) => {
            user.info = docRef.data();
            user.info.id = user2.uid;
            dispatch(setUSer(user));
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setLoad(false);
        alert(error.message);
      });
  };

  const addData = () => {
    navigation.navigate("ResetPasswordScreen");
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Tekrar Hoşgeldin.</Header>
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
      />

      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={addData}>
          <Text style={styles.forgot}>Şifrenimi unuttun?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed} loading={load}>
        Giriş Yap
      </Button>
      <View style={styles.row}>
        <Text>Hesabınız yok mu? </Text>
        <TouchableOpacity onPress={() => navigation.replace("RegisterScreen")}>
          <Text style={styles.link}>Kayıt ol</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  back: {
    marginTop: 0,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  goz: {
    marginTop: 100,
  },
});
