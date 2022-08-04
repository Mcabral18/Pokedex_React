import './App.css';
import React, { useEffect, useState } from 'react'
import PokemonThumb from './components/PokemonThumb'
function App() {

  const apiUrl = 'https://pokeapi.co/api/v2/pokemon?limit=24'

  // Set States
  const [allPokemons, setAllPokemons] = useState([])
  const [loadMore, setLoadMore] = useState(apiUrl)

  // Fetch Api 
  const getAllPokemons = async () => {

    const response = await fetch(loadMore)
    const data = await response.json()

    setLoadMore(data.next)

    function createPokemonObject(results) {
      results.forEach(async pokemon => {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data = await response.json()
        setAllPokemons(currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)

  }

  console.log(loadMore)

  // UseEffect to call api + and if any data change from its initial value

  useEffect(() => {
    getAllPokemons()
  }, [])

  return (
    <div className="app-contaner">
      <h1>Pokemon Evolution</h1>
      <div className="pokemon-container">
        <div className="all-container">
          {/* Map all pokemons and for each one create a detail component */}
          {allPokemons.map((pokemon, index) =>
            <PokemonThumb
              key={index}
              id={pokemon.id}
              image={pokemon.sprites.other.dream_world.front_default}
              name={pokemon.name}
              type={pokemon.types[0].type.name}
            />
          )}
        </div>
        <button className="load-more" onClick={() => getAllPokemons()}>Load more</button>
      </div>
    </div>
  );
}

export default App;
