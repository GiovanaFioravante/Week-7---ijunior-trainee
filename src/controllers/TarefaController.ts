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

  //buscar uma tarefa pelo id 
  buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const tarefa = tarefaService.buscarPorId(id);

      //caso nao encontre a tarefa, retorna 404 (Not Found) 
      if (!tarefa) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      return res.status(200).json(tarefa);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao buscar tarefa' });
    }
  }

  //atualiza o conteúdo de uma tarefa 
  atualizar(req: Request, res: Response) {
    try {
    //id da URL e dados do corpo
      const { id } = req.params;
      const { title, completed } = req.body;

      //aciona o service para encontrar e atualizar tarefa
      const tarefaAtualizada = tarefaService.atualizar(id, { title, completed });

      //se o service retornar null, a tarefa não existe
      if (!tarefaAtualizada) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      //retorna a tarefa modificada
      return res.status(200).json(tarefaAtualizada);
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao atualizar tarefa' });
    }
  }

  //remove uma tarefa
  deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;

      //service procura o indive e o remove
      const sucesso = tarefaService.deletar(id);

      //se retornar false, o ID não foi encontrado
      if (!sucesso) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
      }

      // Status 204 (No Content) confirma que deu certo
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: 'Erro interno ao deletar tarefa' });
    }
  }

}

 export default new TarefaController();