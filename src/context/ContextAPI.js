// import { useLayoutEffect } from "react";
import { createContext, useState, useLayoutEffect} from "react";

// create context object
export const BooksContext = createContext({});

// create provider object
export const BooksProvider = ({children}) => {
    const [searchData, setSearchData] = useState([]);
    const [savedData, setSavedData] = useState([]);
    const [allSavedBooks, setSavedBooks] = useState([]);

    const getSearchData = async (query) => {
        try {
            const data = await fetch(
                `https://openlibrary.org/search.json?q=${query}&limit=10&page=1`
            ).then(res => res.json()).then(json => json) ;
            setSearchData(data.docs); 
        } 
        catch (error) {
            console.log(error);
        }
    }
    const getSavedData = async () => {
        try {
            const fetchPromises = allSavedBooks.map(book =>
                fetch(`https://openlibrary.org/search.json?q=${book}&limit=1&page=1`).then(res => res.json())
            );
            const data = await Promise.all(fetchPromises);
            setSavedData(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    const saveBook = (bookId) =>
    {
        let oldBooks = JSON.parse(localStorage.getItem("books"));
        if(oldBooks.includes(bookId))
        {
            return;
        }
        else
        {
            let newBooks = [...oldBooks, bookId];
            setSavedBooks(newBooks);
            localStorage.setItem("books", JSON.stringify(newBooks));
        }
    }
    
    const unsaveBook = (bookId) =>
    {
        let oldBooks = [];
        try {
            const storedBooks = localStorage.getItem("books");
            if (storedBooks) {
                oldBooks = JSON.parse(storedBooks);
            }
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            // If there's an error, clear the localStorage to avoid future errors
            localStorage.removeItem("books");
        }
        if(oldBooks.includes(bookId))
        {
            const remainingBooks = oldBooks.filter((id) =>  
            id !== bookId)
            setSavedBooks(remainingBooks);
            localStorage.setItem("books", JSON.stringify(remainingBooks));
        }
        else
        {
            return;
        }
    }

    useLayoutEffect(() => {
        try {
            let storedBooks = localStorage.getItem("books");
            if (!storedBooks) {
                localStorage.setItem("books", JSON.stringify([]));
                setSavedBooks([]);
            } else {
                let totalBooks = JSON.parse(storedBooks);
                setSavedBooks(totalBooks);
            }
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            localStorage.setItem("books", JSON.stringify([]));
            setSavedBooks([]);
        }

    }, [])
    useLayoutEffect(() => {
        if(allSavedBooks.length > 0)
        {
            getSavedData();
        }
        else
        {
            setSavedData([]);
        }
    }, [allSavedBooks, getSavedData()])

    return(
        <BooksContext.Provider value={{searchData , getSearchData, saveBook, unsaveBook,allSavedBooks, savedData , setSavedData}}>
            {children}
        </BooksContext.Provider>
    )
};
