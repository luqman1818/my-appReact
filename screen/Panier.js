import React from "react";
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Panier = ({ panier, setPanier }) => {
  const navigation = useNavigation();

  const total = panier.reduce(
    (acc, item) => acc + item.prix_shi * item.quantite,
    0
  );

  const supprimerArticle = (index) => {
    const nouveauPanier = [...panier];
    nouveauPanier.splice(index, 1);
    setPanier(nouveauPanier);
  };

  const handleValidation = () => {
    setPanier([]); // Vide le panier
    navigation.navigate("Maillots"); // Va sur la page Maillots
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.card}>
      <Text style={styles.nom}>{item.nom_shi}</Text>
      <Text>Taille : {item.taille_shi}</Text>
      <Text>Quantité : {item.quantite}</Text>
      <Text>Prix : {item.prix_shi} €</Text>
      <Text style={styles.sousTotal}>
        Total : {item.prix_shi * item.quantite} €
      </Text>
      <TouchableOpacity
        onPress={() => supprimerArticle(index)}
        style={styles.deleteButton}
      >
        <Text style={styles.deleteText}>Supprimer ❌</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>Mon Panier</Text>

      {panier.length === 0 ? (
        <Text style={styles.vide}>Votre panier est vide.</Text>
      ) : (
        <>
          <FlatList
            data={panier}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
          />

          <Text style={styles.total}>Total à payer : {total} €</Text>

          <Button title="Valider la commande" onPress={handleValidation} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  titre: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  vide: { textAlign: "center", marginTop: 50, fontSize: 18 },
  card: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 15,
  },
  nom: { fontWeight: "bold", fontSize: 18 },
  sousTotal: { marginTop: 5, fontWeight: "600" },
  total: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: 20,
  },
  deleteButton: {
    marginTop: 10,
    backgroundColor: "#ff4444",
    padding: 8,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default Panier;
