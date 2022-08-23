import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IProduct } from "../../@types";
import { text, theme } from "../../styles";
import { BASE_URL } from "../../util/requests";
import arrow_back from "../../../assets/icons/arrow_left_blue.png";

const ProductDetails: React.FC = () => {
  const route: any = useRoute();
  const navigation = useNavigation();
  const [product, setProduct] = useState<IProduct>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${BASE_URL}/products/${route.params?.id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={theme.productDetailsContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={theme.productDetailsCard}>
          <TouchableOpacity
            style={theme.goBackContainer}
            onPress={navigation.goBack}
          >
            <Image source={arrow_back} />
            <Text style={text.goBack}>Back</Text>
          </TouchableOpacity>

          <View style={theme.productDetailsImgContainer}>
            <Image
              source={{ uri: product?.imgUrl }}
              style={theme.productDetailsImage}
            />
          </View>

          <View style={theme.productDetailsNamePriceContainer}>
            <Text style={text.productDetailsName}>{product?.name}</Text>
            <View style={theme.productCardPriceContainer}>
              <Text style={text.productCardCurrencySymbol}>$</Text>
              <Text style={text.productCardPrice}>{product?.price}</Text>
            </View>
          </View>

          <ScrollView style={theme.productDetailsDescriptionContainer}>
            <Text style={text.productDetailsDescription}>
              Product description
            </Text>
            <Text style={text.productDetailsDescription}>
              {product?.description}
            </Text>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default ProductDetails;
