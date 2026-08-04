export interface Tarefa {
  id: string;
  title: string;
  completed: boolean;
}

class TarefaService {
  private tarefas: Tarefa[] = [];

  criar(title: string): Tarefa {
    const novaTarefa: Tarefa = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      completed: false
    };
    this.tarefas.push(novaTarefa);
    return novaTarefa;
  }

  listar(completedFilter?: string): Tarefa[] {
    if (completedFilter !== undefined) {
      const isCompleted = completedFilter === 'true';
      return this.tarefas.filter(t => t.completed === isCompleted);
    }
    return this.tarefas;
  }

  buscarPorId(id: string): Tarefa | undefined {
    return this.tarefas.find(t => t.id === id);
  }

  atualizar(id: string, dados: { title?: string; completed?: boolean }): Tarefa | null {
    const tarefa = this.buscarPorId(id);
    if (!tarefa) return null;

    if (dados.title !== undefined) tarefa.title = dados.title;
    if (dados.completed !== undefined) tarefa.completed = dados.completed;

    return tarefa;
  }

  deletar(id: string): boolean {
    const index = this.tarefas.findIndex(t => t.id === id);
    if (index === -1) return false;
    
    this.tarefas.splice(index, 1);
    return true;
  }
}

export default new TarefaService();