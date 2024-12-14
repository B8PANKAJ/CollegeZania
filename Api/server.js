const express = require("express");
const connectDB = require("./Config/Db");
const employerRoutes = require("./Routes/Employer");
const BlogRoutes = require("./Routes/BlogRoutes");
require("dotenv").config(); // Add this to load the .env file
const cors = require("cors");
const adminRoutes = require("./Routes/AdminRoutes");

const app = express();
app.use("/uploads", express.static("uploads"));
app.use(cors());
connectDB();

app.use(express.json());

app.use("/api/employee", require("./Routes/EmployeesRoutes")); // Register & Login routes
app.use("/api/college", require("./Routes/CollegeRoutes")); // Register & Login routess
app.use("/api/employer", employerRoutes); // Employer routes
app.use("/api/students", require("./Routes/StudentRoutes")); // Register & Login routes
app.use("/api", BlogRoutes); // Use BlogRoutes under the /api path
app.use("/api/jobs", require("./Routes/JobRoutes"));
app.use("/api/applications", require("./Routes/ApplicationRoutes"));
app.use("/api/admin", adminRoutes);

app.use("/", (req, res) => {
  res.send("I am Working!!!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
