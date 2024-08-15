import { Router } from 'express';
import { getMovies, getVideos } from '../controllers/movieController';

import connection from '../../config/db';

const router = Router();


//Rotas para buscar filmes
router.get('/movies/discover', getMovies);
router.get('/movies/search', getMovies);

//Rota para buscar o trailer de um filme específico
router.get('/movies/video/:movie_id', getVideos);





//Rota para buscar users
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






// Rota para criar um novo usuário
router.post('/create/user', (req, res) => {
    const { nome, email } = req.body;
  
    if (!nome || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios.' });
    }
  
    const query = 'INSERT INTO User (nome, email) VALUES (?, ?)';
  
    connection.query(query, [nome, email], (err: any | null) => {
      if (err) {
        console.error('Erro ao inserir o usuário:', err);
        return res.status(500).send('Erro ao adicionar o usuário.');
      }
      res.status(201).send('Usuário criado com sucesso.');
    });
  });


  

export default router;

