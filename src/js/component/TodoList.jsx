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
                    value={inputValue}//aqui vinculamos el estado al input 
                    onChange={(status) => setinputValue(status.target.value)}//actualizamos el estado al escribir
                    onKeyDown={(status) => {
                        if (status.key === "Enter" && inputValue.trim() !== "") {
                            setTasks([...tasks, inputValue]);// Añadimos la nueva tarea al array de tasks 
                            setinputValue("");//limpiamos el campo de entrada ya quelo hemos mandado a introducir en el array 
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
                    tasks.map((task, index) => (//cojo dos parametros 1-lo que hay dentro del array 2 el index del array
                        <li key={index}//estoy recogiendo la tarea selecionada con el index
                            className="list-group-item d-flex justify-content-between align-items-center"
                            onMouseEnter={() => setHoveredTask(index)} // Asignamos el índice de la tarea en hover cuando señalo la casilla de la lista 
                            onMouseLeave={() => setHoveredTask(null)} // Restablecemos el hover cuado dejode señalar la casilla de la lista 
                        >
                            {task} {/* Muestra la tarea guardada en la lista asignada a ese indice */}
                            {/* Mostrar botón solo si esta tarea está en hover */}
                            {hoveredTask === index && (//si el index i el boton estan alineados entonces borramos la tarea deese index
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