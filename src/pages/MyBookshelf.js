import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BooksContext } from '../context/ContextAPI';
import { useContext } from 'react';

const SaveBtn = ({book}) => {
  
    const {saveBook, allSavedBooks, unsaveBook} = useContext(BooksContext);
  
    const handleClick = (e) => {
      e.preventDefault();
      if(allSavedBooks.includes(book.docs[0].cover_edition_key))
      {
        unsaveBook(book.docs[0].cover_edition_key);
      }
      else
      {
        saveBook(book.docs[0].cover_edition_key);
      }
    };
    
  
    return(
        <button onClick={handleClick} className={`rounded-lg p-2 m-auto ${allSavedBooks.includes(book.docs[0].cover_edition_key) ? "bg-green-500" : "bg-blue-500"} text-white `}>{allSavedBooks.includes(book.docs[0].cover_edition_key) ? "Added !" : "Add to Shelf !"}</button>       
    )
}
const MyBookshelf = () => {

  const nav = useNavigate();
  const {savedData} = useContext(BooksContext);

  const handleBack = () =>
  {
    nav('..');
  }
  if (!savedData) {
    return null; 
  }

  return (
    <div className='mt-10 p-4'>
      <div className='flex flex-col'>
        <button onClick={handleBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-arrow-left"><circle cx="12" cy="12" r="10"/><path d="M16 12H8"/><path d="m12 8-4 4 4 4"/></svg>
        </button>
        <span>Go Back</span>
      </div>
      <h1 className='text-center mt-5 text-3xl underline font-bold uppercase'>My Books</h1>
      <div className='w-[80%] md:space-y-0 mx-auto mt-10 p-8 min-h-screen rounded-lg border-2 border-black grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2'>
        {
            savedData.map((book) => {
                return(
                <div className='shadow-lg text-lg space-y-2 p-4 bg-[#b2dfdb] rounded-lg h-full '>
                    <h1>Name : <span className='font-bold'>{book.docs[0].title}</span></h1>
                    <h1>Author : <span className='font-bold'>{book.docs[0].author_name}</span></h1>
                    <h1>Edition count : <span className='font-bold'>{book.docs[0].edition_count}</span></h1>
                    <h1>First Publish Year : <span className='font-bold'>{book.docs[0].first_publish_year}</span></h1>
                    <h1>Total Pages : <span className='font-bold'>{book.docs[0].number_of_pages_median}</span></h1>
                    <div className='flex space-x-1 items-center'>
                        <h1>Ratings : </h1> 
                        <span className='font-bold'>{book.docs[0].ratings_average}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </div>  
                    <div className='text-center'>
                    <SaveBtn book={book}  />
                    </div>                 
                </div>
                )
            }) 
        } 
        </div>
    </div>
  )
}

export default MyBookshelf
