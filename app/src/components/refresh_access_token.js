import React from 'react'

export default function () {

    const getAccessToken = () => {
        fetch('/user/new-access-token', { method: 'POST'})
            .then(res => res.json())
            .then(body => console.log(body))
            .catch(err => console.log(err));
    }

    getAccessToken();

    return (
        <div>
            <h3>
                Hi there
            </h3>
        </div>
    );
}