const express = require("express");
const cors = require("cors"); // Import CORS middleware
const connectDb = require("./config/db");
const UserRouter = require("./routes/userRoute");
const ProductRouter = require("./routes/ProductRoute");
const ReviewRoute = require("./routes/ReviewRoute");
const CommunityPostRoute = require('./routes/CommunityPostRoute');
const SearchProductRoute = require("./routes/SearchProductRoute");
const AuthRouter = require("./routes/AuthRoute");

const app = express();

// Connect to Database
connectDb();

// Use CORS Middleware
app.use(cors({
  origin: "http://localhost:5173", // Replace with your React frontend URL
  credentials: true, // Allow credentials (cookies, authentication headers)
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
}));

// Middleware to parse JSON requests
app.use(express.json());

// Define Routes
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/reviews", ReviewRoute);
app.use("/api/communityposts", CommunityPostRoute);
app.use("/api/search", SearchProductRoute);
app.use("/api/auth", AuthRouter);

// Set Server Port
const port = 3000;

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
