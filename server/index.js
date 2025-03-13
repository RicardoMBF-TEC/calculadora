const express = require('express');
const cors = require('cors');

const app = express();

// Middleware to parse JSON bodies and allow CORS
app.use(express.json());
app.use(cors());

// /operation endpoint that takes num1, num2, and operator from the request body
app.post('/operation', (req, res) => {
    console.log('Received payload:', req.body);
    const { num1, num2, operator } = req.body;

    // Validate that the numbers are valid numbers
    if (typeof num1 !== 'number' || typeof num2 !== 'number') {
        return res.status(400).json({ error: 'Invalid input values. Ensure both numbers are provided.' });
    }

    let result;
    // Perform calculation based on the operator provided
    switch (operator) {
        case '+':
            result = num1 + num2;
            break;
        case '-':
            result = num1 - num2;
            break;
        case '*':
            result = num1 * num2;
            break;
        case '/':
            if (num2 === 0) {
                return res.status(400).json({ error: 'Cannot divide by zero.' });
            }
            result = num1 / num2;
            break;
        default:
            return res.status(400).json({ error: 'Invalid operator. Use one of +, -, *, /.' });
    }

    // Send back the result
    res.json({ result });
});

// Set the port (default to 3001)
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
