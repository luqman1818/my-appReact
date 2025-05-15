import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screen/HomeScreen";
import SeConnecter from "../screen/SeConnecter";
import Inscription from "../screen/Inscription";
import Maillots from "../screen/Maillots";
import Panier from "../screen/Panier";
import DetailScreen from "../screen/DetailScreen";
import '../screen/globalStyles.css';


const Stack = createStackNavigator();

const MainNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [panier, setPanier] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Page d'accueil */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />

        {/* Page de connexion */}
        <Stack.Screen name="SeConnecter">
          {(props) => <SeConnecter {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>

        {/* Page d'inscription */}
        <Stack.Screen name="Inscription" component={Inscription} />

        {/* Page des maillots (accessible après connexion) */}
        <Stack.Screen name="Maillots">
          {(props) => (
            <Maillots {...props} isLoggedIn={isLoggedIn} panier={panier} setPanier={setPanier} />
          )}
        </Stack.Screen>

        {/* Page du panier */}
        <Stack.Screen name="Panier">
          {(props) => <Panier {...props} panier={panier} />}
        </Stack.Screen>

        {/* Page de détail de la commande */}
        <Stack.Screen name="DetailScreen" component={DetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;