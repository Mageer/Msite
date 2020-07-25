import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../actions/user';


function useNewAccessToken() {
  const dispatch = useDispatch();
  const timeInt = 55*60*1000;

  useEffect(() => {
    const interval = setInterval(dispatch(refreshUser), timeInt);
    return () => clearInterval(interval);
  });
  
  return;
}

export default useNewAccessToken;
