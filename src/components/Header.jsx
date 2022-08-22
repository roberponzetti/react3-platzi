import React, { useContext } from 'react'
import { useState } from 'react'
import ThemeContext from '../context/ThemeContext';

const Header = () => {

  const [darkMode, setDarkMode] = useState(false);
  const color = useContext(ThemeContext);

  const handleClick = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className='header'>
      <h1 style={{ color }} >ReactHooks</h1>
      <button onClick={handleClick} type='button'>
        {darkMode ? 'DarkMode' : 'LightMode'}
      </button>
      <button onClick={() => setDarkMode(!darkMode)} type='button'>
        {darkMode ? 'DarkMode2' : 'LightMode2'}
      </button>
    </div>
  )
}

export default Header