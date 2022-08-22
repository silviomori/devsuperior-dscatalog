import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { NavBar } from "../components";
import { Home, Catalog, ProductDetails, Login } from "../pages";
import { colors, nav } from "../styles";

const Stack = createNativeStackNavigator();

const Routes: React.FC = () => {
  const HeaderText: React.FC = () => (
    <Text style={nav.textLeft}>DS Catalog</Text>
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: "",
        headerStyle: { backgroundColor: colors.primary },
        headerLeft: () => <HeaderText />,
        headerRight: () => <NavBar />,
      }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Catalog" component={Catalog} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="Admin" component={Login} />
    </Stack.Navigator>
  );
};

export default Routes;
