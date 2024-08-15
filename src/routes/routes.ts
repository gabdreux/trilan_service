import { Router } from 'express';
import { helloWorld } from '../controllers/movieController';
const router = Router();



router.get('/hello', helloWorld);


export default router;

