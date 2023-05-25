import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";

export default function MyProfile({ userToken, setToken, userId, setId }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    try {
      const { data } = await axios.post(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update`,
        {
          email,
          username,
          description,
        }
      );
      // console.log(response.data)

      if (data.token) {
        console.log(data.token);
        setToken(data.token);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (data.id) {
          console.log(data.id);
          setData(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData;
  }, []);

  // return isLoading ? (
  //   <View
  //     style={[
  //       styles.container,
  //       { flexDirection: "row", justifyContent: "space-around", padding: 10 },
  //     ]}
  //   >
  //     <ActivityIndicator size="large" color="#EA5860" />
  //   </View>
  // ) : (
  return (
    <View>
      <Text>Hello Settings</Text>
      <TouchableOpacity
        onPress={() => {
          setToken(null);
        }}
      >
        <Text>Log out</Text>
      </TouchableOpacity>
    </View>
  );

  // );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
  },
});
