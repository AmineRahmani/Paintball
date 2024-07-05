import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import '../Style/Contact.css';
import Chat from './Chat';
import Button from 'react-bootstrap/Button'; // Fixed import

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedFormData = {
            ...formData,
            message: `From: ${formData.name} (${formData.email})\n\n${formData.message}`
        };
        const response = await fetch('http://127.0.0.1:8000/contact/send-email/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFormData)
        });
        if (response.ok) {
            alert('Message sent successfully!');
        } else {
            alert('Failed to send message.');
        }
    };

    return (
        <div className="main-content">
            
            <Header />
        <Chat/>
            <div className="contact-form">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-5">
                            <h2>Contactez-nous</h2>

                            <div className="user-box">
                                <input 
                                    type="text" 
                                    name="name" 
                                    className="name" 
                                    placeholder="Name..." 
                                    value={formData.name} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                            <div className="user-box">
                                <input 
                                    type="email" 
                                    name="email" 
                                    className="email" 
                                    placeholder="Email..." 
                                    value={formData.email} 
                                    onChange={handleChange} 
                                    required 
                                />
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="user-box">
                                <textarea 
                                    name="message" 
                                    className="message" 
                                    placeholder="Write Message..." 
                                    value={formData.message} 
                                    onChange={handleChange} 
                                    required 
                                ></textarea>
                            </div>
                            <Button type="submit">
                                Envoyer Message
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="contact-info">
                <div className="contact-detail">
                    <span>Universal Paintball</span>
                    <address>Avenu Abu El Kacem Chebbi</address>
                    <a href="mailto:Paintballuniversal@gmail.com">Paintballuniversal@gmail.com</a>
                    <a href="tel:+21622851455">(+216) 22851455</a>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default ContactForm;