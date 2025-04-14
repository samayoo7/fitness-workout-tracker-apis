import express from 'express';
import dotenv from 'dotenv';
import routes from '@routes/index';

dotenv.config();
const PORT = process.env.PORT || 5000;

// Declare app
const app = express();

app.use(express.json());

// Declare routes
app.use('/api', routes);

// Start the server
app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});