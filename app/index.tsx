import { Card } from "@/components/Card";

import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { ThemedText } from "@/components/ThemedText";
import { getPokemonId } from "@/function/pokemon";
import { useFetchQuery, useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { ActivityIndicator, FlatList, Image, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColors } from "../hooks/useThemeColors";
import { SearchBar } from "@/components/SearchBar";
import { useState } from "react";
import { Row } from "@/components/Row";
import { SortButton } from "@/components/SortButton";

export default function Index() {
    const colors = useThemeColors();
    const { data, isFetching, fetchNextPage } = useInfiniteFetchQuery("/pokemon?limit=21");
    const [sortKey, setSortKey] = useState<"id"|"name">("id");
    const pokemons = data?.pages?.flatMap(page => page.results.map(p => ({...p, id: getPokemonId(p.url)}))) ?? [];
    const [search, setSearch] = useState(""); 
    const filteredPokemons = [...(search ? pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || getPokemonId(p.url).toString() === search) : pokemons)].sort((a, b) => a[sortKey] < b[sortKey] ? -1 : 1);

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
            <Row gap={16} style={styles.header}>
                <Image source={require('@/assets/images/pokeball.png')} width={24} height={24} />
                <ThemedText variant="headline" color="grayLight">Pokedex</ThemedText>
            </Row>
            <View>
                <Row style={styles.search}>
                    <SearchBar value={search} onChange={setSearch} />
                    <SortButton value={sortKey} onChange={setSortKey} />
                </Row>
            </View>
            <Card style={styles.body}>
                <FlatList
                    data={filteredPokemons}
                    contentContainerStyle={[styles.gridGap, styles.list]}
                    columnWrapperStyle={styles.gridGap}
                    renderItem={({ item }) => <PokemonCard id={item.id} name={item.name} style={{ flex: 1 / 3 }} />}
                    keyExtractor={(item) => item.id.toString()}
                    ListFooterComponent={
                        isFetching ? <ActivityIndicator color={colors.tint} /> : null
                    }
                    onEndReached={search ? undefined : () => fetchNextPage()}
                    showsVerticalScrollIndicator={false}
                    numColumns={3} />
            </Card>
        </SafeAreaView>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 4
    },
    header: {
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    body: {
        flex: 1,
        marginTop: 16,
    },
    gridGap: {
        gap: 8,
    },
    list: {
        padding: 12,
    },
    search: {
        gap: 16,
    },
    form: {
        paddingHorizontal: 12,
    }
});