import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';

const Inscription = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      Alert.alert('Erreur', 'Veuillez entrer un email valide');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit avoir au moins 6 caractères');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://luqfoot.test/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          prenom_use: firstName,
          nom_use: lastName,
          date_naissance_use: birthDate,
          adresse_use: streetAddress,
          localite_use: locality,
          email_use: email,
          mdp_use: password,
        }),
      });

      const data = await response.json();
      console.log('✅ Réponse API:', data);

      if (response.ok && data.access_token) {
        // Connexion réussie automatiquement
        Alert.alert('Bienvenue ' + data.user.prenom_use, 'Inscription réussie.');

        // Ici tu peux stocker le token ou l'email dans un contexte ou AsyncStorage si besoin
        // navigation.navigate('Maillots'); // si tu veux push
        navigation.reset({
          index: 0,
          routes: [{ name: 'Maillots' }],
        });
      } else {
        const firstError =
          data.errors && Object.values(data.errors).length > 0
            ? Object.values(data.errors)[0][0]
            : data.message || 'Inscription échouée';
        Alert.alert('Erreur', firstError);
      }
    } catch (error) {
      console.error('❌ Erreur de connexion:', error);
      Alert.alert('Erreur', 'Impossible de contacter le serveur');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inscription</Text>

      <TextInput style={styles.input} placeholder="Prénom" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Nom" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Date de naissance (JJ-MM-AAAA)" value={birthDate} onChangeText={setBirthDate} />
      <TextInput style={styles.input} placeholder="Rue" value={streetAddress} onChangeText={setStreetAddress} />
      <TextInput style={styles.input} placeholder="Localité" value={locality} onChangeText={setLocality} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirmer le mot de passe" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <Button title="S'inscrire" onPress={handleSubmit} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
  },
});

export default Inscription;
