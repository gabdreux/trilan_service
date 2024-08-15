import { Router } from 'express';
import { getMovies, getVideos } from '../controllers/movieController';

import connection from '../../config/db';

const router = Router();


//Rotas para buscar filmes
router.get('/movies/discover', getMovies);
router.get('/movies/search', getMovies);

//Rota para buscar o trailer de um filme específico
router.get('/movies/video/:movie_id', getVideos);



router.get('/users', (req, res) => {
    const query = 'SELECT * FROM User';
  
    connection.query(query, (err:any, results:any) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err);
        return res.status(500).send('Erro ao consultar dados.');
      }
      res.json(results);
    });
  });



export default router;

