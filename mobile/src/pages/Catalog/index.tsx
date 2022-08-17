import { ScrollView, Text, View } from "react-native";
import { ProductCard, ProductFilter } from "../../components";
import { theme } from "../../styles";
import ProductPng from "../../../assets/images/product_01.png";
import { useEffect, useState } from "react";

const products = [
  {
    id: 1,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core i9",
    price: 2279.0,
  },
  {
    id: 2,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core i7",
    price: 1779.0,
  },
  {
    id: 3,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core i5",
    price: 1279.0,
  },
  {
    id: 4,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core i3",
    price: 779.0,
  },
  {
    id: 5,
    imgUrl: ProductPng,
    name: "Desktop computer - Intel Core Duo",
    price: 279.0,
  },
];

const Catalog: React.FC = () => {
  const [filterValue, setFilterValue] = useState("");

  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  useEffect(() => {
    if (filterValue.length > 0) {
      let res = products.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      );
      setFilteredProducts(res);
    } else {
      setFilteredProducts(products);
    }
  }, [filterValue]);

  return (
    <ScrollView contentContainerStyle={theme.scrollContainer}>
      <ProductFilter
        placeholder="Product name"
        value={filterValue}
        onChangeText={setFilterValue}
      />
      {filteredProducts.map((product) => (
        <View key={product.id}>
          <ProductCard {...product} />
        </View>
      ))}
    </ScrollView>
  );
};

export default Catalog;
