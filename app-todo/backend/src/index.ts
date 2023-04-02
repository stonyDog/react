import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

// ルートエンドポイントの定義
app.get('/', (req, res) => {
  res.send('Hello, backend!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});