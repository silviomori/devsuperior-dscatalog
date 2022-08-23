import {
  Alert,
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
import { AxiosRequestConfig } from "axios";
import { requestBackend } from "../util/requests";

interface IProps {
  product: IProduct;
  onDeleteCallback?: Function;
}

const ProductCard: React.FC<IProps> = ({ product, onDeleteCallback }) => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleDelete = (productId: number | undefined) => {
    if (product === undefined) {
      return;
    }

    Alert.alert(
      "Delete product?",
      "Are you sure you want to delete this product?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const config: AxiosRequestConfig = {
              method: "DELETE",
              url: `/products/${productId}`,
              withCredentials: true,
            };
            requestBackend(config).then(() => {
              onDeleteCallback?.();
            });
          },
        },
      ]
    );
  };

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
      {onDeleteCallback && (
        <View style={theme.productCardButtonsContainer}>
          <TouchableOpacity
            style={[theme.productCardButton, theme.productCardButtonDelete]}
            onPress={() => {
              handleDelete(product.id);
            }}
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
