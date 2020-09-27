function apiCall({
  request,
  success,
  failure,
  method,
  path,
  dispatch,
  getState,
}) {
  dispatch(request());
  const { accessToken } = getState().user;
  const bearer = `Bearer ${accessToken}`;
  const options = {
    method,
    headers: {
      Authorization: bearer,
    },
  };
  return fetch(`${process.env.REACT_APP_API_URI}${path}`, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed");
      }
      return res.json();
    })
    .then((data) => dispatch(success(data)))
    .catch((error) => dispatch(failure(error)));
}

export default apiCall;
