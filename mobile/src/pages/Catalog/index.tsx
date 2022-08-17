import {
  ActivityIndicator,
  ImageSourcePropType,
  ScrollView,
  Text,
  View,
} from "react-native";
import { ProductCard, ProductFilter } from "../../components";
import { theme } from "../../styles";
import { useCallback, useEffect, useState } from "react";
import { AxiosError, AxiosRequestConfig } from "axios";
import { requestBackend } from "../../util/requests";
import { IProduct } from "../../@types";

const Catalog: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [loading, setLoading] = useState(false);

  const getProducts = useCallback(() => {
    setLoading(true);
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/products",
      params: {
        page: 0,
        size: 6,
        name: filterValue,
      },
    };
    requestBackend(config)
      .then((response) => {
        setProducts(response.data.content);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [filterValue]);

  useEffect(getProducts, [getProducts]);

  return (
    <ScrollView contentContainerStyle={theme.scrollContainer}>
      <ProductFilter
        placeholder="Product name"
        value={filterValue}
        onChangeText={setFilterValue}
      />
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        products.map((product) => (
          <View key={product.id}>
            <ProductCard {...product} />
          </View>
        ))
      )}
    </ScrollView>
  );
};

export default Catalog;
