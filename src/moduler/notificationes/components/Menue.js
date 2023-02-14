
import MenuIcon from './MenuIcon';
// import { Ionicons } from '@expo/vector-icons';
// import { FontAwesome } from '@expo/vector-icons';
import MenueItem from './MenueItem';
function Menu(props) {
    return (
        <>
            <MenuIcon />
            <>
            {props.children}
            </>
            {!props.children  &&
                <>
                    <MenueItem
                        title={"Delete"}
                        subtitle={"Delete this notification"}
                        icon={() => {
                            return <></>
                            // return <Ionicons name="trash-sharp"
                            //     size={27} color="#555" />
                        }}
                        onPress={() => {  }}
                    />

                    <MenueItem
                        title={"Turn off"}
                        subtitle={"Turn off all notification"}
                        icon={() => {
                            return <></>
                            // return <FontAwesome name="bell-slash-o" size={22} color="#555" />
                        }}
                        onPress={() => { }}
                    />

                    <MenueItem
                        title={"View settings"}
                        icon={() => {
                            return <></>
                            // return <Ionicons name="settings-sharp" size={27} color="#555" />
                        }}
                        onPress={() => { }}
                    /></>
            }
        </>
    );
}

export default Menu;