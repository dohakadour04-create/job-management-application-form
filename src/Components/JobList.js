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
        categories: job.categories || (job.category ? [job.category] : []),
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
    if (
    editedJob.title.trim().length < 3 ||
    editedJob.categories.length === 0
) {
    alert('Please enter a valid title and select at least one category.');
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

            <div className="bottom-line">

                <button
                    type="button"
                    className={`tag ${editedJob.categories.includes('Read Emails') ? 'active' : ''}`}
                    onClick={() => {
                        setEditedJob((previousJob) => ({
                            ...previousJob,
                            categories: previousJob.categories.includes('Read Emails')
                                ? previousJob.categories.filter((item) => item !== 'Read Emails')
                                : previousJob.categories.length < 3
                                    ? [...previousJob.categories, 'Read Emails']
                                    : previousJob.categories
                        }));
                    }}>
                    Read Emails
                </button>

                <button
                    type="button"
                    className={`tag ${editedJob.categories.includes('Web Parsing') ? 'active' : ''}`}
                    onClick={() => {
                        setEditedJob((previousJob) => ({
                            ...previousJob,
                            categories: previousJob.categories.includes('Web Parsing')
                                ? previousJob.categories.filter((item) => item !== 'Web Parsing')
                                : previousJob.categories.length < 3
                                    ? [...previousJob.categories, 'Web Parsing']
                                    : previousJob.categories
                        }));
                    }}>
                    Web Parsing
                </button>

                <button
                    type="button"
                    className={`tag ${editedJob.categories.includes('Send Emails') ? 'active' : ''}`}
                    onClick={() => {
                        setEditedJob((previousJob) => ({
                            ...previousJob,
                            categories: previousJob.categories.includes('Send Emails')
                                ? previousJob.categories.filter((item) => item !== 'Send Emails')
                                : previousJob.categories.length < 3
                                    ? [...previousJob.categories, 'Send Emails']
                                    : previousJob.categories
                        }));
                    }}>
                    Send Emails
                </button>
            </div>

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

            <p>
                Categories: {
                    job.categories
                        ? job.categories.join(', ')
                        : job.category
                }
            </p>

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