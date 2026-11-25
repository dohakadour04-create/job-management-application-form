import React, { useState } from 'react';
import './AppForm.css';

const JobForm = ({ onAddJob }) => {

    const [jobDetails, setJobDetails] = useState({
    title: '',
    categories: [],
    status: 'start'
});

    const [darkMode, setDarkMode] = useState(false);

    const [categorySearch, setCategorySearch] = useState('');

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setJobDetails((previousDetails) => ({
            ...previousDetails,
            [name]: value
        }));
    };


    const handleCategoryToggle = (category) => {
        setJobDetails((previousDetails) => {
            const isSelected = previousDetails.categories.includes(category);

            if (isSelected) {
                return {
                    ...previousDetails,
                    categories: previousDetails.categories.filter(
                        (item) => item !== category
                    )
                };
            } else {
                if (previousDetails.categories.length >= 3) {
                    alert('You can select a maximum of 3 categories.');
                    return previousDetails;
                }

                return {
                    ...previousDetails,
                    categories: [...previousDetails.categories, category]
                };
            }
        });
    };

    const resetForm = () => {
    setJobDetails({
        title: '',
        categories: [],
        status: 'start'
    });
};

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            jobDetails.title.trim().length < 3 ||
            jobDetails.categories.length === 0 ||
            !jobDetails.status
        ) {
            alert('Please enter a valid title and select at least one category.');
            return;
        }

        console.log('Job Details:', jobDetails);

        onAddJob({
            ...jobDetails,
            title: jobDetails.title.trim()
        });

        alert('Job added successfully!');

        resetForm();
    };

    return (
        <div className={`form-header ${darkMode ? 'dark-mode' : ''}`}>

            <form onSubmit={handleSubmit}>

                <button
                    type="button"
                    className="theme-toggle"
                    onClick={() => setDarkMode(!darkMode)} >
                    {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>

                <input
                    type="text"
                    name="title"
                    className="bot-input"
                    placeholder="Enter the job"
                    value={jobDetails.title}
                    onChange={handleInputChange} />

                <div className="form-details">

                    <input
                    type="text"
                    placeholder="Search categories..."
                    value={categorySearch}
                    onChange={(event) => setCategorySearch(event.target.value)}
                    className="category-search" />

                    <div className="bottom-line">

                        {['Read Emails', 'Web Parsing', 'Send Emails']
                            .filter((category) =>
                                category.toLowerCase().includes(categorySearch.toLowerCase())
                            )
                            .map((category) => (
                                <button
                                    key={category}
                                    type="button"
                                    className={`tag ${jobDetails.categories.includes(category) ? 'active' : ''}`}
                                    onClick={() => handleCategoryToggle(category)} >
                                    {category}
                                </button>
                            ))}

                    </div>

                    <div className="selected-categories">

                        <h4>Selected Categories:</h4>

                        {jobDetails.categories.length === 0 ? (
                            <p>No categories selected.</p>
                        ) : (
                            <ul>
                                {jobDetails.categories.map((category) => (
                                    <li key={category}>{category}</li>
                                ))}
                            </ul>
                        )}

                    </div>

                    <button
                        type="button"
                        onClick={() => setJobDetails((previousDetails) => ({
                            ...previousDetails,
                            categories: []
                        }))}
                        className="reset-button" >
                        Clear Categories
                    </button>
                </div>

                <select
                    className="job-status"
                    name="status"
                    value={jobDetails.status}
                    onChange={handleInputChange} >

                    <option value="start">Start Process</option>
                    <option value="running">Running</option>
                    <option value="completed">Completed</option>
                </select>

                <button
                    type="submit"
                    className="submit-data"
                    disabled={
                        jobDetails.title.trim().length < 3 ||
                        jobDetails.categories.length === 0 ||
                        !jobDetails.status
                    } >
                    Add Job
                </button>

                <button
                    type="button"
                    onClick={resetForm}
                    className="reset-button" >
                    Reset Form
                </button>

            </form>
        </div>
    );
};

export default JobForm;