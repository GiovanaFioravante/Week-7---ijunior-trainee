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
}

export default new TarefaService();