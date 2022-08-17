import { ScrollView, Text, View } from "react-native";
import { ProductCard } from "../../components";
import { theme } from "../../styles";
import ProductPng from "../../../assets/images/product_01.png";

const products = [
  {
    id: 1,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core i7",
    price: 2279.0,
  },
  {
    id: 2,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core i7",
    price: 2279.0,
  },
  {
    id: 3,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core i7",
    price: 2279.0,
  },
  {
    id: 4,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core i7",
    price: 2279.0,
  },
  {
    id: 5,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core i7",
    price: 2279.0,
  },
];

const Catalog: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={theme.scrollContainer}>
      {products.map((product) => (
        <View key={product.id}>
          <ProductCard {...product} />
        </View>
      ))}
    </ScrollView>
  );
};

export default Catalog;
