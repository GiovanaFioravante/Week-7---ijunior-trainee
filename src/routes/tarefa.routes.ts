import { Router } from 'express';
import tarefaController from '../controllers/TarefaController';

const router = Router();

//requisição HTTP x função do controller
//nova tarefa
router.post('/', tarefaController.criar);        
//listagem
router.get('/', tarefaController.listar);       
//busca por id
router.get('/:id', tarefaController.buscarPorId); 
//atualiza
router.put('/:id', tarefaController.atualizar);    
//deleta
router.delete('/:id', tarefaController.deletar);  

export default router;