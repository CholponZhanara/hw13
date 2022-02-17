import React, {useContext} from 'react';
import AuthContext from '../../store/auth-context';

import classes from './Navigation.module.css';

const Navigation = () => {
  const cntxtData = useContext(AuthContext)  //{isLoggedIn: false}
  return (
  <nav className={classes.nav}>
  <ul>
    {cntxtData.isLoggedIn && (
      <li>
        <a href="/">Users</a>
      </li>
    )}
    {cntxtData.isLoggedIn && (
      <li>
        <a href="/">Admin</a>
      </li>
    )}
    {cntxtData.isLoggedIn && (
      <li>
        <button onClick={cntxtData.onLogout}>Logout</button>
      </li>
    )}
  </ul>
</nav>
  
)
};

export default Navigation;
