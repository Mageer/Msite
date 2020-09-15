import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { refreshUser } from '../../actions/user';


function useNewAccessToken() {
  const dispatch = useDispatch();
  const intervalLength = 1*60*1000; //  Token expires after 1hr

  useEffect(() => {
    const interval = setInterval(() => dispatch(refreshUser()), intervalLength);
    return () => clearInterval(interval);
  }, [dispatch, intervalLength]);
  
  return;
}

export default useNewAccessToken;
