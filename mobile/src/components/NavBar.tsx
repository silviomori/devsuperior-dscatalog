import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import menu from "../../assets/icons/menu.png";
import { nav } from "../styles";

const NavBar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();

  function navigate(path: any) {
    setShow(false);
    if (path) {
      navigation.navigate(path);
    }
  }
  return (
    <TouchableOpacity onPress={() => setShow(!show)}>
      <Image source={menu} />
      {show && (
        <View style={nav.optionsContainer}>
          <TouchableOpacity style={nav.option} onPress={() => navigate("Home")}>
            <Text
              style={[
                nav.optionText,
                route.name === "Home" ? nav.optionTextActive : null,
              ]}
            >
              Home
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={nav.option}
            onPress={() => navigate("Catalog")}
          >
            <Text
              style={[
                nav.optionText,
                route.name === "Catalog" ? nav.optionTextActive : null,
              ]}
            >
              Catalog
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={nav.option}
            onPress={() => navigate("Admin")}
          >
            <Text
              style={[
                nav.optionText,
                route.name === "Admin" ? nav.optionTextActive : null,
              ]}
            >
              Admin
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NavBar;
