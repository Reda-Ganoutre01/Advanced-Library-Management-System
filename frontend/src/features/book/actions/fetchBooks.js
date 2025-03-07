import { createAsyncThunk } from "@reduxjs/toolkit";
import bookService from "../../../services/bookService";


const fetchBooks = createAsyncThunk('book/fetchBooks', async (payload , {rejectWithValue}) => {
    try
    {
        const response = await bookService.getAllBooks(payload.page , payload.size , payload.sortBy);
        return response.data;
    }
    catch (error)
    {
        rejectWithValue(error.response?.data || error.message);
    }
})

export default fetchBooks;