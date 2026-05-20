const express = require('express');
const crypto = require('crypto');
const app = express();
app.use(express.json());

const VERIFICATION_TOKEN = process.env.VERIFICATION_TOKEN;
const ENDPOINT_URL = process.env.ENDPOINT_URL;

app.get('/ebay-deletion', (req, res) => {
  const challengeCode = req.query.challenge_code;
    if (!challengeCode) return res.status(400).send('Missing challenge code');

      const hash = crypto.createHash('sha256')
          .update(challengeCode + VERIFICATION_TOKEN + ENDPOINT_URL)
              .digest('hex');

                res.json({ challengeResponse: hash });
                });

                app.post('/ebay-deletion', (req, res) => {
                  console.log('eBay deletion notification received:', req.body);
                    res.status(200).send('OK');
                    });

                    const PORT = process.env.PORT || 3000;
                    app.listen(PORT, () => console.log('Server running on port ' + PORT));
