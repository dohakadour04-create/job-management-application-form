import React, { useState } from 'react';

const CategorySelector = () => {
    const categoryStyles = {
    readEmails: {
        backgroundColor: 'orange'
    },

    sendEmails: {
        backgroundColor: 'yellow'
    },

    webParsing: {
        backgroundColor: 'blue'
    },

    default: {
        backgroundColor: 'white'
    }
};

const [selectedCategory, setSelectedCategory] = useState('');
const validateCategory = () => {
    return selectedCategory !== '';
};

    return (
    <div className="category-selector">

        <h2>Select a Category</h2>

        <button
            style={{
                ...(selectedCategory === 'readEmails'
                    ? categoryStyles.readEmails
                    : categoryStyles.default),
                    transition: 'background-color 0.3s ease'
            }}
            onClick={() => setSelectedCategory('readEmails')} >
            Read Emails
        </button>

        <button 
            style={{
                ...(selectedCategory === 'sendEmails'
                    ? categoryStyles.sendEmails
                    : categoryStyles.default),
                    transition: 'background-color 0.3s ease'
            }}
            onClick={() => setSelectedCategory('sendEmails')}>
            Send Emails
        </button>

        <button 
            style={{
                ...(selectedCategory === 'webParsing'
                    ? categoryStyles.webParsing
                    : categoryStyles.default),
                    transition: 'background-color 0.3s ease'
            }}
            
        onClick={() => setSelectedCategory('webParsing')}>
            Web Parsing
        </button>

        <p>
            Selected category: {selectedCategory || 'None'}
        </p>

        <p>
            {validateCategory()
                ? 'Category selected successfully!'
                : 'Please select a category.'}
        </p>

        <button onClick={() => setSelectedCategory('')}>
            Reset Selection
        </button>

    </div>
    );
};

export default CategorySelector;