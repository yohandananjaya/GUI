import React from 'react';
import './contact.css';

function Contact() {
  return (
    <div className="contact-section">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>If you have any questions or need further assistance, please feel free to reach out to us using the form below.</p>
      </div>
      <div className="contact-content">
        <div className="contact-form">
          <h2>Get in Touch</h2>
          <form>
            <div className="input-box">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="input-box">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="input-box">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>
            <br></br><br></br>
            <button type="submit" className="btn">Send Message</button>
          </form>
        </div>
        <div className="contact-info">
          <h2>Our Office</h2>
          <p>123 WORKBRIDGE Street</p>
          <p>City, State, ZIP Code</p>
          <p>Email: info@workbridge.com</p>
          <p>Phone: (123) 456-7890</p>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.380157596647!2d80.18938967414661!3d6.079368393906752!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae1714b88f66a7b%3A0x8a7feea89839a01a!2sFaculty%20of%20Engineering%20-%20University%20of%20Ruhuna!5e0!3m2!1sen!2slk!4v1737221024041!5m2!1sen!2slk"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Our Office Location"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
