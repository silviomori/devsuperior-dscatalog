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

interface IProps {
  product: IProduct;
  onDelete?: Function;
}

const ProductCard: React.FC<IProps> = ({ product, onDelete }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={theme.productCard}>
      <TouchableOpacity
        style={theme.productCardInfoContainer}
        onPress={() => {
          navigation.navigate("ProductDetails", { id: product.id });
        }}
      >
        {
          <View style={theme.productCardTopContainer}>
            <Image
              source={{ uri: product.imgUrl }}
              style={theme.productCardTopContainerImage}
            />
          </View>
        }
        <View style={theme.productCardBottomContainer}>
          <Text style={text.productCardTitle}>{product.name}</Text>
          <View style={theme.productCardPriceContainer}>
            <Text style={text.productCardCurrencySymbol}>$</Text>
            <Text style={text.productCardPrice}>{product.price}</Text>
          </View>
        </View>
      </TouchableOpacity>
      {onDelete && (
        <View style={theme.productCardButtonsContainer}>
          <TouchableOpacity
            style={[theme.productCardButton, theme.productCardButtonDelete]}
          >
            <Text
              style={[text.productCardButton, text.productCardButtonDelete]}
            >
              Delete
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[theme.productCardButton, theme.productCardButtonEdit]}
          >
            <Text style={[text.productCardButton, text.productCardButtonEdit]}>
              Edit
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ProductCard;
