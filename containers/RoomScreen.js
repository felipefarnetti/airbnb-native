import { useRoute } from "@react-navigation/core";
import { Text, View, Image } from "react-native";
import { useEffect, useState } from "react";
import SwiperFlatList from "react-native-swiper-flatlist";
import axios from "axios";

import { displayStar } from "../utils/displayStars";

export default function ProfileScreen() {
  const { params } = useRoute();
  const [roomData, setRoomData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${params.id}`
        );

        setRoomData(data);
        console.log(data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  if (!roomData) {
    return null; // Attendre que les données soient chargées
  }

  const { title, description, price, ratingValue, photos, user, reviews } =
    roomData;
  const { username } = user.account;

  return (
    <View>
      <SwiperFlatList
        data={photos}
        renderItem={({ item }) => (
          <Image
            style={{ height: 300, width: 400 }}
            source={{ uri: item.url }}
          />
        )}
      />
      <Text>{price} €</Text>
      <View>
        <View>
          <Text style={{ fontSize: 18 }}>{title}</Text>
          <View style={{ flexDirection: "row" }}>
            {displayStar(ratingValue)}
            <Text style={{ color: "grey" }}>{reviews} reviews</Text>
          </View>
          <Text>{description}</Text>
          {/* Affiche les étoiles en fonction de la valeur de ratingValue */}

          <Text>Host: {username}</Text>
        </View>
        <View></View>
      </View>
    </View>
  );
}
