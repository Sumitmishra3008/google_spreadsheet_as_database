import React, { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    Email: "",
    PhoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("Email", formData.Email);
    data.append("PhoneNumber", formData.PhoneNumber);

    const Sheet_Url = import.meta.env.VITE_API;
    console.log("API URL:", Sheet_Url);

    try {
      const response = await fetch(Sheet_Url, {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setFormData({
        name: "",
        Email: "",
        PhoneNumber: "",
      });

      console.log("Data successfully submitted!");
    } catch (error) {
      console.log("Error submitting the form:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Full Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="Email">Email:</label>
            <input
              type="email"
              id="Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="PhoneNumber">Phone Number:</label>
            <input
              type="tel"
              id="PhoneNumber"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </header>
    </div>
  );
}

export default Contact;
