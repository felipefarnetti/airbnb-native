import { Image, StyleSheet } from "react-native";

const HeaderLogo = () => {
  return <Image source={require("../assets/logo.png")} style={styles.logo} />;
};

export default HeaderLogo;

const styles = StyleSheet.create({
  logo: {
    height: 30,
    width: 30,
    resizeMode: "contain",
  },
});
