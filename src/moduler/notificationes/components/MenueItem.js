
import { TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

function MenueItem({title , subtitle , icon , onPress}) {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
        >
            <Card.Title
                style={styles.cardTitle}
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subTitleStyle}
                id={"props.id"}
                title={title}
                subtitle={subtitle}
                left={icon}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    cardTitle: {
        padding: -10,
        marginLeft: -20
    },
    titleStyle: {
        fontSize: 14,
        color: "#555",
        marginLeft: -20,
    },
    subTitleStyle: {
        marginLeft: -20,
        marginTop: -8,
        color: "#555"
    },
})
export default MenueItem;