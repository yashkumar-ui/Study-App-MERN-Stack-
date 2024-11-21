import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Contact from "./pages/Contact";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Setting from "./components/core/Dashboard/Setting";
import { useSelector } from "react-redux";
import {ACCOUNT_TYPE} from "./utilis/constants"
import NewCourse from "./components/core/Dashboard/AddCourse/NewCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/Cart";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
// import OldTv from "./components/common/OldTv";


function App() {
  const {user} = useSelector( (state) => state.profile )

  return (
    <div className="w-screen min-h-screen bg-black flex flex-col font-inter">
      {/* <OldTv/> */}
       <Navbar/>
       <Routes>
           <Route path="/" element={<Home/>} />
           <Route path="signup" 
              element={
                  <OpenRoute>
                      <Signup/>
                  </OpenRoute>
              } />

            <Route path="login" 
               element={
                  <OpenRoute>
                      <Login/>
                  </OpenRoute>
               } />

            <Route path="forgot-password"
              element={
                  <OpenRoute>
                       <ForgotPassword/>
                  </OpenRoute>
              }
            />   

            <Route path="verify-email"
              element={
                  <OpenRoute>
                       <VerifyEmail/>
                  </OpenRoute>
              }
            />

            <Route path="update-password/:id"
               element={
                <OpenRoute>
                     <UpdatePassword/>
                </OpenRoute>
               }
            />

            {/* Open routes */}
            <Route path="/about" element={ <About/> } />
            <Route path="/contact" element={ <Contact/> } />
            <Route path="/catalog/:catalogName" element={ <Catalog/> }/>
            <Route path="/courses/:courseId" element={<CourseDetails/>}/>

             {/* private route only for the login user  */}

             <Route 
                element = {
                  <PrivateRoute>
                       <Dashboard/>
                  </PrivateRoute>
                }
             >
                {/* all the nested routes are comes here */}
                {/* Routes for all the user ---> Student + Instructor */}
                <Route path="/dashboard/my-profile" element={ <MyProfile/>}/>
                {/* add the component later here -----> */}
                <Route path="/dashboard/settings" element={ <Setting/> } />
                {/* <Route path="/dashboard/add-course" element={ <NewCourse/>}/> */}

                 {/* private route for the instructor only ... */}
                 {
                   user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                    <>
                      <Route path="/dashboard/add-course" element={ <NewCourse/>}/>
                      <Route path="/dashboard/my-courses" element={ <MyCourses/> }/>
                      <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>

                    </>  
                   )
                 }

                 private route for the students only 
                 {
                   user?.accountType === ACCOUNT_TYPE.STUDENT && (
                    <>
                      <Route path="/dashboard/enrolled-courses" element={ <EnrolledCourses/>} />
                      <Route path="/dashboard/cart" element={ <Cart/>}/>
                    </>
                   )
                 }

             </Route>

             {/* User view course Routes */}
             <Route
                element={
                  <PrivateRoute>
                      <ViewCourse/>
                  </PrivateRoute>
                }
             >
                {/* Nested Routes will be apply here */}
                {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route
                      path="/view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                      element={<VideoDetails/>}
                    />
                  </>
                )}

             </Route>

             <Route path="*" element={<Error/>}/>

       </Routes>

    </div>
  );
}

export default App;
