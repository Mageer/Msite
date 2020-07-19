import React from 'react';

const getAccessToken = () => {
  fetch('/user/new-access-token', { method: 'POST' })
    .then((res) => res.json())
    .catch((err) => err);
};

function RefreshAccessToken() {
  const token = getAccessToken();

  return (
    <div>
      <h3>
        {'The new access token:'}
      </h3>
      <br/>
      <p>
        {token}
      </p>
    </div>
  );
}

export default RefreshAccessToken;
