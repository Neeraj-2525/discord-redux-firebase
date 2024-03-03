import React, { useEffect } from 'react';
// import { Counter } from './features/counter/counter';
import './App.css';
import Sidebar from './Components/Sidebar';
import Chat from './Components/Chat';
import { selectUser } from './features/userSlice'
import { useDispatch, useSelector } from 'react-redux';
import Login from './Components/Login';
import { auth } from './firebase';
import { login, logout } from './features/userSlice'

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      console.log('user is ', authUser);
      if (authUser) {
        // the user is logged in
        dispatch(
          login({
            uid: authUser.uid,
            email: authUser.email,
            photo: authUser.photoURL,
            displayName: authUser.displayName
          })
        );
      }
      else {
        // logged out
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user!==null ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
