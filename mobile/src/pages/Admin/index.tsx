import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TabBar } from "../../components";
import { isAuthenticated } from "../../util/auth";
import Categories from "./Categories";
import Products from "./Products";
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
      {activeScreen === "products" && <Products />}
      {activeScreen === "categories" && <Categories />}
      {activeScreen === "users" && <Users />}
    </View>
  );
};

export default Admin;
