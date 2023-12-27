import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    nationality: '',
    email: '',
    phone: '',
    address: '',
    message: '',
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:5000/api/get-surveys')
      .then((response) => {
        console.log('Survey data from server:', response.data);
        setData(response.data); // Assuming the response.data is an array
      })
      .catch((error) => {
        console.error('Error fetching surveys:', error);
        // Handle errors, e.g., set data to a default value or show an error message
      });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/submit-survey', formData)
      .then((response) => {
        console.log(response.data);
        fetchData(); // Fetch updated survey data after successful submission
        setFormData({
          name: '',
          gender: '',
          nationality: '',
          email: '',
          phone: '',
          address: '',
          message: '',
        }); // Reset form fields after submission
      })
      .catch((error) => {
        console.error('Error submitting survey:', error);
      });
  };

  return (
    <div className='survey'>
      <h1>Survey Form</h1>
      <form onSubmit={handleSubmit}>
         <label>
           Name:
         <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <br></br>
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br></br>
        <label>
          Nationality:
          <input
            type="text"
            name="nationality"
            value={formData.nationality}
            onChange={handleInputChange}
            required
          />
        </label>
        <br></br>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </label>
        <br></br>
        <label>
          Phone:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </label>
        <br></br>
        <label>
          Address:
          <textarea
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <br></br>
        <label>
          Message:
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      <h2>Previous Surveys</h2>
      <ul>
        {data.length > 0 ? (
          data.map((survey) => (
            console.log('Survey element:', survey)

            // <li key={survey._id}>{survey.name}</li>
          ))
        ) : (
          <p>No previous surveys found.</p>
        )}
      </ul>
    </div>
  );
};

export default App;