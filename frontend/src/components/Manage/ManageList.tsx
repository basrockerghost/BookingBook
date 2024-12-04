import { Button, Card } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios';

interface Book {
    _id: string; // Adding _id to match MongoDB object ID
    bookId: {
      title: string;
      description: string;
      moredes: string;
      image: string;
    };
    bookingDate: string;
  }

const ManageList: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchBookings = async () => {
        try {
        const res = await axios.get(`http://localhost:8000/getBooking`);
        setBooks(res.data); 
        setError(null);
        } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to fetch booking details. Please try again.');
        }
    };

    const handleCancel = async (bookingId: string) => {
        try {
        // Send DELETE request to remove the booking
        await axios.delete('http://localhost:8000/removebooking', {
            data: { bookingId }
        });

        // Update the state by removing the canceled booking from the list
        setBooks((prevBooks) => prevBooks.filter((booking) => booking._id !== bookingId));
        } catch (err) {
        console.error('Error removing booking:', err);
        setError('Failed to cancel booking. Please try again.');
        }
    };

    useEffect(() => {
        fetchBookings(); 
    }, []); 

    return (
        <div className="grid grid-cols-4 gap-y-6 py-6">
        {books.length > 0 ? (
            books.map((booking) => (
            <Card key={booking._id} className="w-72">
                <img src="" alt={booking.bookId.title} />
                <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                {booking.bookId.title}
                </h5>
                <p className="font-medium text-red-500 dark:text-gray-400">
                Booking date: {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <Button gradientMonochrome="failure" onClick={() => handleCancel(booking._id)}>Cancel</Button>
            </Card>
            ))
        ) : (
            <p>{error ? error : 'Loading books and bookings...'}</p>
        )}
        </div>
    );
}

export default ManageList
