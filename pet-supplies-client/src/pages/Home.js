import React from 'react';
import bannerImage from '../assets/banner.jpg';

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to Petway</h1>
            <p className="home-subtitle">Your one-stop shop for all pet supplies!</p>
            <div className="banner">
                <img src={bannerImage} alt="Banner" className="banner-image" />
            </div>
        </div>
    );
};

export default Home;
