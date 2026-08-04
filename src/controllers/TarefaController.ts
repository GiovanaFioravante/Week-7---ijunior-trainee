import { Request, Response } from 'express';
import tarefaService from '../services/TarefaService';

class TarefaController { 
    
  //cria uma nova tarefa
  criar(req: Request, res: Response) {
    try {
      const { title } = req.body;
      
      //validação: se não vier título, é barrado
      if (!title) {
        return res.status(400).json({ error: 'O campo title é obrigatório.' });
      }

      //chama o service para persistir no array e devolve o status 210 (created) com o objeto criado
      const novaTarefa = tarefaService.criar(title);
      return res.status(201).json(novaTarefa);
    } catch (error) {
        //previne qualquer imprevisto no servidor 
      return res.status(500).json({ error: 'Erro interno ao criar tarefa.' });
    }
  }

  //listagem de tarefas
  listar(req: Request, res: Response) {
    try {
      //parametro completed da url 
      const { completed } = req.query;
      //garante que seja tratado como string
      const tarefas = tarefaService.listar(completed as string | undefined);
      
      //devolve a lista de tarefas com status 200 (ok)
      return res.status(200).json(tarefas);
    } catch (error) {
        //erro para problemas na listagem
      return res.status(500).json({ error: 'Erro interno ao listar tarefas.' });
    }
  }


}

 export default new TarefaController();