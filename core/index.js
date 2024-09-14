import express from "express";
import routes from "./routes/index.js";
import cors from 'cors'
const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.send('je suis le backend !');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
