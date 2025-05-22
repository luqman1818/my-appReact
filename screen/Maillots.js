import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';

const Maillots = ({ navigation, setPanier, panier }) => {
  const [maillots, setMaillots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [quantites, setQuantites] = useState({});

  useEffect(() => {
    const fetchMaillots = async () => {
      try {
        const response = await fetch('http://luqfoot.test/api/shirts/', {
          headers: { Accept: 'application/json' },
        });

        const data = await response.json();
        setMaillots(data);

        const initialQuantites = {};
        data.forEach((item) => {
          initialQuantites[item.id_shi] = '1';
        });
        setQuantites(initialQuantites);
      } catch (error) {
        console.error("Erreur API :", error);
        Alert.alert("Erreur", "Impossible de charger les maillots.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMaillots();
  }, []);

  const handleAddToCart = (item) => {
    const qte = parseInt(quantites[item.id_shi]) || 1;
    if (qte <= 0) {
      Alert.alert("Erreur", "Quantité invalide.");
      return;
    }

    const article = {
      ...item,
      quantite: qte,
    };

    setPanier((prev) => [...prev, article]);
    Alert.alert("Ajouté", `${item.nom_shi} x${qte} ajouté au panier`);
  };

  const totalPanier = panier.reduce(
    (acc, item) => acc + item.prix_shi * item.quantite,
    0
  ).toFixed(2);

  const renderItem = ({ item }) => {
    const quantiteTexte = quantites[item.id_shi] || '1';
    const quantite = parseInt(quantiteTexte) || 1;
    const total = (item.prix_shi * quantite).toFixed(2);

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{item.nom_shi}</Text>
        <Text>Taille : {item.taille_shi}</Text>
        <Text>Prix unitaire : {item.prix_shi} €</Text>

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={quantiteTexte}
          onChangeText={(text) =>
            setQuantites((prev) => ({ ...prev, [item.id_shi]: text }))
          }
        />

        <Text style={styles.totalProduit}>Total pour ce maillot : {total} €</Text>

        <Button title="Ajouter au panier" onPress={() => handleAddToCart(item)} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.totalPanier}>🧾 Total du panier : {totalPanier} €</Text>

        <TouchableOpacity onPress={() => setPanier([])} style={styles.viderButton}>
          <Text style={styles.viderText}>🗑️ Vider le panier</Text>
        </TouchableOpacity>

        {panier.length > 0 && (
          <TouchableOpacity
            onPress={() => navigation.navigate("Panier")}
            style={styles.panierButton}
          >
            <Text style={styles.panierText}>🛒 Aller au panier</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={maillots}
        keyExtractor={(item) => item.id_shi.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 10,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
    borderRadius: 10,
  },
  totalPanier: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  viderButton: {
    backgroundColor: '#ff4444',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  viderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  panierButton: {
    backgroundColor: '#34C759',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  panierText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    padding: 12,
    marginBottom: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  totalProduit: {
    marginBottom: 8,
    fontWeight: '600',
  },
});

export default Maillots;
