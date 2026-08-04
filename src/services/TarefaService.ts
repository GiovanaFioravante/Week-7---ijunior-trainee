//estrutura da tarefa 
export interface Tarefa {
  id: string;
  title: string;
  completed: boolean;
}

class TarefaService {
  //array que simula o banco de dados 
  private tarefas: Tarefa[] = [];

  //cria uma nova tarefa com id aleatorio
  criar(title: string): Tarefa {
    const novaTarefa: Tarefa = {
      id: Math.random().toString(36).substring(2, 9),
      title,
      completed: false //iniciada como pendente
    };

    this.tarefas.push(novaTarefa);
    return novaTarefa;
  }

  //listagem de tarefas com filtragem por status
  listar(completedFilter?: string): Tarefa[] {
    if (completedFilter !== undefined) {
      const isCompleted = completedFilter === 'true';
      return this.tarefas.filter(t => t.completed === isCompleted);
    }
    return this.tarefas;
  }

  //busca da tarefa por id
  buscarPorId(id: string): Tarefa | undefined {
    return this.tarefas.find(t => t.id === id);
  }

  //atualiza os campos que foram enviados na requisição
  atualizar(id: string, dados: { title?: string; completed?: boolean }): Tarefa | null {
    const tarefa = this.buscarPorId(id);
    if (!tarefa) return null; //retorna null para o controller

    if (dados.title !== undefined) tarefa.title = dados.title;
    if (dados.completed !== undefined) tarefa.completed = dados.completed;

    return tarefa;
  }

  //remove a tarefa do array
  deletar(id: string): boolean {
    const index = this.tarefas.findIndex(t => t.id === id);
    if (index === -1) return false; //caso nao encontrada
    
    this.tarefas.splice(index, 1);
    return true;
  }
}

export default new TarefaService();