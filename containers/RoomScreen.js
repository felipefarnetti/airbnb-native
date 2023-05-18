import { useRoute } from "@react-navigation/core";
import { Text, View } from "react-native";
import { useEffect } from "react";
import axios from "axios";

export default function ProfileScreen() {
  const { params } = useRoute();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${params.id}`
        );

        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return (
    <View>
      <Text>user id : {params.id}</Text>
    </View>
  );
}
