import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { TabBar } from "../../components";
import { admin } from "../../styles";
import { isAuthenticated } from "../../util/auth";
import Categories from "./Categories";
import ProductCrudForm from "./Product/ProductCrudForm";
import ProductCrudList from "./Product/ProductCrudList";
import Users from "./Users";

const Admin: React.FC = () => {
  const navigation = useNavigation();
  const [activeScreen, setActiveScreen] = useState("products");

  useEffect(() => {
    isAuthenticated().then((authenticated) => {
      if (!authenticated) {
        navigation.navigate("Login" as any);
      }
    });
  }, []);

  return (
    <View>
      <TabBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
      <ScrollView style={{ height: "85%" }}>
        {activeScreen === "products" && (
          <ProductCrudList setActiveScreen={setActiveScreen} />
        )}
        {activeScreen === "newProduct" && (
          <ProductCrudForm setActiveScreen={setActiveScreen} />
        )}
        {activeScreen === "categories" && <Categories />}
        {activeScreen === "users" && <Users />}
      </ScrollView>
    </View>
  );
};

export default Admin;
