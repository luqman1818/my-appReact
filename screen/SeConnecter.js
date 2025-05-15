import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ActivityIndicator, StyleSheet } from "react-native";

const SeConnecter = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    // Simple validation for email format
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erreur", "Veuillez entrer un email valide !");
      return;
    }

    setIsLoading(true); // Show loading indicator

    // Simulate a login request with a timeout
    setTimeout(() => {
      if (email === "test@email.com" && password === "1234") {
        Alert.alert("Connexion réussie", "Bienvenue !");
        setIsLoggedIn(true); // Connexion réussie
        setEmail("");
        setPassword(""); // Reset fields after successful login
        navigation.navigate("Maillots"); // Rediriger vers Maillots
      } else {
        Alert.alert("Erreur", "Email ou mot de passe incorrect !");
      }
      setIsLoading(false); // Hide loading indicator
    }, 1000); // Simulate network delay
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
