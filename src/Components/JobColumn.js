import React from 'react';
import './JobColumn.css';

const JobColumn = ({ title, image, jobs, onStatusChange, onDeleteJob }) => {

    return (
        <div className="job-column">

            <div className="column-header">
                <img src={image} alt={title} />
                <h2>{title}</h2>
            </div>

            <div className="job-list">

                {jobs.map((job) => (
                    <div className="job-card" key={job.id}>

                        <h3>{job.title}</h3>

                        <p>{job.category}</p>

                        <select
                            className="move-job"
                            value={job.status}
                            onChange={(event) =>
                                onStatusChange(job.id, event.target.value)} >
                            <option value="start">Need to Start</option>
                            <option value="running">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>

                        <button
                            className="delete-job"
                            onClick={() => onDeleteJob(job.id)} >
                            Delete Job
                        </button>

                    </div>
                ))}

                {jobs.length === 0 && (
                    <p className="empty-message">No jobs found.</p>
                )}

            </div>

        </div>
    );
};

export default JobColumn;