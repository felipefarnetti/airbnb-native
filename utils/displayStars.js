import { Entypo } from "@expo/vector-icons";

export const displayStar = (number) => {
  const tab = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= number) {
      // si je suis à un tour inférieur ou égale à la note alors j'ajoute un étoile jaune
      tab.push(<Entypo name="star" size={18} color="#feb100" key={i} />);
    } else {
      // sinon j'ajoute une étoile grise
      tab.push(<Entypo name="star" size={18} color="#bbbbbb" key={i} />);
    }
  }

  return tab;
};
