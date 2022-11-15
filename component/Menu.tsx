import { useNavigation } from "@react-navigation/native";
import {TouchableOpacity, View, Text, StyleSheet} from "react-native";


// am using here useNavigation Hook for useNavigation is a hook which gives access to navigation object. It's useful when you cannot pass the navigation prop into the component directly, or don't want to pass it in case of a deeply nested child.

//useNavigation() returns the navigation prop of the screen it's inside.

const Menu = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity
            
            onPress={() => navigation.navigate("Maps")} >
                <Text >Maps</Text>

            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    menuContainer: {
       flexDirection: "row",
       justifyContent:"space-evenly"
    },
    touchOpacityStyle: {
        backgroundColor: '#FF9899',
        borderWidth: 1,
        alignItems: 'center',
        alignSelf: "center",
        justifyContent: 'center',
        position: 'absolute',
        bottom: 10,
        borderRadius: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginRight: 20,
        left: '20%',
        // right: 0,
      }

});

export default Menu;
