import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { text, theme } from "../styles";
import { IProduct } from "../@types";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const ProductCard: React.FC<IProduct> = ({ id, name, imgUrl, price }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <TouchableOpacity
      style={theme.productCard}
      onPress={() => {
        navigation.navigate("ProductDetails", { id });
      }}
    >
      {
        <View style={theme.productCardTopContainer}>
          <Image
            source={{ uri: imgUrl }}
            style={theme.productCardTopContainerImage}
          />
        </View>
      }
      <View style={theme.productCardBottomContainer}>
        <Text style={text.productCardTitle}>{name}</Text>
        <View style={theme.productCardPriceContainer}>
          <Text style={text.productCardCurrencySymbol}>$</Text>
          <Text style={text.productCardPrice}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
