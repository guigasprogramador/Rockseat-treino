import React, { useState, useContext, useReducer, useEffect } from 'react';

import './App1.css'

// Define o contexto para armazenar as tarefas
const TaskContext = React.createContext();

// Define o estado inicial das tarefas
const initialState = {
  tasks: [
    {
      id: 1,
      title: "Fazer compras",
      description: "Comprar ovos, leite e pão no mercado.",
      date: "2023-02-27",
      completed: false
    },
    {
      id: 2,
      title: "Estudar React",
      description: "Assistir ao tutorial de React na plataforma.",
      date: "2023-02-28",
      completed: false
    }
  ]
};

// Define o reducer para gerenciar o estado das tarefas
const taskReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return { tasks: [...state.tasks, action.payload] };
    case "UPDATE_TASK":
      return {
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        )
      };
    case "DELETE_TASK":
      return {
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    default:
      return state;
  }
};

// Define o componente App
const App = () => {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Executa ação sempre que o estado mudar
    console.log("Estado atualizado: ", state);
  }, [state]);

  // Define a função para adicionar uma nova tarefa
  const addTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: state.tasks.length + 1,
      title,
      description,
      date,
      completed: false
    };
    dispatch({ type: "ADD_TASK", payload: newTask });
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    // Define o provider para o contexto das tarefas
    <TaskContext.Provider value={{ state, dispatch }}>
      <div>
        <h1>Gerenciador de Tarefas</h1>
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button type="submit">Adicionar Tarefa</button>
        </form>
        <ul>
          {state.tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() =>
                  dispatch({
                    type: "UPDATE_TASK",
                    payload: { ...task, completed: !task.completed }
                  })
                }
              />
              <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                {task.title} -             {task.description} - {task.date}
          </span>
          <button
            onClick={() => dispatch({ type: "DELETE_TASK", payload: task.id })}
          >
            Excluir
          </button>
        </li>
      ))}
    </ul>
  </div>
</TaskContext.Provider>
);
};

// Define o componente principal para renderizar o App
const Main = () => {
return (
<div>
<h1>Meu aplicativo de gerenciamento de tarefas</h1>
<App />
</div>
);
};

export default Main;
