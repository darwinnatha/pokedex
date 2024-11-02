import { useThemeColors } from "@/hooks/useThemeColors";
import { useState } from "react";
import { Image, Modal, Pressable, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";

type Props = {
    value: "id" | "name";
    onChange: (sort: "id" | "name") => void;
}

export function SortButton({ value, onChange }: Props) {
    const colors = useThemeColors();
    const onButtonPress = () => {
        setModalVisibility(!modalVisible);
    }
    const [modalVisible, setModalVisibility] = useState(false);
    return (
        <>
            <Pressable onPress={onButtonPress}>
                <View style={[styles.button, { backgroundColor: colors.grayWhite }]}>
                    <Image source={value === 'id' ? require('@/assets/images/number.png') : require('@/assets/images/alpha.png')} width={16} height={16} />
                </View>
            </Pressable>
            <Modal transparent visible={modalVisible} onRequestClose={() => setModalVisibility(false)}>
            <ThemedText>Sort by</ThemedText>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    button: {
        width: 32,
        height: 32,
        borderRadius: 32,
        flex: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});