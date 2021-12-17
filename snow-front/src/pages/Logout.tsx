import '../App.css';
import { useEffect } from 'react';
import { removeUserSession } from '../Utils/Common';


function Logout() {
  removeUserSession()
 
  useEffect(() => {
    setTimeout(function() {
      window.location.href="/"
    }, 1000)
  }, [])

  return (
    <div className="page-not-found">
      <div className="text-center py-5">
      </div>
    </div>
  );
}

export default Logout;
