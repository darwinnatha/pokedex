import { Card } from "@/components/Card";
import { PokemonStat } from "@/components/pokemon/PokemonStat";
import { PokemonSpec } from "@/components/PokemonSpec";
import { PokemonType } from "@/components/PokemonType";
import { RootView } from "@/components/RootView";
import { Row } from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Color";
import { basePokemonsStats, formatSize, formatWeight, getPokemonArtWork, statShortName } from "@/function/pokemon";
import { useFetchQuery } from "@/hooks/useFetchQuery";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Audio } from "expo-av";
import { router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";


export default function Pokemon() {
    const params = useLocalSearchParams() as { id: string };
    const [id, setId] = useState(parseInt(params.id, 10));
    const offset = useRef(1);
    const pager = useRef<PagerView>(null);

    const onPageSelected = (e: { nativeEvent: { position: number } }) => {
        offset.current = e.nativeEvent.position - 1
    }

    const onPageScrollStateChanged = (e: { nativeEvent: { pageScrollState: string } }) => {
        if (e.nativeEvent.pageScrollState !== 'idle') return;
        if (offset.current === -1 && id === 2) return;
        if (offset.current === 1 && id === 10277) return;
        if (offset.current !== 0) {
            setId(id + offset.current)
            offset.current = 0
            pager.current?.setPageWithoutAnimation(1)
        }
    }

    const onPrevious = () => {
            pager.current?.setPage(0 )
    }
    const onNext = () => {
            pager.current?.setPage(2 + offset.current)
    }

    return (
        <PagerView
            ref={pager}
            onPageSelected={onPageSelected}
            onPageScrollStateChanged={onPageScrollStateChanged}
            initialPage={1} style={{ flex: 1, }}>
            <PokemonView key={id - 1} id={id - 1} onPrevious={onPrevious} onNext={onNext} />
            <PokemonView key={id} id={id} onPrevious={onPrevious} onNext={onNext} />
            <PokemonView key={id + 1} id={id + 1} onPrevious={onPrevious} onNext={onNext} />
        </PagerView>)


    // return 
}

type Props = {
    id: number;
    onPrevious: () => void;
    onNext: () => void;
}

function PokemonView({ id, onPrevious, onNext }: Props) {
    //Base params
    const colors = useThemeColors();
    //Fetch data
    const { data: pokemon } = useFetchQuery("/pokemon/[id]", { id: id });
    const { data: species } = useFetchQuery("/pokemon-species/[id]", { id: id });
    //Vars
    const mainType = pokemon?.types?.[0]?.type.name;
    const types = pokemon?.types ?? [];
    const colorType = mainType ? Colors.type[mainType] : colors.tint;
    const bio = species?.flavor_text_entries
        ?.find(flavor => flavor.language.name === 'en')
        ?.flavor_text.replaceAll('\n', '. ');
    const stats = pokemon?.stats ?? basePokemonsStats;

    //funcs
    const onImagePress = async () => {
        const cry = pokemon?.cries.latest
        if (!cry) return;

        const { sound } = await Audio.Sound.createAsync({
            uri: cry,
        }, {
            shouldPlay: true,
        })
        sound.playAsync();
    }

    /* const onPrevious = () => {
        router.replace({ pathname: "/pokemon/[id]", params: { id: (Math.max(id - 1, 1)) } });
    }

    const onNext = () => {
        router.replace({ pathname: "/pokemon/[id]", params: { id: (Math.min(id + 1, 10277)) } });
    } */


    return (
        <RootView backgroundColor={colorType}>
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
                    <ThemedText variant="subtitle2" color="grayWhite" >#{id.toString().padStart(3, '0')}</ThemedText>
                </Row>
                <Card style={[styles.card, { overflow: 'visible' }]}>
                    <Row style={[styles.imageRow]}>
                        {id === 1 ? <View style={{ width: 24, height: 24 }} /> : (<Pressable onPress={() => onPrevious()}>
                            <Image
                                source={require('@/assets/images/previous.png')}
                                width={32}
                                height={32} />
                        </Pressable>)}
                        <Pressable onPress={() => onImagePress()}>
                            <Image
                                source={{ uri: getPokemonArtWork(id) }}
                                width={200}
                                height={200}
                            />
                        </Pressable>
                        {id === 10277 ? <View style={{ width: 24, height: 24 }} /> : (<Pressable onPress={() => onNext()}>
                            <Image
                                source={require('@/assets/images/next.png')}
                                width={32}
                                height={32} />
                        </Pressable>)}
                    </Row>
                    <Row gap={16}>
                        {types.map(type => (<PokemonType name={type.type.name} key={type.type.name} />))}
                    </Row>
                    <ThemedText variant="subtitle1" style={{ color: colorType }} >About</ThemedText>
                    <Row>
                        <PokemonSpec
                            style={{ borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight }}
                            title={formatWeight(pokemon?.weight)}
                            description="Weight" image={require('@/assets/images/weight.png')} />
                        <PokemonSpec
                            style={{ borderStyle: 'solid', borderRightWidth: 1, borderColor: colors.grayLight }}
                            title={formatSize(pokemon?.height)}
                            description="Height"
                            image={require('@/assets/images/height.png')} />
                        <PokemonSpec
                            description="Moves"
                            title={pokemon?.moves
                                .slice(0, 2)
                                .map(p => p.move.name)
                                .join('\n')}
                            image={require('@/assets/images/height.png')} />

                    </Row>
                    <ThemedText >{bio}</ThemedText>
                    <ThemedText variant="subtitle1" style={{ color: colorType }} >Base stats</ThemedText>

                    <View style={{ alignSelf: 'stretch' }}>
                        {stats.map(stat => (
                            <PokemonStat name={statShortName(stat.stat.name)} value={stat.base_stat} color={colorType} key={stat.stat.name} />
                        ))}
                    </View>

                    {/* <Text>Open up app/pokemon/[id].tsx to start working on your pokemon profile!</Text> */}
                </Card>
            </View>
        </RootView >
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
    },
    card: {
        marginTop: 144,
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 60,
        gap: 16,
        alignItems: 'center',
    },
    imageRow: {
        position: "absolute",
        top: -140,
        zIndex: 2,
        justifyContent: 'space-between',
        left: 0,
        right: 0,
        paddingHorizontal: 20,
    }

});