import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
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

      <View>
        <View>
          <Text>{item.title}</Text>

          {/* Cette fonction retourne un tableau dont les éléments sont des icônes (auquels ont a ajouté une "key" pour que chaque élément soit identifiable et éviter le warning). React Native est donc en mesure d'afficher chaque élément  */}
          <View>{displayStar(item.ratingValue)}</View>
        </View>
        <View></View>
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
    paddingBottom: 30,
  },
  price: {
    color: "white",
    backgroundColor: "black",
    width: 80,
    paddingVertical: 10,
    paddingLeft: 10,
  },
});
