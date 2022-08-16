import { NavigationContainer } from "@react-navigation/native";
import { Text, View } from "react-native";
import Routes from "./src/routes";

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
};

export default App;
