const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173' // Replace with your client's URL
}));

mongoose.connect('mongodb://localhost:27017/BookingBooks')

const BookSchema = mongoose.Schema({
    title: String,
    description: String,
    moredes: String
})

const bookingSchema = mongoose.Schema({
    // bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'books' },
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'books' },
    bookingDate: { type: Date, default: Date.now },
})

const BookModel = mongoose.model("books", BookSchema)
const BookingModel = mongoose.model("bookings", bookingSchema);

app.get("/getBooks", (req, res) => {
    BookModel.find({}).then(function(books) {
        res.json(books)
    }).catch(function(err) {
        console.log(err)
    })
})

app.get("/getBooks/:bookId", (req, res) => {
    const {bookId} = req.params;

    BookModel.findById(bookId).then(function (book) {
        if(book) {
            res.json(book);
        } else {
            res.status(404).json({message: "Book not found."});
        }
    })
    .catch(function (err) {
        console.error(err);
        res.status(500).json({ error: "An error occurred."});
    })
})

app.post('/addbooking', async (req, res) => {
    try {
        const { bookId } = req.body;
        console.log('Received bookId:', bookId);

        if (!bookId) {
            return res.status(400).json({ message: 'Book ID is required' });
        }

        const existingBooking = await BookingModel.findOne({ bookId: bookId });
        if (existingBooking) {
            return res.status(400).json({ message: 'This book is already booked' });
        }

        // Find the book by ID
        const book = await BookModel.findById(bookId); // Corrected model reference
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Process the booking (e.g., save to another collection)
        const booking = new BookingModel({ bookId: bookId });
        await booking.save();

        const populatedBooking = await BookingModel.findById(booking._id).populate('bookId');

        res.status(200).json({
            message: 'Booking successful',
            booking: {
                bookId: populatedBooking.bookId._id,
                title: populatedBooking.bookId.title, // Get title here
                bookingDate: populatedBooking.bookingDate
            }
        });
    } catch (err) {
        console.error('Error during booking:', err);
        res.status(500).json({ message: 'An error occurred while processing the booking', error: err.message });
    }
});

app.get("/getBooking", (req, res) => {
    BookingModel.find({})
        .populate("bookId") // This will fetch the related book details based on the bookId reference
        .then(function(bookings) {
            res.json(bookings); // Returns an array of bookings with populated book details (including title)
        })
        .catch(function(err) {
            console.error(err);
            res.status(500).json({ error: "An error occurred while fetching bookings." });
        });
});

app.delete("/removebooking", async (req, res) => {
    const { bookingId } = req.body; // You can also use req.query or req.params if you prefer

    if (!bookingId) {
        return res.status(400).json({ message: 'Booking ID is required' });
    }

    try {
        // Check if the booking exists
        const booking = await BookingModel.findById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Delete the booking
        await BookingModel.findByIdAndDelete(bookingId);

        res.status(200).json({ message: 'Booking successfully removed' });
    } catch (err) {
        console.error('Error removing booking:', err);
        res.status(500).json({ message: 'An error occurred while removing the booking', error: err.message });
    }
});

app.listen(8000, () => {
    console.log("Server is Running")
})