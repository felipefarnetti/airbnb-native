import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";

import Room from "../components/Room";

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );

        // console.log(data);
        setRooms(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={styles.container}>
      <FlatList
        data={rooms}
        keyExtractor={(room) => room._id}
        renderItem={({ item }) => {
          // console.log(item);
          return <Room item={item} />;
        }}
        // Pour afficher la ligne de séparation entre chaque room
        ItemSeparatorComponent={() => <Text style={styles.line}></Text>}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  line: {
    backgroundColor: "grey",
    height: 1,
    marginVertical: 10,
  },
});
