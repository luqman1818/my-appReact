import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur notre application de vente de maillot en ligne !</Text>

      <View style={styles.buttonContainer}>
        {/* Bouton pour se connecter */}
        <Button
          title="Se connecter"
          onPress={() => navigation.navigate('SeConnecter')}
        />
      </View>

      <View style={styles.buttonContainer}>
        {/* Bouton pour s'inscrire */}
        <Button
          title="S'inscrire"
          onPress={() => navigation.navigate('Inscription')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonContainer: {
    marginBottom: 20,
    width: '80%',
  },
});

export default HomeScreen;
