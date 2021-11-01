import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Background from "../../components/login/Background";
import Logo from "../../components/login/Logo";
import Header from "../../components/login/Header";
import Button from "../../components/login/Button";
import TextInput from "../../components/login/TextInput";
import BackButton from "../../components/login/BackButton";
import { theme } from "../../components/login/theme";
import { emailValidator } from "../../utils/validators/emailValidator";
import { passwordValidator } from "../../utils/validators/passwordValidator";
import Firebase from "../../database/firebase_config";
import { addDorm } from "../../database/services/dormitory_service";
import data from "../../database/dorms";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  useEffect(() => {
    const unsubscribe = Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      }
    });

    return unsubscribe;
  }, []);

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    Firebase.auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const addData = () => {
    data.map((element) => {
      addDorm(element);
    });
    navigation.navigate("ResetPasswordScreen");
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Tekrar Hoşgeldin.</Header>
      <TextInput
        label="Email"
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
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: "" })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <View style={styles.forgotPassword}>
        <TouchableOpacity onPress={addData}>
          <Text style={styles.forgot}>Şifrenimi unuttun?</Text>
        </TouchableOpacity>
      </View>
      <Button mode="contained" onPress={onLoginPressed}>
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
});
