import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import logo from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';
import CurrencyInput from 'react-currency-input-field';

export default function BookNew() {   

    const [id, setId] = useState(null);
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [title, setTitle] = useState("");
    const [launchDate, setLauchDate] = useState("");
    const [enabled, setEnabled] = useState(1);

    const {bookId} = useParams();

    const username = localStorage.getItem("username");
    const accessToken = localStorage.getItem("accessToken");

    const navigate = useNavigate();

    async function loadBook() {
        try {

            const response = await api.get(`api/book/v1/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                }
            });

            //alert("BUGALOO " + response.data);

            setId(response.data.id);
            setAuthor(response.data.author);
            setPrice(response.data.price);
            setTitle(response.data.title);
            setLauchDate(response.data.launchDate);
            setEnabled(response.data.enabled);
            
        } catch (err) {

            alert("Load a book for edit failed! Try again!", err);
            navigate("/bookList");

        }
    }

    useEffect(() => {
        if (bookId === '0') return; 
        else loadBook();
    }, [bookId]);

    async function saveOrUpdateBook(event) {

        event.preventDefault();

        const data = {
            author,
            price,
            title,
            launchDate,
            enabled,
        }

        if (data.price.indexOf(',') !== -1) {
            data.price = data.price.replace(',', '.');
        }

        try {

            if (bookId === '0') {

                await api.post("api/book/v1", data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });
                
            } else {
             
                data.id = id;

                await api.put("api/book/v1", data, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                });

            }

            navigate("/bookList");

        } catch (err) {
            alert("Save Or Update a Book failed! Try again!", err);
        }

    }

    return(
        <div className="new-book-container">
            <div className="content">
                <section className="form">
                    <img src={logo} alt="Logo"/>
                    <h1>{bookId === '0' ? 'Add New Book' : 'Update a Book'}</h1>
                    <p>Enter the book information and click on {bookId === '0' ? "'Add'" : "'Update'"}!</p>
                    <Link className="back-link" to="/bookList">
                        <FiArrowLeft size={30} color="#251FC5" />
                    </Link>
                </section>
                <form onSubmit={saveOrUpdateBook}>
                    <input 
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <input 
                        placeholder="Author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                    />
                    <input 
                        type="date"
                        value={launchDate}
                        onChange={e => setLauchDate(e.target.value)}
                    />
                    <CurrencyInput
                        placeholder='Price'
                        value={price}
                        decimalScale={2}
                        decimalsLimit={2}
                        decimalSeparator="," 
                        groupSeparator="."
                        onChange={e => setPrice(e.target.value)}
                    />
                    <button className="button" type="submit">{bookId === '0' ? 'Add' : 'Update'}</button>
                </form>
            </div>
        </div>
    );
}