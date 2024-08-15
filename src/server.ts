import express from 'express';
import movieRoutes from './routes/routes';
import dotenv from 'dotenv';


dotenv.config();


const app = express();

// Middlewares
app.use(express.json());


// Uso das rotas
app.use('/api/movies', movieRoutes);


// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server rodando na porta: ${PORT}`);
});

