import { Route, Redirect } from "react-router-dom";
import LoginDialog from '../Components/Login/LoginDialog'
import { LoginContext } from '../context/ContextProvider';
import React, { useState, useContext } from 'react';

const AdminRoute = ({
  component: Component,
  ...rest
}) => {
  const [ open, setOpen ] = useState(false);
  const { account, setAccount } = useContext(LoginContext);
  const isAuthenticated = localStorage.getItem('isAuthenticated') 
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : (
            <Redirect to='/'/>
        )
      }
    />
  );
};
export default AdminRoute
