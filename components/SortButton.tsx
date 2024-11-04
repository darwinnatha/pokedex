import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { useRef, useState } from "react";
import { Dimensions, Image, Modal, Pressable, StyleSheet, View } from "react-native";
import { Card } from "./Card";
import { Radio } from "./Radio";
import { Row } from "./Row";
import { ThemedText } from "./ThemedText";


type Props = {
    value: "id" | "name";
    onChange: (sort: "id" | "name") => void;
}

export function SortButton({ value, onChange }: Props) {
    const buttonRef = useRef<View>(null);
    const colors = useThemeColors();
    const [modalVisible, setModalVisibility] = useState(false);
    const options = [
        { label: "Number", value: "id" },
        { label: "Name", value: "name" },
    ] as const;
    const [position, setPosition] = useState<null | { top: number, right: number }>(null);

    const onButtonPress = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setPosition({
                top: y + height,
                right: Dimensions.get("window").width - x - width
            });
            setModalVisibility(true);

        })
    }
    const onClose = () => {
        setModalVisibility(false);
    }

    return (
        <>
            <Pressable onPress={onButtonPress}>
                <View ref={buttonRef} style={[styles.button, { backgroundColor: colors.grayWhite }]}>
                    <Image
                        width={16}
                        height={16}
                        source={
                            value === 'id'
                                ? require('@/assets/images/number.png')
                                : require('@/assets/images/alpha.png')}
                    />
                </View>
            </Pressable>
            <Modal animationType="fade" transparent visible={modalVisible} onRequestClose={onClose}>
                <Pressable style={styles.backdrop} onPress={onClose}>
                    <View style={[styles.popup, { backgroundColor: colors.tint, ...position }]}>
                        <ThemedText variant="subtitle2" style={styles.title} color="grayWhite">Sort by:</ThemedText>
                        <Card style={styles.card}>
                            {options.map(option => (
                                <Pressable key={option.value} onPress={() => onChange(option.value)}>
                                    <Row gap={8}>
                                        <Radio checked={value === option.value} />
                                        <ThemedText>
                                            {option.label}
                                        </ThemedText>
                                    </Row>
                                </Pressable>
                            ))}
                        </Card>
                    </View>
                </Pressable>

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
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)'
    },
    popup: {
        paddingTop: 16,
        padding: 4,
        borderRadius: 12,
        gap: 16,
        position: 'absolute',
        ...Shadows.dp2,
        width: 120,
    },
    title: {
        paddingLeft: 20,
    },
    card: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        gap: 16,
    }
});