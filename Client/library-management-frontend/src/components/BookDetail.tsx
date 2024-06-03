import React, { useEffect, useState } from "react";
import { Book } from "../types/BookProps";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardText, CardTitle } from "react-bootstrap";
import LoadingSpinner from "./LoadingSpinner";

const BookDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<Book | null>(null);
    const [bookIsInLibrary, setBookIsInLibrary] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        axios.get<Book>(`https://localhost:7233/api/books/${id}`)
            .then(response => {
                setBook(response.data);
            })
            .catch(error => {
                if (error.response.status === 404) setBookIsInLibrary(false);
                else console.error('Error fetching book:', error);
            });
    }, []);

    if (bookIsInLibrary === false) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="d-flex flex-column align-items-center">
                    <div>
                        <h1>
                            There is no such book in our library.
                        </h1>
                    </div>
                    <div>
                        <h2>
                            <Link to={'/'}>Back to the list of books</Link>
                        </h2>
                    </div>
                </div>
            </div>
        );
    }

    if (!book) {
        return (
            <LoadingSpinner></LoadingSpinner>
        )
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="d-flex align-items-center flex-column">
                <Card className="p-3 pb-0 w-25">
                    <Card.Body>
                        <CardTitle>
                            <span className="h1">«{book.title}»</span>
                        </CardTitle>
                        <CardText>
                            <p className="h4">by {book.author}</p>
                            <p><span className="fw-bold">Description:</span> {book.overview}</p>
                            <p><span className="fw-bold">Language(s):</span> {book.language}</p>
                            <p><span className="fw-bold">Copies In Stock:</span> {book.copiesInStock}</p>
                            <p><span className="fw-bold">Total Copies:</span> {book.totalCopies}</p>
                        </CardText>
                    </Card.Body>
                </Card>
                <h2 className="pt-3">
                    <a href="/" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">
                        Back to the list of books
                    </a>
                </h2>
            </div>
        </div>
    )
}

export default BookDetail;