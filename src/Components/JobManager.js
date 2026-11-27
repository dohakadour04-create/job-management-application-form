import React, { useState } from 'react';
import JobManagerColumn from './JobManagerColumn';
import './JobManager.css';

const JobManager = () => {

    const [jobs, setJobs] = useState([
    ]);

    const [jobDetails, setJobDetails] = useState({
    activity: '',
    categories: [],
    status: 'Need to Complete'
});

const handleInputChange = (e) => {
    const { name, value } = e.target;

    setJobDetails({
        ...jobDetails,
        [name]: value
    });
};

const handleCategoryToggle = (category) => {
    setJobDetails({
        ...jobDetails,
        categories: jobDetails.categories.includes(category)
            ? jobDetails.categories.filter((item) => item !== category)
            : [...jobDetails.categories, category]
    });
};

const resetForm = () => {
    setJobDetails({
        activity: '',
        categories: [],
        status: 'Need to Complete'
    });
};

const deleteJob = (jobId) => {
    setJobs(jobs.filter((job) => job.id !== jobId));
};


const handleSubmit = (e) => {
    e.preventDefault();

    if (jobDetails.activity.trim() === '' || jobDetails.categories.length === 0) {
        alert('Please enter a job activity and select at least one category.');
        return;
    }

    const newJob = {
        id: Date.now(),
        ...jobDetails
    };

    setJobs([...jobs, newJob]);

    resetForm();
};

        return (
        <div className="job-manager">

            <h1>Job Manager</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="activity"
                    placeholder="Enter job activity"
                    value={jobDetails.activity}
                    onChange={handleInputChange} />

                    <div className="category-selection">

                        <p>Select Categories:</p>

                        {['Read Emails', 'Send Emails', 'Web Parsing'].map((category) => (
                            <button
                                key={category}
                                type="button"
                                onClick={() => handleCategoryToggle(category)}
                                className={jobDetails.categories.includes(category) ? 'active' : ''} >
                                {category}
                            </button>
                        ))}

                    </div>

                    <div className="status-selection">

                        <label htmlFor="status">Job Status:</label>

                        <select
                            name="status"
                            id="status"
                            value={jobDetails.status}
                            onChange={handleInputChange} >
                            <option value="Need to Complete">Need to Complete</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>

                    </div>

                    <button type="submit">
                        Add Job
                    </button>

            </form>

            <div className="job-columns">

                <JobManagerColumn
                    title="Need to Complete"
                    status="Need to Complete"
                    jobs={jobs}
                    deleteJob={deleteJob} />

                <JobManagerColumn
                    title="In Progress"
                    status="In Progress"
                    jobs={jobs}
                    deleteJob={deleteJob} />

                <JobManagerColumn
                    title="Completed"
                    status="Completed"
                    jobs={jobs}
                    deleteJob={deleteJob} />

            </div>

        </div>
    );
};

export default JobManager;