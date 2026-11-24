import React, { useState } from 'react';

const JobList = ({ jobs, onEditJob }) => {

    const [editingJobId, setEditingJobId] = useState(null);

    const [editedJob, setEditedJob] = useState({
        title: '',
        category: '',
        status: ''
    });

const startEditing = (job) => {
    setEditingJobId(job.id);

    setEditedJob({
        title: job.title,
        category: job.category,
        status: job.status
    });
};

const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditedJob((previousJob) => ({
        ...previousJob,
        [name]: value
    }));
};

const saveEdit = (job) => {
    if (!editedJob.title.trim() || !editedJob.category) {
        alert('Please fill in all fields.');
        return;
    }

    onEditJob({
        ...job,
        ...editedJob,
        title: editedJob.title.trim()
    });

    setEditingJobId(null);
};

const cancelEdit = () => {
    setEditingJobId(null);
};
    return (
        <div className="job-list-display">

            <h2>All Added Jobs</h2>

            {jobs.length === 0 ? (
                <p>No jobs have been added yet.</p>
            ) : (
                jobs.map((job) => (
                    <div className="job-list-item" key={job.id}>

    {editingJobId === job.id ? (

        <div>
            <input
                type="text"
                name="title"
                value={editedJob.title}
                onChange={handleEditChange}
                placeholder="Job title" />

            <select
                name="category"
                value={editedJob.category}
                onChange={handleEditChange} >
                <option value="Read Emails">Read Emails</option>
                <option value="Web Parsing">Web Parsing</option>
                <option value="Send Emails">Send Emails</option>
            </select>

            <select
                name="status"
                value={editedJob.status}
                onChange={handleEditChange} >
                <option value="start">Start Process</option>
                <option value="running">Running</option>
                <option value="completed">Completed</option>
            </select>

            <button onClick={() => saveEdit(job)}>
                Save
            </button>

            <button onClick={cancelEdit}>
                Cancel
            </button>
        </div>

    ) : (

        <div>
            <h3>{job.title}</h3>

            <p>Category: {job.category}</p>

            <p>Status: {job.status}</p>

            <button onClick={() => startEditing(job)}>
                Edit
            </button>
        </div>

    )}

</div>
                ))
            )}

        </div>
    );
};

export default JobList;