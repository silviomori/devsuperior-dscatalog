import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { isAuthenticated } from "../../util/auth";

const Admin: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    isAuthenticated().then((authenticated) => {
      if (!authenticated) {
        navigation.navigate("Login" as any);
      }
    });
  }, []);

  return (
    <View>
      <Text>Admin dashboard</Text>
    </View>
  );
};

export default Admin;
