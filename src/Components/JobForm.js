import React, { useState } from 'react';
import './AppForm.css';

const JobForm = ({ onAddJob }) => {

    const [jobDetails, setJobDetails] = useState({
        title: '',
        category: '',
        status: 'start'
    });

    const [darkMode, setDarkMode] = useState(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setJobDetails((previousDetails) => ({
            ...previousDetails,
            [name]: value
        }));
    };

    const resetForm = () => {
        setJobDetails({
            title: '',
            category: '',
            status: 'start'
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (
            !jobDetails.title.trim() ||
            !jobDetails.category ||
            !jobDetails.status
        ) {
            alert('Please fill in all fields.');
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
                    <div className="bottom-line">

                        <button
                            type="button"
                            className={`tag ${jobDetails.category === 'Read Emails' ? 'active' : ''}`}
                            onClick={() => setJobDetails((previousDetails) => ({
                                ...previousDetails,
                                category: 'Read Emails'
                            }))} >
                            Read Emails
                        </button>

                        <button
                            type="button"
                            className={`tag ${jobDetails.category === 'Web Parsing' ? 'active' : ''}`}
                            onClick={() => setJobDetails((previousDetails) => ({
                                ...previousDetails,
                                category: 'Web Parsing'
                            }))} >
                            Web Parsing
                        </button>

                        <button
                            type="button"
                            className={`tag ${jobDetails.category === 'Send Emails' ? 'active' : ''}`}
                            onClick={() => setJobDetails((previousDetails) => ({
                                ...previousDetails,
                                category: 'Send Emails'
                            }))} >
                            Send Emails
                        </button>

                    </div>
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
                        !jobDetails.category ||
                        !jobDetails.status} >
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