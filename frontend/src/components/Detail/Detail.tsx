import React, { useEffect, useState } from 'react'
// import Nav from '../Nav/Nav'
import { Button } from 'flowbite-react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SuccessBox from '../HomeCard/SuccessBox';

interface Book {
  bookId: string;
  title: string;
  description: string;
  moredes: string;
  image: string;
}

const Detail: React.FC = () => {

  const [message, setMessage] = useState<string | null>(null); // State to hold success/error message
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null); // State to hold message type (success or error)
  const [successCount, setSuccessCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
  const { bookId } = useParams(); // Get the book ID from the URL
  const [book, setBook] = useState<Book | null>(null); // Change to a single book object
  const [error, setError] = useState<string | null>(null);

  const fetchBook = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/getBooks/${bookId}`); // Use the actual _id
      setBook(res.data);
      setError(null); // Reset error state
    } catch (err) {
      console.error('Error fetching book details:', err);
      setError('Failed to fetch book details. Please try again.');
    }
  };

  useEffect(() => {
    if (bookId) fetchBook();
    // fetchBook()
    console.log(bookId)
  }, [bookId]);

  const addBooking = async (bookId: string) => {
    try {
      const response = await fetch('http://localhost:8000/addbooking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }), // Send bookId of the clicked book
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Booking successful!');
        setMessageType('success'); // Set message type to 'success'
        setSuccessCount(prevCount => prevCount + 1); // Increment the success count

        // Clear the success message after 3 seconds
        setTimeout(() => {
          setMessage(null);
          setMessageType(null);
          setSuccessCount(0);
        }, 3000);
      } else {
        setMessage('Error: ' + result.message);
      setMessageType('error');
      setErrorCount(prevCount => prevCount + 1);
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
        setErrorCount(0); // Reset error count after message disappears
      }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred');
    setMessageType('error');
    setErrorCount(prevCount => prevCount + 1);
    setErrorCount(0);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
      setErrorCount(0); // Reset error count after message disappears
    }, 3000);
    }
  };

  if (error) {
    return <div className="text-red-600 font-bold text-center">{error}</div>;
  }

  if (!book) {
    return <div className="text-center text-gray-500">Loading book details...</div>;
  }

  return (
    <div>
      <SuccessBox message={message} type={messageType || 'success'} count={messageType === 'success' ? successCount : errorCount}/>
      <div className='flex gap-x-24 py-6 px-16 font-medium bg-gray-200 overflow-y-auto scrollbar-hidden'>
          <img className='max-w-60 max-h-96 rounded-md'  alt={book.title}/>
          <div className='flex flex-col gap-y-6'>
              <p className='text-4xl'>{book.title}</p>
              <p style={{ whiteSpace: "pre-line" }} className='text-lg'>{book.moredes}</p>
              <div className='flex justify-center gap-x-8'>
                  <Button gradientMonochrome="info" href='/home'>Back to home</Button>
                  <Button gradientMonochrome="success" onClick={() => addBooking(book.bookId)}>Booking</Button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Detail