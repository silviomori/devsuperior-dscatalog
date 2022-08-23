import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import { AuthContext, AuthContextData } from "./src/AuthContext";
import Routes from "./src/routes";

const App: React.FC = () => {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
