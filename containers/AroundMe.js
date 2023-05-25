import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";

export default function AroundMe({ navigation }) {
  const [coordinates, setCoordinates] = useState({
    latitude: 48.856614,
    longitude: 2.3522219,
  });
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPermissionAndGetInfos = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        const { coords } = await Location.getCurrentPositionAsync();

        setCoordinates({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });

        const query = `?latitude=${coords.latitude}&longitude=${coords.longitude}`;

        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around${query}`
        );

        setRooms(data);
        setIsLoading(false);
      } else {
        alert("Permission refusée");
      }
    };

    getPermissionAndGetInfos();
  }, []);

  return isLoading ? (
    <View
      style={[
        styles.container,
        { flexDirection: "row", justifyContent: "space-around", padding: 10 },
      ]}
    >
      <ActivityIndicator size="large" color="#FF9AA2" />
    </View>
  ) : (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation
    >
      {rooms.map((room) => (
        <Marker
          key={room._id}
          coordinate={{
            latitude: room.location[1],
            longitude: room.location[0],
          }}
          onPress={() => navigation.navigate("RoomMap", { id: room._id })}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});
