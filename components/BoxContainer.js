import react from "react";
import { View,StyleSheet } from "react-native";

const BoxContainer = ()=> {
    return(
        <View style={styles.container}>
            <View style={[styles.box, { backgroundColor: 'red' }]} />
            <View style={[styles.box, { backgroundColor: 'blue' }]} />
            <View style={[styles.box, { backgroundColor: 'green' }]} />

        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 0,
      },
      box: {
        width: 70,
        height: 130,
      },

});
export default BoxContainer;