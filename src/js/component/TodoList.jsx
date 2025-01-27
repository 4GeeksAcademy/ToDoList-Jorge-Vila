import React, { useState } from "react";


const TodoList = () => {
    //estado para manejar el texto de la tarea que se escribe
    const [inputValue, setinputValue] = useState("");
    const [tasks, setTasks] = useState([])//Lista de tareas 
    const [hoveredTask, setHoveredTask] = useState(null); // Estado para la tarea en hover y poder ocultar boton de borrado

    const deleteTask = (indexToDelete) => {//funcion para eliminar la tarea despues de pulsar el boton eliminar
        const filteredTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(filteredTasks); // Actualizamos las tareas
    };
    return (
        <div>
            {/*CAMPO DE ENTRADA Del Formulario_______________________________*/}
            <div className="input-group mb-3">


                <input
                    type="text"
                    className="form-control"
                    placeholder="Escriba una tarea aqui señorit@"
                    value={inputValue}//aqui viculamos el estado al input 
                    onChange={(status) => setinputValue(status.target.value)}//actualizamos el estado al escribir
                    onKeyDown={(status) => {
                        if (status.key === "Enter" && inputValue.trim() !== "") {
                            setTasks([...tasks, inputValue]);// Añadimos la nueva tarea al array
                            setinputValue("");//limpiamos el campo de entrada
                        }
                    }}
                />

            </div>

            {/*Campo de lista de tareas______________________________________  */}
            <ul className="list-group">
                {tasks.length === 0 ? ( // en caso de no haber tareas  escribo no hay tareas
                    <li className="list-group-item text-center text-muted">
                        No hay tareas, añadir tareas
                    </li>
                ) : (// en caso de haber añadido una tarea mostararla 
                    tasks.map((task, index) => (
                        <li key={index}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            onMouseEnter={() => setHoveredTask(index)} // Asignamos el índice de la tarea en hover
                            onMouseLeave={() => setHoveredTask(null)} // Restablecemos el hover
                        >
                            {task}
                            {/* Mostrar botón solo si esta tarea está en hover */}
                            {hoveredTask === index && (
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteTask(index)} // Lógica para eliminar tarea
                                >
                                    Eliminar
                                </button>
                            )}
                        </li>
                    ))
                )}
            </ul>


            {/*Campo numero de tareas de la lista ______________________________________  */}
            <div className="text-center mb-3">
                {tasks.length === 0 ? (
                    <strong>No hay tareas. ¡Añade la primera tarea!</strong>
                ) : (
                    <strong>Tareas añadidas: {tasks.length}</strong>
                )}
            </div>




        </div>
    )

};

export default TodoList;