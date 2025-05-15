import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from './components/CustomButton';
import MainNavigation from './navigation/MainNavigation';
import BoxContainer from './components/BoxContainer';



export default function App() {
  return (
    // <View style ={styles.container}>
    //   <BoxContainer></BoxContainer>
    //  {/* <CustomButton></CustomButton> */}
    // </View>

    <>
      <MainNavigation />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
