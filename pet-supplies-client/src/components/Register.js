import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Register.css'
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users/register', { email, password, username, firstName, lastName });
            setShowModal(true);

            // Close the modal after 2 seconds and navigate to login page
            setTimeout(() => {
                setShowModal(false);
                navigate('/login');
            }, 2000);
        } catch (err) {
            console.error("Registration failed:", err.response ? err.response.data.message : err.message);
        }
    };

    return (
        <div className="auth-form">
            <h2>הרשמה</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>דואר אלקטרוני</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>שם משתמש</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>סיסמא</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>שם פרטי</label>
                    <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                    <label>שם משפחה</label>
                    <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <button type="submit">הרשמה</button>
            </form>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>ההרשמה עברה בהצלחה!</h3>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Register;

