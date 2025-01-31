const express = require("express");
const connectDb = require("./config/db");
const UserRouter = require("./routes/userRoute");
const ProductRouter = require("./routes/ProductRoute");
const ReviewRoute = require("./routes/ReviewRoute");
const CommunityPostRoute = require('./routes/CommunityPostRoute')
const SearchProductRoute = require("./routes/SearchProductRoute");
const AuthRouter = require("./routes/AuthRoute")

const app = express();

connectDb();
app.use(express.json());
app.use("/api/user", UserRouter);
app.use("/api/product", ProductRouter);
app.use("/api/reviews", ReviewRoute);
app.use("/api/communityposts", CommunityPostRoute);
app.use("/api/search", SearchProductRoute); 
app.use('/api/auth', AuthRouter);


const port = 3000;

app.listen(port, () => {
  console.log(`Server Running at http://localhost:${port}`);
});
