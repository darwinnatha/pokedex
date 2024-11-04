import { Colors } from "@/constants/Color";
import { View, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
    name: keyof typeof Colors['type'];
}
export function PokemonType({ name }: Props) {
    return (
        <View style={[rootStyle, { backgroundColor: Colors.type[name] }]}>
            <ThemedText variant="subtitle3" color="grayWhite" style={{ textTransform: 'capitalize' }}>
                {name}
            </ThemedText>
        </View>
    )
}

const rootStyle = {
    flex: 0,
    paddingHorizontal: 8,
    borderRadius: 8,
    height: 20
} satisfies ViewStyle;