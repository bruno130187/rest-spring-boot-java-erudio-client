import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import BookList from './pages/BookList';
import BookNew from './pages/BookNew';

export default function RoutesMy() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login/>} />
                <Route path="/bookList" element={<BookList/>} />
                <Route path="/bookNew/:bookId" element={<BookNew/>} />
            </Routes>
        </BrowserRouter>
    );
}