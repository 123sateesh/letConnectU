import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Redux Stuff
import { Provider } from "react-redux";
import store from "./store";

//Component Imports
import "./App.css";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import setAuthToken from "./helper/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/route/PrivateRoute";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddEducation from "./components/profile-form/AddEducation";
import AddExperience from "./components/profile-form/AddExperience";
import Profiles from "./components/profiles/Profiles";
import Profile from './components/profile/Profile';
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

// this is comment
// import axios from "axios";
// axios.defaults.baseURL = process.env.AXIOS_BASE_URL;
  

if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App = () =>  {

   useEffect(()=>{
     store.dispatch(loadUser());
    },[])
  
  return (
    
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path = "/register" element={<Register />} />
              <Route exact path = "/login" element= {<Login />} />
              <Route exact path = "/profiles" element= {<Profiles/>} />
              <Route exact path = "/profile/:id" element= {<Profile/>} />
              <Route exact path = "/dashboard" element={<PrivateRoute redirectTo='/login'> <Dashboard/> </PrivateRoute>}/>
              <Route exact path = "/create-profile" element={<PrivateRoute > <CreateProfile/> </PrivateRoute>}/>
              <Route exact path = "/edit-profile" element={<PrivateRoute > <EditProfile/> </PrivateRoute>}/>
              <Route exact path = "/add-education" element={<PrivateRoute > <AddEducation/> </PrivateRoute>}/>
              <Route exact path = "/add-experience" element={<PrivateRoute > <AddExperience/> </PrivateRoute>}/>
              <Route exact path = "/posts" element={<PrivateRoute > <Posts/> </PrivateRoute>}/>
              <Route exact path = "/posts/:id" element={<PrivateRoute > <Post/> </PrivateRoute>}/>
            </Routes>
          </section>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
