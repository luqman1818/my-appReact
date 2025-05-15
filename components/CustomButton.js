import { TouchableOpacity,Text,StyleSheet, Button } from 'react-native';

const CustomButton = () => {
    return (
        <TouchableOpacity
        style={styles.boutton}
        
        >
            <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
        
    );
}
const styles = StyleSheet.create({
    boutton:{
        backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
});
export default CustomButton;