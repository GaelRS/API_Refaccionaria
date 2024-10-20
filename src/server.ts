import app from './app';
import connectDB from './config/mongo';
import { connectRedis } from './config/redis'; // Importa la función de conexión de Redis

const PORT = process.env.PORT || 3000;

connectDB();
connectRedis().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((err: any) => {
    console.error('Error connecting to Redis', err);
});
