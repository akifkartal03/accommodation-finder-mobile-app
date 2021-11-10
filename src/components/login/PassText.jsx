import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { TextInput as Input } from "react-native-paper";
import { theme } from "./theme";
import Icon from "react-native-vector-icons/FontAwesome5";

export default function TextInput2({ errorText, description, ...props }) {
  const [hidePass, setHidePass] = useState(true);
  return (
    <View style={styles.container}>
      <Input
        style={styles.input}
        selectionColor={theme.colors.primary}
        underlineColor="transparent"
        mode="outlined"
        right={
          <Input.Icon
            name={() => (
              <Icon
                name={hidePass ? "eye-slash" : "eye"}
                size={22}
                color="black"
                onPress={() => setHidePass(!hidePass)}
              />
            )}
          />
        }
        {...props}
        secureTextEntry={hidePass ? true : false}
      />

      {description && !errorText ? (
        <Text style={styles.description}>{description}</Text>
      ) : null}
      {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    height: 50,
  },
  description: {
    fontSize: 13,
    color: theme.colors.secondary,
    paddingTop: 5,
  },
  error: {
    fontSize: 13,
    color: theme.colors.error,
    paddingTop: 5,
  },
});
