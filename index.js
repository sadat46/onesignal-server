const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// ✅ Correct route path
app.post('/send-notification', async (req, res) => {
  const { userId, message } = req.body;

  try {
    const response = await axios.post('https://onesignal.com/api/v1/notifications', {
      app_id: 'bfa11f73-ac17-4c34-a17b-32598813d6f1',
      include_external_user_ids: [userId],
      contents: { en: message },
      headings: { en: 'New Message' }
    }, {
      headers: {
        Authorization: 'Basic os_v2_app_x6qr645mc5gdjil3gjmyqe6w6h5b2qwgkfzu3bf2u6y7jy5lbygf65w75gwhq4phiq7ygrpfzbtzmcrrlngkrbopxub52r746gks7fi',
        'Content-Type': 'application/json'
      }
    });

    res.status(200).json({ success: true, result: response.data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Optional root route for testing
app.get('/', (req, res) => {
  res.send('Server is running');
});

// ✅ Required for Railway deployment
app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});