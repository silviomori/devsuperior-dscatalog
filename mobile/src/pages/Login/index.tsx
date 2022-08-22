import { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { text, theme } from "../../styles";

import eyeClosed from "../../../assets/icons/eye-closed.png";
import eyeOpen from "../../../assets/icons/eye-open.png";
import arrow from "../../../assets/icons/arrow_right_white.png";
import { ILoginData } from "../../@types";
import { requestBackendLogin } from "../../util/requests";
import { getAuthData, saveAuthData } from "../../util/storage";

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginData, setLoginData] = useState<ILoginData>({
    username: "",
    password: "",
  });

  const handleLogin = () => {
    requestBackendLogin(loginData)
      .then((response) => {
        saveAuthData(response.data);
        getAuthData().then((authData) =>
          console.warn("handleLogin: ", authData)
        );
      })
      .catch((err) => console.error(err));
  };

  return (
    <View style={theme.container}>
      <View style={theme.card}>
        <Text style={text.title}>Login</Text>
        <View>
          <TextInput
            style={theme.loginTextInput}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={loginData?.username}
            onChangeText={(newText) => {
              const newLoginData: ILoginData = { ...loginData };
              newLoginData.username = newText;
              setLoginData(newLoginData);
            }}
          />
          <View style={theme.loginPasswordContainer}>
            <TextInput
              style={theme.loginTextInput}
              placeholder="Password"
              autoCapitalize="none"
              value={loginData?.password}
              onChangeText={(newText) => {
                const newLoginData: ILoginData = { ...loginData };
                newLoginData.password = newText;
                setLoginData(newLoginData);
              }}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={theme.loginPasswordVisibilityButton}
            >
              <Image
                source={showPassword ? eyeOpen : eyeClosed}
                style={theme.loginPasswordVisibilityImage}
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={theme.arrowButton}
          activeOpacity={0.8}
          onPress={() => handleLogin()}
        >
          <Text style={text.arrowButtonText}>Login</Text>
          <View style={theme.arrowButtonContainer}>
            <Image source={arrow} style={theme.arrowButtonImage} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
