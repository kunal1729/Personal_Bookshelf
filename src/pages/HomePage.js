import React from 'react';
import { BooksProvider } from '../context/ContextAPI';
import { NavLink, Outlet } from 'react-router-dom';


const HomePage = () => {

  return (
    <BooksProvider>
      <div className=' relative p-4 bg-[#eeeeee] min-h-svh '>
        <header>
          <h1 className='font-bold uppercase w-full items-center text-3xl text-center '>Personal BookShelf</h1>
        </header>
        <NavLink to={'/mybookshelf'}>
          <button className= 'absolute p-2  rounded-lg bg-blue-700 text-white top-20 right-10'>My Bookshelf</button>
        </NavLink>
        <Outlet />
      </div>
    </BooksProvider>
  )
}

export default HomePage;
