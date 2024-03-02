const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const port = 3000; 

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); 

// Actual function
app.get('/calculate-si', (req, res) => {
    try {
        const principal = parseFloat(req.query.principal);
        const rateOfInterest = parseFloat(req.query.rateOfInterest);
        const timeInMonths = parseInt(req.query.timeInMonths);

        if (isNaN(principal) || isNaN(rateOfInterest) || isNaN(timeInMonths)) {
            return res.status(400).json({ error: 'Invalid input values. Make sure all inputs are valid numbers.' });
        }

        const result = (principal * rateOfInterest * timeInMonths) / 100;
        const total = principal + result;

        res.json({
            simpleInterest: result.toFixed(2),
            totalProfit: total.toFixed(2)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
