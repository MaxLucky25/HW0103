import app from './app';
import { connectToDB } from './db/mongo-db';

const PORT = process.env.PORT || 3000;

const start = async () => {
    if (!await connectToDB()) {
        console.error('Failed to connect to database');
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

start();