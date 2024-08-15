import { Router } from 'express';
import { getMovies } from '../controllers/movieController';


const router = Router();



router.get('/discover', getMovies);


export default router;

