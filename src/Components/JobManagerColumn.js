import React from 'react';
import JobManagerCard from './JobManagerCard';

const JobManagerColumn = ({ title, status, jobs = [], deleteJob }) => {
const filteredJobs = jobs.filter((job) => job.status === status);
    return (
        <div className="job-column">

            <h2>{title}</h2>

            <div className="job-list">

                {filteredJobs.map((job) => (
                <JobManagerCard
                key={job.id}
                job={job}
                deleteJob={deleteJob} />
            ))}

                {filteredJobs.length === 0 && (
                    <p>No jobs found.</p>
                )}

            </div>

        </div>
    );
};

export default JobManagerColumn;