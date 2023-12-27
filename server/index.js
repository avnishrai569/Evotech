const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/surveydb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>
    console.log("Mongodb connected !")
).catch((error)=>
    console.log("Mongodb connection failed ",error )
)

const surveySchema = new mongoose.Schema({
  name: {type : String},
  gender: {type : String},
  nationality: {type : String},
  email: {type : String},
  phone: {type : String},
  address: {type : String},
  message: {type : String},
});

const Survey = mongoose.model('Survey', surveySchema);

app.post('/api/submit-survey', async (req, res) => {
  try {
    const survey = new Survey(req.body);
    await survey.save();
    res.status(200).json({ message: 'Survey submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/get-surveys', async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.status(200).json({surveys});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
