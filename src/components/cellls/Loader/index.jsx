import React from 'react';
import "./style.css"
import { useSelector } from 'react-redux';

const Loader = () => {
    const checkLoader = useSelector((state) => state?.auth?.loader)
    return (
        <div className={`loader ${checkLoader ? 'overlay' : ''}`}>
            <div className="spinner-border text-danger" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
};

export default Loader;
