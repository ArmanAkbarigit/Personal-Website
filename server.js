const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (optional, if you have any static assets)
app.use(express.static('public'));

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;
    
    // Set up Nodemailer transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'arr3aan@gmail.com',
            pass: 'a1k3b7a9ri#'
        }
    });
    
    // Mail options
    const mailOptions = {
        from: email,
        to: 'arr3aan@gmail.com',
        subject: 'New Mentorship Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };
    
    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Form submission successful');
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
