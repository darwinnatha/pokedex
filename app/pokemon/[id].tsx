import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function Pokemon() {
    const params = useLocalSearchParams()
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Open up app/pokemon/[id].tsx to start working on your pokemon profile!</Text>
        </View>
    );
}