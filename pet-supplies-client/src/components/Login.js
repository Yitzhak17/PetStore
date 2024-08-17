import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/Login.css'; // ייבוא CSS

const Login = ({ setUsername, setRole, setCurrentUserId }) => { // הוספת param setCurrentUserId
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);

        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log('Response from server:', res.data);
            setUsername(res.data.username);
            setRole(res.data.role);
            setCurrentUserId(res.data.id);
            console.log('User ID:', res.data.id);
            localStorage.setItem('token', res.data.token);
            navigate('/'); // נווט לדף הבית או לעמוד אחר
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setMessage('Login failed: ' + err.response.data.message);
            } else {
                setMessage('Login failed');
            }
        }
    };

    return (
        <div className="auth-form">
            <h2>התחברות</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>דואר אלקטרוני</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>סיסמא</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">התחברות</button>
            </form>
            {message && <p className="message">{message}</p>} {/* הצגת הודעת שגיאה */}
            <p onClick={() => navigate('/register')}>חדשים באתר? להרשמה</p>
        </div>
    );
};

export default Login;


/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUsername, setRole, setCurrentUserId }) => { // הוספת param setCurrentUserId
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);


        try {
            const res = await axios.post('http://localhost:5000/api/users/login', { email, password });
            console.log('Response from server:', res.data);
            setUsername(res.data.username); // עדכון שם המשתמש
            setRole(res.data.role); // עדכון התפקיד
            setCurrentUserId(res.data.id); // הוספת userId למצב
            console.log('User ID:', res.data.id); // הדפסת ה-ID
            localStorage.setItem('token', res.data.token); // ניתן לשמור על טוקן אם צריך
            navigate('/'); // נווט לדף הבית או לעמוד אחר
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setMessage('Login failed: ' + err.response.data.message);
            } else {
                setMessage('Login failed');
            }
        }
    };

    return (
        <div className="auth-form">
            <h2>התחברות</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>דואר אלקטרוני</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>סיסמא</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">התחברות</button>
            </form>
            {message && <p>{message}</p>}
            <p onClick={() => navigate('/register')}>חדשים באתר? להרשמה</p>
        </div>
    );
};

export default Login;
*/