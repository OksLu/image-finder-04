import propTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (value.trim() === '') {
      return alert('Ведіть дані для пошуку');
    }
    onSubmit(value);
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <input
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          className={css.searchInput}
          onChange={handleChange}
        />
        <button type="submit" className={css.searchBtn}>
          <span>Search</span>
        </button>
      </form>
    </header>
  );
};

Searchbar.prototype = {
  onSubmit: propTypes.func.isRequired,
};
