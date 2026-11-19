import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

app.get('/api/ping', (req, res) => res.json({ ok: true }));

app.listen(process.env.PORT, () =>
  console.log(`Server done running at http://localhost:${process.env.PORT}`)
);