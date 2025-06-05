import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

const SeConnecter = ({ navigation, setIsLoggedIn, setUserEmail }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erreur", "Veuillez entrer un email valide !");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://luqfoot.test/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email_use: email,    // nom des champs attendus par Laravel
          mdp_use: password,
        }),
      });

      const data = await response.json();
      console.log("Réponse API :", data);

      if (data.access_token) {
        Alert.alert("Connexion réussie", `Bienvenue ${data.user.prenom_use} !`);
        setIsLoggedIn(true);              // ✅ connecté
        setUserEmail(data.user.email_use); // ✅ stocke l'email
        setEmail("");                     // nettoie le champ email
        setPassword("");                  // nettoie le champ mot de passe
        navigation.replace("Maillots");   // ✅ redirection
      } else {
        Alert.alert("Erreur", data.message || "Identifiants incorrects.");
      }
    } catch (error) {
      console.error("Erreur API :", error);
      Alert.alert("Erreur", "Impossible de se connecter au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color="#34C759" style={styles.loader} />
      ) : (
        <Button title="Se connecter" onPress={handleLogin} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    width: "80%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  loader: { marginTop: 20 },
});

export default SeConnecter;
