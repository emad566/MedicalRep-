
import { StyleSheet, View } from 'react-native';
import Colors from '../../../constants/Colors';

function MenuIcon() {
    return ( 
        <View style={styles.menuButtonContainer}>
        <View style={styles.menuButton}></View>
        </View>

    );
}


const styles = StyleSheet.create({
    menuButtonContainer:{
        flexDirection:"row",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center"
    },
    
    menuButton:{
        textAlign:"center",
        borderWidth:3,
        width:55,
        borderRadius:50 ,
        borderColor:Colors.primary,
        // borderColor:"#555",
    },

})

export default MenuIcon;