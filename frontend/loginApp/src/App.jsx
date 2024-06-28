import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Home from './components/Home';
import LoginForm from './components/Login';
import SignupForm from './components/SignUp';

function App() {
  

  return (
    <>
       <Router>
      {/* <div> */}
        <ToastContainer />
        {/* <Switch> */}
        <Routes>
          <Route exact path="/" component={LoginForm}  element={ <LoginForm/>} />
          <Route exact path="/signup" component={SignupForm} element={ <SignupForm/>} />
          <Route exact path="/home" component={Home}  element={ <Home/>}/>

        </Routes>
        {/* </Switch> */}
      {/* </div> */}
    </Router>

    </>
  )
}

export default App
