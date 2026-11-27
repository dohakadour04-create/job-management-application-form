import React from 'react';

const JobManagerCard = ({ job, deleteJob }) => {

    return (
        <div className="job-card">

            <h3>{job.activity}</h3>

            <p>
                Categories: {job.categories.join(', ')}
            </p>

            <button onClick={() => deleteJob(job.id)}>
                Delete
            </button>

        </div>
    );
};

export default JobManagerCard;