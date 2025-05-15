import React from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Panier = ({ route }) => {
  const navigation = useNavigation();
  const panier = route.params?.panier || [];

  const total = panier.reduce((acc, item) => acc + item.prix * item.quantite, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Mon Panier</Text>

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
              <Text>Taille : {item.taille}</Text> {/* Affiche la taille si elle est disponible */}
              <Text style={styles.sousTotal}>
                Total : {item.prix * item.quantite} €
              </Text>
            </View>
          )}
        />
      )}

      <Text style={styles.total}>Total à payer : {total} €</Text>

      <View style={styles.buttonContainer}> {/* Container pour centrer le bouton */}
        {/* 👇👇👇  LE BOUTON "Voir le détail" EST ICI 👇👇👇 */}
        <Button
          title="Voir le détail"
          onPress={() => navigation.navigate("DetailScreen", { panier: panier })} // Passe le panier en params
        />
        {/* 👆👆👆  FIN DU BOUTON "Voir le détail" 👆👆👆 */}
      </View>

      <Button
        title="Retour aux Maillots"
        onPress={() => navigation.navigate("Maillots", { panier })}
      />
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
  buttonContainer: { // Style pour centrer le bouton
    marginTop: 20,
    alignItems: 'center', // Centre horizontalement
  },
});

export default Panier;