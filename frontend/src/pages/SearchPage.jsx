import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BookCard from "../components/Book/BookCard";
import fetchBooksByCategory from "../features/book/actions/fetchBooksByCategory";
import fetchSearchBooks from "../features/book/actions/fetchSearchBooks";

export default function Search() {

    const { search, category } = useParams();
    const dispatch = useDispatch();

    const { booksByCategory, loadingBooksByCategory, errorBooksByCategory } = useSelector((state)=>state.books)
    const { searchBooks, loadingSearchBooks, errorSearchBooks } =  useSelector((state)=>state.books)

    useEffect(() => {
        if (category) dispatch(fetchBooksByCategory({category}));
        if (search) dispatch(fetchSearchBooks({search}));
    }, [dispatch, category, search]);

    const loading = loadingSearchBooks || loadingBooksByCategory;
    const errorMessage = errorBooksByCategory || errorSearchBooks;

    return (
        <div className="container mx-auto px-4 py-10">
            {errorMessage && (
                <div className="alert alert-warning bg-red-500 text-white p-4 rounded-lg mb-4">
                    <span>{errorMessage}</span>
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center mb-4">
                    <div className="w-16 h-16 border-4 border-gray-600 border-solid rounded-full animate-spin"></div>
                </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {searchBooks.length > 0 ? (
                    searchBooks.map((book) => <BookCard key={book.id} book={book} />)
                ) : (
                    !loading && <p className="text-center col-span-full">Aucun livre trouvé.</p>
                )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {booksByCategory.length > 0 &&
                    booksByCategory.map((book) => <BookCard key={book.id} book={book} />)}
            </div>
              
        </div>
    );
}
