import React, { useState } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

const maillots = [
  { id: 1, club: "FC Barcelone", prix: 90, sizes: ["S", "M", "L", "XL"] },
  { id: 2, club: "Real Madrid", prix: 95, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 3, club: "Manchester United", prix: 85, sizes: ["M", "L", "XL"] },
  { id: 4, club: "Bayern Munich", prix: 100, sizes: ["S", "L", "XL"] },
  { id: 5, club: "Paris Saint-Germain", prix: 110, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 6, club: "Juventus", prix: 88, sizes: ["S", "M"] },
  { id: 7, club: "Chelsea", prix: 92, sizes: ["M", "L", "XL"] },
  { id: 8, club: "Liverpool", prix: 97, sizes: ["S", "M", "L", "XL", "XXL"] },
  { id: 9, club: "Manchester City", prix: 105, sizes: ["L", "XL", "XXL"] },
  { id: 10, club: "AC Milan", prix: 90, sizes: ["S", "M", "L"] },
  { id: 11, club: "Inter Milan", prix: 93, sizes: ["M", "L", "XL"] },
  { id: 12, club: "Arsenal", prix: 89, sizes: ["S", "M", "L", "XL"] },
  { id: 13, club: "Tottenham", prix: 87, sizes: ["S", "M"] },
  { id: 14, club: "Dortmund", prix: 95, sizes: ["M", "L", "XL", "XXL"] },
  { id: 15, club: "Atlético Madrid", prix: 91, sizes: ["S", "M", "L"] },
  { id: 16, club: "Naples", prix: 85, sizes: ["S", "M", "L", "XL"] },
  { id: 17, club: "Ajax", prix: 80, sizes: ["S", "M"] },
  { id: 18, club: "FC Porto", prix: 78, sizes: ["M", "L", "XL"] },
  { id: 19, club: "Benfica", prix: 79, sizes: ["S", "M", "L", "XL"] },
  { id: 20, club: "Séville FC", prix: 82, sizes: ["S", "M", "L"] },
];

const Maillots = ({ route }) => {
  const navigation = useNavigation();
  const [quantites, setQuantites] = useState({});
  const [panier, setPanier] = useState(route.params?.panier || []);
  const [selectedSizes, setSelectedSizes] = useState({}); // NOUVEL ÉTAT POUR LA TAILLE

  const ajouterAuPanier = (item) => {
    const quantite = quantites[item.id] || 1;
    const tailleSelectionnee = selectedSizes[item.id] || item.sizes[0]; // Récupère la taille sélectionnée, ou la 1ère taille par défaut

    const nouveauPanier = [...panier, { ...item, quantite, taille: tailleSelectionnee }]; // AJOUTE la taille à l'item
    setPanier(nouveauPanier);
    alert(
      `${quantite} maillot(s) de ${item.club} taille ${tailleSelectionnee} ajouté(s) au panier !` // Modifie l'alerte pour afficher la taille
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={maillots}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.club}>{item.club}</Text>
            <Text style={styles.prix}>{item.prix} €</Text>
            <Text style={styles.tailles}>Tailles disponibles : {item.sizes.join(", ")}</Text>

            {/* Picker pour la QUANTITÉ (déjà existant) */}
            <Picker
              selectedValue={String(quantites[item.id] || "1")}
              style={styles.picker}
              onValueChange={(value) =>
                setQuantites({ ...quantites, [item.id]: Number(value) })
              }
            >
              {[...Array(10).keys()].map((i) => (
                <Picker.Item key={i + 1} label={`${i + 1}`} value={String(i + 1)} />
              ))}
            </Picker>

            {/* NOUVEAU Picker pour la TAILLE */}
            <Picker
              selectedValue={selectedSizes[item.id] || item.sizes[0]} // Sélectionne la 1ère taille par défaut
              style={styles.picker}
              onValueChange={(value) =>
                setSelectedSizes({ ...selectedSizes, [item.id]: value })
              }
            >
              {item.sizes.map((size) => ( // Affiche les tailles disponibles pour ce maillot
                <Picker.Item key={size} label={size} value={size} />
              ))}
            </Picker>

            <Button title="Ajouter au panier" onPress={() => ajouterAuPanier(item)} />
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
      />

      {panier.length > 0 && (
        <Button title="Voir Panier" onPress={() => navigation.navigate("Panier", { panier })} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100vh',
    padding: 10,
    backgroundColor: "#f5f5f5",
    overflowY: 'auto',
  },
  flatListContent: {
    flexGrow: 1,
  },
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
  club: { fontSize: 18, fontWeight: "bold" },
  prix: { fontSize: 16, color: "green", marginBottom: 10 },
  tailles: {
    fontSize: 14,
    color: "grey",
    marginBottom: 10,
  },
  picker: { height: 50, width: 120, marginBottom: 10 },
});

export default Maillots;