import {
  Image,
  ImageSourcePropType,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { text, theme } from "../styles";

interface ProductProps {
  id: number;
  imgUrl: ImageSourcePropType;
  name: string;
  price: number;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, imgUrl, price }) => {
  return (
    <TouchableOpacity style={theme.productCard}>
      <View style={theme.productCardTopContainer}>
        <Image source={imgUrl} style={theme.productCardTopContainerImage} />
      </View>
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
