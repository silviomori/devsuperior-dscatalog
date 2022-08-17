import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { text, theme } from "../../styles";

import welcome from "../../../assets/images/welcome.png";
import arrow from "../../../assets/icons/arrow.png";

const Home: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={theme.container}>
      <View style={theme.card}>
        <Image source={welcome} style={theme.welcomeImage} />
        <View style={theme.textContainer}>
          <Text style={theme.welcomeTitle}>Meet the best product catalog</Text>
          <Text style={theme.welcomeDescription}>
            We help you find the best products available on the market.
          </Text>
        </View>
        <TouchableOpacity
          style={theme.welcomeButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Catalog")}
        >
          <Text style={theme.welcomeButtonText}>Start searching now</Text>
          <View style={theme.welcomeButtonArrowContainer}>
            <Image source={arrow} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
