import express, { Request, Response } from 'express';
import path from 'path';

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8000;

app.get('/', function (req: Request, res: Response) {
	res.sendFile('index.html');
});

app.listen(PORT, function () {
	console.log(`Listening on http://localhost:${PORT}`);
});
