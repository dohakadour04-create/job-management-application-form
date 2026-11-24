import React, { useState, useEffect } from 'react';
import './App.css';

import JobForm from './Components/JobForm';
import JobColumn from './Components/JobColumn';
import JobList from './Components/JobList';

import completed from './Images/completed.jpg';
import list from './Images/list.jpg';
import loading from './Images/loading.jpg';

function App() {

    const [jobs, setJobs] = useState(() => {

        const savedJobs = localStorage.getItem('jobs');

        if (savedJobs) {
            return JSON.parse(savedJobs);
        }

        return [
            {
                id: 1,
                title: 'Check customer emails',
                category: 'Read Emails',
                status: 'start'
            },
            {
                id: 2,
                title: 'Parse website data',
                category: 'Web Parsing',
                status: 'running'
            },
            {
                id: 3,
                title: 'Send welcome emails',
                category: 'Send Emails',
                status: 'completed'
            }
        ];
    });

    useEffect(() => {
        localStorage.setItem('jobs', JSON.stringify(jobs));
    }, [jobs]);

    const [searchTerm, setSearchTerm] = useState('');

    const addJob = (jobData) => {
        const newJob = {
            ...jobData,
            id: Date.now()
        };

        setJobs((previousJobs) => [...previousJobs, newJob]);
    };

    const updateJobStatus = (jobId, newStatus) => {
        setJobs((previousJobs) =>
            previousJobs.map((job) =>
                job.id === jobId
                    ? { ...job, status: newStatus }
                    : job
            )
        );
    };

    const deleteJob = (jobId) => {
        setJobs((previousJobs) =>
            previousJobs.filter((job) => job.id !== jobId)
        );
    };

    const editJob = (updatedJob) => {
        setJobs((previousJobs) =>
            previousJobs.map((job) =>
                job.id === updatedJob.id ? updatedJob : job
            )
        );
    };

    const filteredJobs = jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const startJobs = filteredJobs.filter(
        (job) => job.status === 'start'
    );

    const runningJobs = filteredJobs.filter(
        (job) => job.status === 'running'
    );

    const completedJobs = filteredJobs.filter(
        (job) => job.status === 'completed'
    );

    return (
        <div className="App">

            <h1>Job Management Application</h1>

            <JobForm onAddJob={addJob} />

            <JobList
                jobs={jobs}
                onEditJob={editJob} />

            <input
                type="text"
                className="job-search"
                placeholder="Search jobs by title or category..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)} />

            <div className="job-board">

                <JobColumn
                    title="Need to Start"
                    image={list}
                    jobs={startJobs}
                    onStatusChange={updateJobStatus}
                    onDeleteJob={deleteJob} />

                <JobColumn
                    title="In Progress"
                    image={loading}
                    jobs={runningJobs}
                    onStatusChange={updateJobStatus}
                    onDeleteJob={deleteJob} />

                <JobColumn
                    title="Completed"
                    image={completed}
                    jobs={completedJobs}
                    onStatusChange={updateJobStatus}
                    onDeleteJob={deleteJob} />

            </div>

        </div>
    );
}

export default App;