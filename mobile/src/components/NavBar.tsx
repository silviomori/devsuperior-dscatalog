import { useNavigation, useRoute } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import menu from "../../assets/icons/menu.png";
import { AuthContext } from "../AuthContext";
import { nav } from "../styles";
import { isAuthenticated } from "../util/auth";
import { removeAuthData } from "../util/storage";
import { getTokenData, TokenData } from "../util/token";

const NavBar: React.FC = () => {
  const { authContextData, setAuthContextData } = useContext(AuthContext);
  const [show, setShow] = useState<boolean>(false);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    isAuthenticated().then(async (response) => {
      setAuthContextData({ authenticated: response });
    });
  }, [setAuthContextData]);

  const handleLogout = async () => {
    await removeAuthData();
    setAuthContextData({ authenticated: false });
    navigate("Home");
  };

  const navigate = (path: any) => {
    setShow(false);
    if (path) {
      navigation.navigate(path);
    }
  };

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
          {authContextData.authenticated ? (
            <TouchableOpacity style={nav.option} onPress={() => handleLogout()}>
              <Text style={nav.optionText}>Sign Out</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={nav.option}
              onPress={() => navigate("Login")}
            >
              <Text
                style={[
                  nav.optionText,
                  route.name === "Login" ? nav.optionTextActive : null,
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default NavBar;
