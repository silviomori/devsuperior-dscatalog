import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { text, theme } from "../../styles";

import welcome from "../../../assets/images/welcome.png";
import arrow from "../../../assets/icons/arrow_right_white.png";

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={theme.container}>
      <View style={theme.card}>
        <Image source={welcome} style={theme.welcomeImage} />
        <View style={theme.textContainer}>
          <Text style={text.title}>Meet the best product catalog</Text>
          <Text style={text.welcomeDescription}>
            We help you find the best products available on the market.
          </Text>
        </View>
        <TouchableOpacity
          style={theme.arrowButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Catalog")}
        >
          <Text style={text.arrowButtonText}>Start searching now</Text>
          <View style={theme.arrowButtonContainer}>
            <Image source={arrow} style={theme.arrowButtonImage} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
