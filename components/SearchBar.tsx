import { Image, StyleSheet, TextInput } from "react-native";
import { Row } from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

type Props = {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
    const colors = useThemeColors();
    return (
        <Row gap={8} style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}>
            <Image source={require('@/assets/images/search.png')} width={16} height={16} />
            <TextInput onChangeText={onChange} style={styles.input} value={value} placeholder="Search" />
        </Row>);
}

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        borderRadius: 16,
        height: 32,
        paddingHorizontal: 16,
    },
    input: {
        flex: 1,
        fontSize: 10,
        lineHeight: 16,
        height:16
    }
})