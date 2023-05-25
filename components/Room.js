import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Fonction délocalisée dans le dossier "utils"
import { displayStar } from "../utils/displayStars";

const Room = ({ item }) => {
  //   console.log(item.ratingValue);
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Room", { id: item._id });
      }}
    >
      {/* Equivalent de la propriété CSS "background-image" permettant de mettre une image en background d'une div */}
      <ImageBackground
        source={{ uri: item.photos[0].url }}
        style={styles.blocImg}
      >
        <Text style={styles.price}>{item.price} €</Text>
      </ImageBackground>

      <View style={{ flexDirection: "row" }}>
        <View>
          <Text>{item.title}</Text>
          {/* Cette fonction retourne un tableau dont les éléments sont des icônes (auquels ont a ajouté une "key" pour que chaque élément soit identifiable et éviter le warning). React Native est donc en mesure d'afficher chaque élément  */}
          <View style={{ flexDirection: "row" }}>
            {displayStar(item.ratingValue)}
            <Text style={{ color: "grey" }}>{item.reviews} reviews</Text>
          </View>

          <View>
            <Image
              source={{ uri: item.user.account.photo.url }}
              style={styles.userPhoto}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Room;

const styles = StyleSheet.create({
  blocImg: {
    width: "100%",
    height: 200,
    justifyContent: "flex-end",
    marginTop: 5,
    paddingBottom: 10,
    marginBottom: 10,
  },
  price: {
    color: "white",
    backgroundColor: "black",
    width: 80,
    paddingVertical: 10,
    paddingLeft: 10,
    textAlign: "center",
    fontSize: 16,
  },
  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
});
