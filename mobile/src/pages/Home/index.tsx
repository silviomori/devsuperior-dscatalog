import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";

const Home: React.FC = ({ navigation }) => {
  return (
    <View>
      <Text>Welcome!</Text>
      <TouchableOpacity>
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            backgroundColor: "#069",
            width: 150,
            padding: 10,
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("Catalog")}
        >
          Open Catalog
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
