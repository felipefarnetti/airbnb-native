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
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";
import logo from "../assets/logo.png";

const SignInScreen = ({ setToken }) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async () => {
    if (email && password) {
      if (setErrorMessage !== null) {
        setErrorMessage(null);
      }
      try {
        const response = await axios.post(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in`,
          { email, password }
        );
        // console.log(JSON.stringify(response.data.id, null, 2));
        if (response.data.token) {
          const token = response.data.token;
          setToken(token);
          setId(response.data.id);
          // console.log(token);
          setIsLoading(false);
          alert("You are connected");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage("Incorrect credentials");
        } else {
          setErrorMessage("An error occurred");
        }
      }
    } else {
      setErrorMessage("Please fill all the fields");
    }
  };

  return !isLoading ? (
    <View
      style={[
        styles.container,
        { flexDirection: "row", justifyContent: "space-around", padding: 10 },
      ]}
    >
      <ActivityIndicator size="large" color="#EA5860" />
    </View>
  ) : (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.contentContainer}
      style={StyleSheet.container}
    >
      <View style={styles.view}>
        <Image source={logo} style={styles.img} />
        <Text style={styles.title}>Sign In</Text>
      </View>

      <View style={[styles.view, { marginBottom: 150 }]}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoComplete="email"
          placeholder="email"
          placeholderTextColor="lightgrey"
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />

        <TextInput
          style={styles.input}
          autoCapitalize="none"
          placeholder="password"
          placeholderTextColor="lightgrey"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
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
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>

        <Text
          style={{ color: "darkgrey" }}
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          No account ? Register
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default SignInScreen;

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
    marginTop: 100,
  },
  title: {
    color: "grey",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 80,
    marginTop: 20,
  },
  input: {
    height: 30,
    borderBottomColor: "pink",
    borderBottomWidth: 2,
    width: "80%",
    marginVertical: 20,
    fontSize: 16,
  },
  btn: {
    height: 60,
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    borderRadius: 50,
    marginBottom: 20,
    marginTop: 50,
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
