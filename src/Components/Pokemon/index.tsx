/* eslint-disable @next/next/no-img-element */
import React from 'react'
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(r => r.json())

type PokemonLink = {
    name: string,
    url: string,
}

type PokemonList = {
    count: number,
    next: string,
    previous: string,
    results: PokemonLink[]
}

type PokemonItem = {
    base_experience: string,
    height: number,
    id: string,
    is_default: false,
    name: string,
    order: number,
    species: {
        name: string,
        url: string,
    },
    sprites: {
        back_default: string,
        back_shiny: string,
        front_default: string,
        front_shiny: string,
    },
    weight: number
}

const Pokemon = () => {
  const [filter, setFilter] = React.useState('')
  const [selected, setSelected] = React.useState('')
  const [displayShiny, setShiny] = React.useState(false)
  const { data: pokemon } = useSWR<PokemonList>('https://pokeapi.co/api/v2/pokemon?limit=25', fetcher)
  const pokemons = (pokemon?.results || []);
  const { url: urlForSelectedPokemon } = pokemons.find(link => link.name === selected) || {}
  const { data } = useSWR<PokemonItem>(urlForSelectedPokemon || null, fetcher)

  if (!pokemon) {
    return  <div>loading pokemon</div>
 }

  return (
    <div>
        <h1>Pokemon</h1>

        <label htmlFor="search">Search</label>
        <input
            id="search"
            placeholder="search"
            value={filter}
            onChange={(event) => {
                setFilter(event.target.value)
            }}
        />

        <select value={selected} onChange={(event) => {
            setSelected(event.target.value)
            setShiny(false)
        }}>
            <option disabled>Select a pokemon</option>
            {
                pokemons
                    .filter(link => !filter || link.name.includes(filter))
                    .map(link => (
                        <option disabled={link.name === selected} key={link.name} value={link.name}>
                            {link.name}
                        </option>
                    ))
            }
        </select>

        <button onClick={() => {
            setSelected('')
            setShiny(false)            
        }}>
            clear selected
        </button>

        {!data && selected && <div>loading pokemon</div>}
        {data && (
            <section>
                <h2>{data.name}</h2>
                <img
                    alt={displayShiny ? 'Shiny ' + data.name : data.name}
                    src={displayShiny ? data.sprites.front_shiny : data.sprites.front_default}
                />
                <button onClick={() => setShiny(!displayShiny)}>
                    {displayShiny ? 'Display Default' : 'Show Shiny'}
                </button>
            </section>
        )}
    </div>
    )
}

export default Pokemon
