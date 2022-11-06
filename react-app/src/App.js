import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { getAllProjectsThunk, resetProjects } from './store/project';
import { authenticate } from './store/session';
import ProjectDetails from './components/ProjectDetails/ProjectDetails';
import SidePanel from './components/SidePanel/SidePanel';
import Home from './components/Home/Home';
import Splash from './components/Splash/Splash';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const [sidePanel, setSidePanel] = useState(true)

  
  const handleSidePanelView = () => {
    setSidePanel(!sidePanel)
  }
  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);
  useEffect(() => {
    dispatch(getAllProjectsThunk())
    return dispatch(resetProjects())
  }, [dispatch])
  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Switch>
        <Route exact path='/sign-up'>
          <SignUpForm />
        </Route>
        <Route exact path="/login">
          <LoginForm />
        </Route>
        <Route exact path="/">
          <Splash />
        </Route>
        <ProtectedRoute exact path="/home">
          <div style={{display:"flex"}}>
          <SidePanel sidePanel={sidePanel} toggleSidePanel={handleSidePanelView} />
          <Home />
          </div>
        </ProtectedRoute>
        <ProtectedRoute exact path='/projects/:projectId'>


          <ProjectDetails />

        </ProtectedRoute>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
