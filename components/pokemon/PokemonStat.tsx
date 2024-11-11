import { useThemeColors } from '@/hooks/useThemeColors';
import { useEffect } from 'react';
import { StyleSheet, View, type ViewProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Row } from '../Row';
import { ThemedText } from '../ThemedText';

type Props = ViewProps & {
    color: string,
    name: string,
    value: number,
}

export function PokemonStat({ style, name, value, color, ...rest }: Props) {
    const colors = useThemeColors();
    const sharedValue = useSharedValue(0);
    const barInnerStyle = useAnimatedStyle(() => {
        return {
            flex: sharedValue.value,
        }
    })
    const barBackgroundStyle = useAnimatedStyle(() => {
        return {
            flex: 255 - sharedValue.value,
        }
    })

    useEffect(() => {
        sharedValue.value = withSpring(value);
    }, [value])
    return (
        <Row gap={8} style={[style, styles.root]} {...rest}>
            <View style={[styles.name, { borderColor: colors.grayLight }]} >
                <ThemedText variant='subtitle3' style={{ color: color }} > {name} </ThemedText>
            </View>
            <View style={styles.number}>
                <ThemedText>{value.toString().padStart(3, '0')}</ThemedText>
            </View>
            <Row style={[styles.bar, { borderColor: color }]}>
                <Animated.View style={[styles.barInner, { backgroundColor: color }, barInnerStyle]} />
                <Animated.View style={[styles.background, { backgroundColor: color }, barBackgroundStyle]} />
            </Row>
        </Row>
    );
};

const styles = StyleSheet.create({
    root: {},
    name: {
        width: 40,
        paddingRight: 8,
        borderRightWidth: 1,
        borderStyle: 'solid',
    },
    number: {
        width: 23,
    },
    bar: {
        borderRadius: 20,
        height: 4,
        overflow: 'hidden',
        flex: 1,
    },
    barInner: {
        height: 4,
    },
    background: {
        height: 4,
        opacity: 0.24

    },
});