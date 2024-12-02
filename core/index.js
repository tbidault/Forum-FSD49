import express from "express";
import routes from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(routes);
app.use('/uploads', express.static('uploads'));
app.get('/', (req, res) => {
  res.send('je suis le backend !');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default app;