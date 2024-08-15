import { Router } from 'express';
import { getMovies, getVideos } from '../controllers/movieController';


const router = Router();


//Rotas para buscar filmes
router.get('/discover', getMovies);
router.get('/search', getMovies);

//Rota para buscar o trailer de um filme específico
router.get('/video/:movie_id', getVideos);


export default router;

