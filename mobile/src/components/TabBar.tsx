import { Text, TouchableOpacity, View } from "react-native";
import { tabbar } from "../styles";

interface IProps {
  activeScreen: string;
  setActiveScreen: (screen: string) => void;
}

const TabBar: React.FC<IProps> = ({ activeScreen, setActiveScreen }) => {
  const changeActiveScreen = (screen: string) => {
    setActiveScreen(screen);
  };

  return (
    <View style={tabbar.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[tabbar.pill, activeScreen === "products" && tabbar.pillActive]}
        onPress={() => changeActiveScreen("products")}
      >
        <Text
          style={[
            tabbar.pillText,
            activeScreen === "products" && tabbar.pillTextActive,
          ]}
        >
          Products
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          tabbar.pill,
          activeScreen === "categories" && tabbar.pillActive,
        ]}
        onPress={() => changeActiveScreen("categories")}
      >
        <Text
          style={[
            tabbar.pillText,
            activeScreen === "categories" && tabbar.pillTextActive,
          ]}
        >
          Categories
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[tabbar.pill, activeScreen === "users" && tabbar.pillActive]}
        onPress={() => changeActiveScreen("users")}
      >
        <Text
          style={[
            tabbar.pillText,
            activeScreen === "users" && tabbar.pillTextActive,
          ]}
        >
          Users
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TabBar;
