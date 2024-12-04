import { Button, Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import SuccessBox from './SuccessBox';
// import axios from 'axios'

interface Book {
    bookId: string;
    title: string;
    description: string;
    image: string;
    moredes: string;
    status: string;
}

interface HomecardProps {
  searchTerm: string; // Receive search term from parent
}

const Homecard: React.FC<HomecardProps> = ({searchTerm}) => {

  const [message, setMessage] = useState<string | null>(null); // State to hold success/error message
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(null); // State to hold message type (success or error)
  const [successCount, setSuccessCount] = useState<number>(0);
  const [errorCount, setErrorCount] = useState<number>(0);
    const [books, setBooks] = useState<Book[]>([]);

    async function fetchBooks() {
      try {
        const res = await fetch('http://localhost:8000/getBooks')
        const data = await res.json();
        setBooks(data)
        console.log(books)
      } catch(err) {
        console.log(err)
      }
    }

    useEffect(() => {
      fetchBooks();
    }, []);

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

    const filteredBooks = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
          <SuccessBox message={message} type={messageType || 'success'} count={messageType === 'success' ? successCount : errorCount} />
          <div className='grid md:grid-cols-2 grid-cols-1 justify-items-center gap-y-6 overflow-y-auto '>
            
            {filteredBooks.map((book) => (
            <Card key={book.bookId} className='w-[var(--cardsizew)] h-[var(--cardsizeh)]' imgAlt={book.title} horizontal>
              <p className='text-2xl font-semibold'>{book.title}</p>
              <p className='overflow-y-auto scrollbar-hidden'>{book.description}</p>
              <div className='flex justify-center gap-x-8'>
                  <Button gradientMonochrome="info" href={`/detail/${book.bookId}`} >Read more!</Button>
                  <Button gradientMonochrome="success" onClick={() => addBooking(book.bookId)} >Booking</Button>
              </div>
            </Card>
            ))}
          </div>
      </div>
    )
}

export default Homecard