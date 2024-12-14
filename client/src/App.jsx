import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import CollegeRegister from "./Pages/CollegeRegister";
import CollegeLogin from "./Pages/CollegeLogin";
import EmployerLogin from "./Pages/EmployerLogin";
import EmployerRegister from "./Pages/EmployerRegister";
import AllBlogs from "./Pages/AllBlogs";
import EmployeeRegister from "./Pages/EmployeeRegister";
import EmployeeLogin from "./Pages/EmployeeLogin";
import StudentRegister from "./Pages/StudentRegister";
import StudentLogin from "./Pages/StudentLogin";
import Jobs from "./Pages/Jobs";
import JobPostPage from "./Pages/JobPostPage";
import BlogPost from "./Pages/BlogPost";
import BlogDetail from "./Pages/BlogDetail";
import JobApplyPage from "./Pages/JobApplyPage";
import Home from "./Pages/Home";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminBlogs from "./Pages/AdminBlogs";
import AdminColleges from "./Pages/AdminColleges";
import AdminJobs from "./Pages/AdminJobs";
import AdminUsers from "./Pages/AdminUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLogin from "./Pages/AdminLogin";
import { AuthProvider } from "./contexts/AuthContext";
import EmployerApplications from "./Pages/EmployerApplications";
import JobApply from "./Pages/JobApply";
import MyJob from "./Pages/MyJob";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/college-register" element={<CollegeRegister />} />
          <Route path="/college-login" element={<CollegeLogin />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/employee-register" element={<EmployeeRegister />} />
          <Route path="/employer-login" element={<EmployerLogin />} />
          <Route path="/employer-register" element={<EmployerRegister />} />
          <Route path="/all-blogs" element={<AllBlogs />} />
          <Route path="/student-register" element={<StudentRegister />} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route
            path="/my-jobs"
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <MyJob />
              </ProtectedRoute>
            }
          />

          <Route path="/job-apply/:jobId" element={<JobApply />} />
          <Route
            path="/job-post"
            element={
              <ProtectedRoute allowedRoles={["employer", "admin"]}>
                <JobPostPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/blog-post"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <BlogPost />
              </ProtectedRoute>
            }
          />
          <Route path="/blog-detail/:id" element={<BlogDetail />} />
          <Route path="/job-apply/:id" element={<JobApplyPage />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/blogs"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminBlogs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/colleges"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminColleges />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminUsers />
              </ProtectedRoute>
            }
          />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route
            path="/employer/applications/:jobId"
            element={
              <ProtectedRoute allowedRoles={["employer"]}>
                <EmployerApplications />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
