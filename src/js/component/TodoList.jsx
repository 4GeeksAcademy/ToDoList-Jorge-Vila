import React, { useState } from "react";


const TodoList = () => {
//estado para manejar el texto de la tarea que se escribe
const [inputValue, setinputValue] = useState("");

    return (
        <div>
            {/*CAMPO DE ENTRADA Del Formulario*/}
            <div className="input-group mb-3">
                <input 
                type="text" 
                className="form-control"
                placeholder="Escriba una tarea aqui señorit@"
                value={inputValue}//aqui viculamos el estado al input 
                onChange={(status) => setinputValue(status.target.value)}//actualizamos el estado al escribir
                ON
                />

            </div>

        </div>  
    ) 

};

export default TodoList;