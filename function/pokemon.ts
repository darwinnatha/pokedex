export function getPokemonId(url: string): number {
    return parseInt(url.split("/").at(-2)! ?? "");
}

export function getPokemonArtWork(id: number | string): string {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

export function formatWeight(weight?: number): string {
    if (!weight) return "--";
    return (weight / 10).toString().replace('.', ',') + 'kg';
}

export function formatSize(size?: number): string {
    if (!size) return "--";
    return (size / 10).toString().replace('.', ',') + 'm';
}

export function statShortName(name: string): string {
    return name.replaceAll('special', 'S')
        .replaceAll('-', '')
        .replaceAll('attack', 'ATK')
        .replaceAll('defense', 'DEF')
        .replaceAll('speed', 'SPD')
        .replaceAll('accuracy', 'ACC')
        .replaceAll('evasion', 'EVA')
        .replaceAll('hp', 'HP')
        .replaceAll('special-attack', 'SA')
        .replaceAll('special-defense', 'SD')
        .replaceAll('special-evasion', 'SE')
        .replaceAll('special-attack-upper', 'SA')
        .replaceAll('special-defense-upper', 'SD')
        .replaceAll('special-evasion-upper', 'SE')
        .replaceAll('critical-hit', 'CRITICAL HIT')
        .replaceAll('critical-hit-power', 'CRITICAL HIT POWER')
        .replaceAll('total', 'TOTAL')
        .replaceAll('base', 'BASE')
        .toUpperCase();
}

export const basePokemonsStats = [
    {
        "base_stat": 1,
        "stat": {
            "name": "hp",
            "url": "https://pokeapi.co/api/v2/stat/1/"
        }
    },
    {
        "base_stat": 1,
        "stat": {
            "name": "attack",
            "url": "https://pokeapi.co/api/v2/stat/2/"
        }
    },
    {
        "base_stat": 1,
        "stat": {
            "name": "defense",
            "url": "https://pokeapi.co/api/v2/stat/3/"
        }
    },
    {
        "base_stat": 1,
        "stat": {
            "name": "special-attack",
            "url": "https://pokeapi.co/api/v2/stat/4/"
        }
    },
    {
        "base_stat": 1,
        "stat": {
            "name": "special-defense",
            "url": "https://pokeapi.co/api/v2/stat/5/"
        }
    },
    {
        "base_stat": 1,
        "stat": {
            "name": "speed",
            "url": "https://pokeapi.co/api/v2/stat/6/"
        }
    }
];