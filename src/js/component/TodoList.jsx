import React, { useState, useEffect } from "react";

const TodoList = () => {

  // Estado para manejar el texto del input
  const [inputValue, setInputValue] = useState("");
  // Estado para manejar la lista de tareas
  const [tasks, setTasks] = useState([]);

useEffect(()=>{
  getTask();
},[])

const AddTaskToApi = () =>{
  fetch('https://playground.4geeks.com/todo/todos/Manuel', {
    method: "POST",
    body: JSON.stringify({
      "label": inputValue,
      "is_done": false
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(resp => {
    // Intentará devolver el resultado exacto como string
      return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
  })
  .then(data => {
    setTasks([...tasks, data])  
    // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
      console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
  })
  .catch(error => {
      // Manejo de errores
      console.log(error);
  });
}


const getTask = () =>{
  fetch('https://playground.4geeks.com/todo/users/Manuel', {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(resp => {
    // Intentará devolver el resultado exacto como string
      return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
  })
  .then(data => {
    setTasks(data.todos)  
    // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
      console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
  })
  .catch(error => {
      // Manejo de errores
      console.log(error);
  });
}

  // Función para agregar una nueva tarea
  const addTask = () => {
    // Verificar que no esté vacío y que no se repita
    if (inputValue.trim() === "") {
      alert("La tarea no puede estar vacía.");
      return;
    }
    if (tasks.includes(inputValue)) {
      alert("Esta tarea ya existe.");
      return;
    }
    AddTaskToApi()
    setInputValue(""); // Limpiamos el campo de entrada
  };

  // Función para eliminar una tarea por su índice
  const deleteTask = (indexToDelete) => {
    const filteredTasks = tasks.filter((_, index) => index !== indexToDelete);
    setTasks(filteredTasks);
  };

  return (
    <div className="container mt-4">
      {/* Campo de entrada */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Escribe una tarea"
          value={inputValue} // Enlazamos el valor del input con el estado
          onChange={(e) => setInputValue(e.target.value)} // Actualizamos el estado cuando escriben
        />
        <button className="btn btn-primary" onClick={addTask}>
          Añadir
        </button>
      </div>

      {/* Cantidad total de tareas */}
      <div className="text-center mb-3">
        <strong>Tareas totales: {tasks.length}</strong>
      </div>

      {/* Lista de tareas */}
      <ul className="list-group">
        {/* Si no hay tareas */}
        {tasks.length === 0 && (
          <li className="list-group-item text-center text-muted">
            No hay tareas. ¡Añade la primera tarea!
          </li>
        )}

        {/* Si hay tareas, las mostramos */}
        {tasks.map((task, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {task.label}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(index)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;