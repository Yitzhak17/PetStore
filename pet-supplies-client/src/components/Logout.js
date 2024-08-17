//import React,  from 'react'; 
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = ({ setUsername, setRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        // אם יש לך מסלול logout בשרת:
        await axios.post('http://localhost:5000/api/users/logout'); // עדכן את הכתובת אם צריך
        setUsername(''); // מאפס את שם המשתמש
        setRole(''); // מאפס את התפקיד
        navigate('/login'); // נווט לדף הלוגין
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    logout();
  }, [navigate, setUsername, setRole]);

  return null; // או תוכל להוסיף לוגו או הודעה שהמשתמש מתנתק
};

export default Logout;

