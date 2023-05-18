import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import axios from "axios";
import {
  Text,
  TextInput,
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import logo from "../assets/logo.png";

const SignUpScreen = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async () => {
    if (email && username && description && password && confirmPassword) {
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match");
      }
      setErrorMessage(null);

      try {
        const response = await axios.post(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up`,
          { email, username, description, password }
        );
        // console.log(JSON.stringify(response, null, 2));

        if (response.data.token) {
          const token = response.data.token;
          setToken(token);
          alert("Account created");
        } else {
          setErrorMessage("An error ocurred");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage("Incorrect credentials");
        } else {
          setErrorMessage("Email already used");
        }
      }
    } else {
      setErrorMessage("Please fill all the fields");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={StyleSheet.container}
    >
      <View style={styles.view}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.title}>Sign Up</Text>
      </View>

      <View style={[styles.view, { marginBottom: 20 }]}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoComplete="email"
          placeholder="email"
          placeholderTextColor="lightgrey"
          onChangeText={(text) => {
            setErrorMessage("");
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="username"
          autoCapitalize="none"
          placeholderTextColor="lightgrey"
          onChangeText={(text) => {
            setErrorMessage("");
            setUsername(text);
          }}
          value={username}
        />
        <TextInput
          style={styles.textArea}
          placeholder="Describe yourself in a few words.."
          placeholderTextColor="lightgrey"
          multiline={true}
          autoCapitalize="none"
          textAlignVertical="top"
          onChangeText={(text) => {
            setErrorMessage("");
            setDescription(text);
          }}
          value={description}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="password"
          placeholderTextColor="lightgrey"
          secureTextEntry={true}
          onChangeText={(text) => {
            setErrorMessage("");
            setPassword(text);
          }}
          value={password}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="confirm password"
          placeholderTextColor="lightgrey"
          secureTextEntry={true}
          onChangeText={(text) => {
            setConfirmPassword(text);
          }}
          value={confirmPassword}
        />
      </View>

      <View style={styles.view}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <Text
          style={{ color: "darkgrey" }}
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          Already have an account? Sign in
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
  contentContainer: {
    backgroundColor: "white",
    alignItems: "center",
    flex: 1,
  },
  view: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    height: 107,
    width: 100,
    resizeMode: "contain",
    marginTop: 80,
    marginBottom: 20,
  },
  title: {
    color: "grey",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderBottomColor: "pink",
    borderBottomWidth: 2,
    width: "80%",
    marginBottom: 30,
    fontSize: 16,
  },
  textArea: {
    width: "80%",
    height: 100,
    borderWidth: 2,
    borderColor: "pink",
    paddingTop: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  btn: {
    height: 60,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderRadius: 50,
    marginBottom: 20,
    borderColor: "#EA5860",
  },
  btnText: {
    color: "grey",
    fontSize: 18,
    fontWeight: "500",
  },
  link: {
    marginBottom: 20,
  },
  errorMessage: {
    color: "red",
    marginBottom: 20,
  },
});
