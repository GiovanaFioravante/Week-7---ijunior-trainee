import express from 'express';
import tarefaRoutes from './routes/tarefa.routes';

const app = express();
const PORT = process.env.PORT || 3333;

//habilita o express para receber dados json
app.use(express.json());

//registra as rotas de tarefas com /task
app.use('/tasks', tarefaRoutes);

//inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});