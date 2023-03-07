import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';
import api from '../../services/api';

export default function BookList() {

    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(0);

    const username = localStorage.getItem("username");
    const accessToken = localStorage.getItem("accessToken");

    const navigate = useNavigate();

    async function logout() {
        localStorage.clear();
        navigate("/");
    }

    async function editBook(id) {
        try {
            
            navigate(`/bookNew/${id}`);

        } catch (err) {
            alert("Failed to edit a book " + id + ". Try again!", err);
        }
    }

    async function deleteBook(id) {
        try {
            await api.delete(`api/book/v1/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            setBooks(books.filter(book => book.id !== id))

        } catch (err) {
            alert("Failed to delete a book " + id + ". Try again!", err);
        }
    }

    async function fetchMoreBooks() {
        const response = await api.get("api/book/v1", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                page: page,
                size: 4,
                direction: 'desc'
            }
        });

        setBooks([...books ,...response.data._embedded.bookVOList]);
        setPage(page + 1);

    }

    useEffect(() => {
        fetchMoreBooks();
    }, []);

    return(
        <div className="book-container">
            <header>
                <img src={logo} alt="Logo" />
                <span>Welcome, <strong>{username.toUpperCase()}</strong>!</span>
                <Link className="button" to="/bookNew/0">Add New Book</Link>
                <button type="button">
                    <FiPower onClick={logout} size={18} color="#251FC5" />
                </button>
            </header>

            <h1>Registered Books</h1>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        <strong>Title:</strong>
                        <p>{book.title}</p>
                        <strong>Author:</strong>
                        <p>{book.author}</p>
                        <strong>Price:</strong>
                        <p>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(book.price)}</p>
                        <strong>Release Date:</strong>
                        <p>{new Intl.DateTimeFormat('pt-br', { timeZone: 'UTC' }).format(new Date(book.launchDate))}</p>
                        <button type="button" onClick={() => editBook(book.id)}>
                            <FiEdit size={24} color="#251FC5" />
                        </button>
                        <button className='delete-button' type="button" onClick={() => deleteBook(book.id)}>
                            <FiTrash2 size={24} color="#251FC5" />
                        </button>
                    </li>
                ))}
            </ul>

                <button className='button' onClick={fetchMoreBooks} type="button">Load more</button>

        </div>
    );
}