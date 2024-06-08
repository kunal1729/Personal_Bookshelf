import React from 'react';
import { useContext } from 'react';
import { BooksContext } from '../context/ContextAPI';

const SaveBtn = ({book}) => {
  
    const {saveBook, allSavedBooks, unsaveBook} = useContext(BooksContext);
  
    const handleClick = (e) => {
      e.preventDefault();
      if(allSavedBooks.includes(book.cover_edition_key))
      {
        unsaveBook(book.cover_edition_key);
      }
      else
      {
        saveBook(book.cover_edition_key);
      }
    };
    
  
    return(
        <button onClick={handleClick} className={`rounded-lg p-2 m-auto ${allSavedBooks.includes(book.cover_edition_key) ? "bg-green-500" : "bg-blue-500"} text-white `}>{allSavedBooks.includes(book.cover_edition_key) ? "Added !" : "Add to Shelf !"}</button>       
    )
}

const BooksSection = () => {

    const {searchData} = useContext(BooksContext);
    
    return (
        <div className='w-[80%] md:space-y-0 mx-auto mt-10 p-8 min-h-screen rounded-lg border-2 border-black grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2'>
        {
            searchData && searchData.length > 0 ?
            searchData.map((book) => {
                return(
                <div className='shadow-lg text-lg space-y-2 p-4 bg-[#b2dfdb] rounded-lg h-full'>
                    <h1>Name : <span className='font-bold'>{book.title}</span></h1>
                    <h1>Author : <span className='font-bold'>{book.author_name}</span></h1>
                    <h1>Edition count : <span className='font-bold'>{book.edition_count}</span></h1>
                    <h1>First Publish Year : <span className='font-bold'>{book.first_publish_year}</span></h1>
                    <h1>Total Pages : <span className='font-bold'>{book.number_of_pages_median}</span></h1>
                    <div className='flex space-x-1 items-center'>
                        <h1>Ratings : </h1> 
                        <span className='font-bold'>{book.ratings_average}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    </div>  
                    <div className='text-center'>
                    <SaveBtn book={book}  />
                    </div>                 
                </div>
                )
            }) 
            : 
            null
        } 
        </div>
    )
}

export default BooksSection;
