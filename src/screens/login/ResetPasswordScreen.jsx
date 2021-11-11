import React, { useState } from "react";
import { Alert } from "react-native";
import Background from "../../components/login/Background";
import BackButton from "../../components/login/BackButton";
import Logo from "../../components/login/Logo";
import Header from "../../components/login/Header";
import TextInput from "../../components/login/TextInput";
import Button from "../../components/login/Button";
import { emailValidator } from "../../utils/validators/emailValidator";
import Firebase from "../../database/firebase_config";

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState({ value: "", error: "" });

  const sendResetPasswordEmail = () => {
    const emailError = emailValidator(email.value);
    if (emailError) {
      setEmail({ ...email, error: emailError });
      return;
    }
    console.log(email.value);
    Firebase.auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        Alert.alert(
          "Gönderildi",
          "Şifre yenileme bağlantın e-mail adresine gönderildi.",
          [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]
        );
      })
      .catch((error) => {
        Alert.alert("Hata", "Bir hata oluştu tekrar dene!", [
          { text: "OK", onPress: () => {} },
        ]);
      });
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Şifreni Yenile</Header>
      <TextInput
        label="E-mail adresi"
        returnKeyType="done"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: "" })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="Şifre yenileme bağlantın mail adresine iletilecek."
      />
      <Button
        mode="contained"
        onPress={sendResetPasswordEmail}
        style={{ marginTop: 16 }}
      >
        Gönder
      </Button>
    </Background>
  );
}
