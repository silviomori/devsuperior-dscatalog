import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IProduct } from "../../../@types";
import { ProductCard, ProductFilter } from "../../../components";
import { admin, theme } from "../../../styles";
import { requestBackend } from "../../../util/requests";

const ProductCrudList: React.FC = () => {
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
      <TouchableOpacity style={admin.productCrudListNewProductButton}>
        <Text style={admin.productCrudListNewProductButtonText}>
          New product
        </Text>
      </TouchableOpacity>
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
            <ProductCard product={product} onDelete={getProducts} />
          </View>
        ))
      )}
    </ScrollView>
  );
};
export default ProductCrudList;
