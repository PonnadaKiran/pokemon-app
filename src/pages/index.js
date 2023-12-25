// import { useState } from "react";
// import { useGlobalContext } from "@/context/global";
// import Router from "next/router";

// export default function Home() {
//   const {
//     allPokemonData,
//     searchResults,
//     next,
//     getPokemon,
//     loading,
//     realTimeSearch,
//   } = useGlobalContext();

//   const [search, setSearch] = useState("");


//   const handleChange = (e) => {
//     setSearch(e.target.value);

//     realTimeSearch(search);
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     realTimeSearch(search);
//   };

//   const displaySearchResults = () => {
//     return searchResults.map((pokemon) => {
//       return (
//         <div
//           key={pokemon.id}
//           onClick={() => {
//             Router.push(`/pokemon/${pokemon.name}`);
//           }}
//           className="pokemon-name"
//         >
//           {pokemon.name}
//         </div>
//       );
//     });
//   };

//   return (
//     <main>
//       <form action="" className="search-form" onSubmit={handleSearch}>
//         <div className="input-control">
//           <input
//             type="text"
//             value={search}
//             onChange={handleChange}
//             placeholder="Search for a Pokemon..."
//           />
//           <button className="submit-btn" type="submit">
//             Search
//           </button>
//         </div>
//       </form>

//       {search && searchResults.length > 0 && (
//         <div className="search-results">{displaySearchResults()}</div>
//       )}

//       <div className="all-pokemon">
//         {allPokemonData ? (
//           allPokemonData.map((pokemon) => {
//             return (
//               <div
//                 key={pokemon.id}
//                 className="card"
//                 onClick={() => {
//                   Router.push(`/pokemon/${pokemon.name}`);
//                 }}
//               >
//                 <div className="card-image">
//                   <img
//                     src={pokemon.sprites.other.home.front_shiny}
//                     alt={pokemon.name}
//                   />
//                 </div>
//                 <div className="card-body">
//                   <h3>{pokemon.name}</h3>
//                   <p>More Details &nbsp; &rarr;</p>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <h1>Loading...</h1>
//         )}
//       </div>

//       <div className="next">
//         {allPokemonData.length > 0 && (
//           <button className="next-btn" onClick={next}>
//             Load More &darr;
//           </button>
//         )}
//       </div>
//     </main>
//   );
// }





import { useState, useEffect } from "react";
import { useGlobalContext } from "@/context/global";
import Router from "next/router";

export default function Home() {
  const {
    allPokemonData,
    searchResults,
    next,
    loading,
    realTimeSearch,
    pokemonItem
  } = useGlobalContext();

  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // Pokemon types list for the dropdown
  const pokemonTypes = [
    "normal", "fire", "water", "grass", "electric", "ice", "fighting", 
    "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", 
    "dark", "dragon", "steel", "fairy"
  ];

  const handleChange = (e) => {
    setSearch(e.target.value);
    realTimeSearch(e.target.value); // Invoke search with the current input value
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  const displaySearchResults = () => {
    return searchResults.map((pokemon) => (
      <div
        key={pokemon.id}
        onClick={() => Router.push(`/pokemon/${pokemon.name}`)}
        className="pokemon-name"
      >
        {pokemon.name}
      </div>
    ));
  };

  // Filter the allPokemonData by type if a type is selected
  const filteredPokemonData = typeFilter
    ? allPokemonData.filter(pokemon => 
        pokemon.types.some(type => type.type.name === typeFilter))
    : allPokemonData;

  return (
    <main>
      <div className="input-group">
        <form className="search-form" onSubmit={handleSearch}>
          <div className="input-control">
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search for a Pokemon..."
            />
            <button className="submit-btn" type="submit">
              Search
            </button>
          </div>
          <select className="type-filter-dropdown" value={typeFilter} onChange={handleTypeChange}>
            <option value="">All Types</option>
            {pokemonTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </form>
        
      </div>

      {search && searchResults.length > 0 && (
        <div className="search-results">{displaySearchResults()}</div>
      )}

      <div className="all-pokemon">
        {loading ? (
          <h1>Loading...</h1>
        ) : (
          filteredPokemonData.map((pokemon) => (
            <div
              key={pokemon.id}
              className="card"
              onClick={() => Router.push(`/pokemon/${pokemon.name}`)}
            >
            
              <div className="card-image">
                <img
                  src={pokemon.sprites.other.home.front_shiny}
                  alt={pokemon.name}
                />
              </div>
              <div className="card-body">
                <h3>{pokemon.id}. {pokemon.name}</h3>
                <div className="pokemon-types">
                  {pokemon.types.map((typeInfo) => (
                    <span key={typeInfo.type.name} className={`type ${typeInfo.type.name}`}>
                      {typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}
                    </span>
                  ))}
                </div>
                <p>More Details &nbsp; &rarr;</p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="next">
        {allPokemonData.length > 0 && (
          <button className="next-btn" onClick={next}>
            Load More &darr;
          </button>
        )}
      </div>
    </main>
  );
}
