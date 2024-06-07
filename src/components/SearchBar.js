import React from 'react'
import { useState } from 'react';
import { BooksContext } from '../context/ContextAPI';
import { useContext } from 'react';
import debounce from 'lodash.debounce';

const SearchInput = ({handleSearch}) => {
  const [search, setSearch] = useState("");
  
  const handleInput = (e) =>
  {
    e.preventDefault();
    let query = e.target.value;
    setSearch(query);
    handleSearch(query);
  }  
  return (
    <div className=' mt-32'>
      <div className='space-y-3'>
        <h1 className=' text-center uppercase text-2xl font-bold'>Find a book :</h1>
        <form  className=' w-[50%] relative items-center text-center flex mx-auto '>
            <input value={search} onChange={handleInput} className=' focus:border-black border-2 w-full rounded-lg' placeholder='Search books...' type="text" />
            <button type='submit' >
                <svg className=' text-black absolute bottom-2 hide right-2 w-6 h-6' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
                    <path stroke-linecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </button>
        </form>
      </div>

    </div>
  )
}
const SearchBar = () => {
    let {getSearchData} = useContext(BooksContext); 
  
    const debounceFunc = debounce(function(val) {
      getSearchData(val);
    }, 1000);
    return(
      <>
        <SearchInput handleSearch = {debounceFunc} />
      </>
    )  
  }

export default SearchBar;
