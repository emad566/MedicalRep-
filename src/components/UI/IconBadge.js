import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Badge } from 'react-native-paper';
import { Appbar } from 'react-native-paper';

function IconBadge({ value, icon , onPress }) {
    return (
        <TouchableOpacity  onPress={onPress} style={styles.screen}>
            <Badge
                visible={true}
                size={17}
                style={styles.badge}
            >
                {value}
            </Badge>
            <Appbar.Action
                icon={icon}
                accessibilityLabel="TagChat"
                onPress={onPress}
            // {...commonProps}
            />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    screen: {
        flexDirection: "row",
        marginRight: 10,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center"
    },
    badge: { 
        position: 'absolute', 
        top: 5, 
        right: 5, 
        color: "red", 
        backgroundColor: "#fff" 
    },
})

export default IconBadge;