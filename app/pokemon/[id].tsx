import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { PokemonSpec } from "@/components/PokemonSpec";
import { PokemonType } from "@/components/PokemonType";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Color";
import { formatSize, formatWeight, getPokemonArtWork } from "@/function/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { router, useLocalSearchParams } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function Pokemon() {
    const colors = useThemeColors();
    const params = useLocalSearchParams() as { id: string };
    const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: params.id });
    const mainType = pokemon?.types?.[0]?.type.name;
    const types = pokemon?.types ?? [];
    const colorType = mainType ? Colors.type[mainType] : colors.tint;
    return (
        <RootView style={{ backgroundColor: colorType }}>
            <View>
                <Image
                    style={styles.image}
                    source={require('@/assets/images/pokeball_big.png')} width={208} height={208} />
                <Row style={styles.header}>
                    <Pressable onPress={router.back}>
                        <Row gap={8}>
                            <Image
                                source={require('@/assets/images/back.png')}
                                width={32}
                                height={32} />
                            <ThemedText variant="headline" style={{ textTransform: 'capitalize' }} color="grayWhite" >{pokemon?.name}</ThemedText>
                        </Row>
                    </Pressable>
                    <ThemedText variant="subtitle2" color="grayWhite" >#{params.id.padStart(3, '0')}</ThemedText>
                </Row>
                <View style={styles.body}>
                    <Image
                        style={styles.artWork}
                        source={{ uri: getPokemonArtWork(params.id) }}
                        width={200}
                        height={200}
                    />
                    <Card style={styles.card}>
                        <Row gap={16}>
                            {types.map(type => (<PokemonType name={type.type.name} key={type.type.name} />))}
                        </Row>
                        <ThemedText variant="subtitle1" style={{ color: colorType }} >About</ThemedText>
                        <Row>
                            <PokemonSpec title={formatWeight(pokemon?.weight)} description="Weight" image={require('@/assets/images/weight.png')} />
                            <PokemonSpec title={formatSize(pokemon?.height)} description="Height" image={require('@/assets/images/height.png')} />
                            <PokemonSpec
                                description="Moves"
                                title={pokemon?.moves
                                    .slice(0, 2)
                                    .map(p => p.move.name)
                                    .join('\n')}
                                image={require('@/assets/images/height.png')} />

                        </Row>
                        <ThemedText variant="subtitle1" style={{ color: colorType }} >Base stats</ThemedText>
                        <Text>Open up app/pokemon/[id].tsx to start working on your pokemon profile!</Text>
                    </Card>
                </View>
            </View>
        </RootView>
    );
}

const styles = StyleSheet.create({
    header: {
        margin: 20,
        justifyContent: 'space-between'
    },
    image: {
        opacity: 0.1,
        position: 'absolute',
        top: 8,
        right: 8,
    },
    artWork: {
        alignSelf: 'center',
        position: 'absolute',
        top: -140,
        zIndex: 2

    },
    body: {
        marginTop: 144,
    },
    card: {
        paddingHorizontal: 20,
        paddingTop: 60,
        gap: 16,
        alignItems: 'center',
    }

});