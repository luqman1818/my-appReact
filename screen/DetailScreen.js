import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const panier = route.params?.panier || [];
  const total = panier.reduce((acc, item) => acc + item.prix * item.quantite, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Détail de la Commande</Text>

      {panier.length === 0 ? (
        <Text style={styles.vide}>Votre panier est vide.</Text>
      ) : (
        <FlatList
          data={panier}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nom}>{item.club}</Text>
              <Text>Quantité : {item.quantite}</Text>
              <Text>Prix : {item.prix} €</Text>
              <Text>Taille : {item.taille}</Text> {/* LIGNE AJOUTÉE POUR LA TAILLE */}
              <Text style={styles.sousTotal}>
                Total : {item.prix * item.quantite} €
              </Text>
            </View>
          )}
        />
      )}

      <Text style={styles.total}>Total à payer : {total} €</Text>

      <View style={styles.buttonContainer}>
        <Button
          title="Retour à l'accueil"
          onPress={() => navigation.navigate("HomeScreen")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#f5f5f5" },
  titre: { fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  vide: { textAlign: "center", fontSize: 18, marginTop: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  nom: { fontSize: 18, fontWeight: "bold" },
  sousTotal: { fontSize: 16, fontWeight: "bold", marginTop: 5 },
  total: { fontSize: 20, fontWeight: "bold", textAlign: "center", marginTop: 20 },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center', // Centre horizontalement si besoin
  },
});

export default DetailScreen;