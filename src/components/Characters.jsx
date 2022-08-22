import React, { useState, useMemo } from 'react'
import { useCallback } from 'react';
import { useRef } from 'react';
import { useReducer } from 'react';
import useCharacters from '../hooks/useCharacters';
import Search from './Search';

const initialState = {
  favorites: []
}

const api = 'https://rickandmortyapi.com/api/character';

const favoriteReducer = (state, action) => {
  switch(action.type){
    case 'ADD_TO_FAVORITE':
      return{
        ...state,
        favorites: [...state.favorites, action.payload]
      }
    default:
      return state;
  }
}

const Characters = () => {

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);
  const [search, setSearch] = useState('');
  const searchInput = useRef(null);

  const characters = useCharacters(api);

  const handleClick = favorite => {
    dispatch({type: 'ADD_TO_FAVORITE', payload: favorite})
  }

  //funcion handldeSearch sin useCallback
  // const handleSearch = () => {
  //   setSearch(searchInput.current.value)
  // }

  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value)
  },[])

  //funcion de busqueda sin memo
  // const filteredUsers = characters.filter((user) => {
  //   return user.name.toLowerCase().includes(search.toLowerCase());
  // })

  const filteredUsers = useMemo(() =>
    characters.filter((user) => {
      return user.name.toLowerCase().includes(search.toLowerCase());
    }),
    [characters, search]
  )

  return (
    <div className='characters'>

      {favorites.favorites.map(favorite => (
        <li key={favorite.id}>
          {favorite.name}
        </li>
      ))}

      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

      {filteredUsers.map(character => (
        <div key={character.id}>
          <h2> {character.name} </h2>
          <img src={character.image} alt="character img" />
          <button type='button' onClick={() => handleClick(character)}>
            Agregar a favoritos
          </button>
        </div>
      ))}
    </div>
  )
}

export default Characters