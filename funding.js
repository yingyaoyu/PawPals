const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Body Parser Middleware to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/make-donation', async (req, res) => {
    const { accountId, amount } = req.body; 

    const response = await fetch(`http://api.nessieisreal.com/purchases/w3efwe?key=8201cd3b83224a00c9d24c8829f449b2
    /${accountId}/purchases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.8201cd3b83224a00c9d24c8829f449b2}` 
        },
        body: JSON.stringify({
            merchant_id: 'some_merchant_id', 
            amount: amount,
        })
    });

    const data = await response.json();

    if (response.ok) {
        // Handle success
        res.send('Donation successful!');
    } else {
        // Handle error
        res.status(500).send('Donation failed');
    }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
