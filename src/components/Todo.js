import React, { useState } from "react";

//props passed include toggle+edit+delete functions, and content to fill
export default function Todo(props) {
    //intialize state hooks for which template to use via conditional rendering as well as a hook for editing 
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    //when called by event listener in the edit template, adjust state of newName
    function handleChange(e) {
        setNewName(e.target.value);
    }

    //when form submission happens in the edit template, call this
    function handleSubmit(e) {
        e.preventDefault();
        //call props edit function, pass in state of newName and id of what was editted, then wipe state and hide edit template
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    //conditional rendering, edit template for editting a task
    //calls submit function on submit, change in input field calls function via event listener
    //cancel button switches view template, save triggers form submission, props.name is passed in from parent
    const editingTemplate = (
        <form className="stack-small" onSubmit={handleSubmit}> 
          <div className="form-group">
            <label className="todo-label" htmlFor={props.id}>
              New name for {props.name}
            </label>
            <input 
                id={props.id} 
                className="todo-text" 
                type="text" 
                value={newName}
                onChange={handleChange}
            /> 
          </div>
          <div className="btn-group">
            <button
                type="button"
                className="btn todo-cancel"
                onClick={() => setEditing(false)}
            >
                Cancel
                <span className="visually-hidden">renaming {props.name}</span>
            </button>
            <button type="submit" className="btn btn__primary todo-edit">
              Save
              <span className="visually-hidden">new name for {props.name}</span>
            </button>
          </div>
        </form>
      );

      //conditional rendering, view template for viewing a task
      //has props function for delete and toggle included to call, as well as edit function, editting view controlled by state in this component
      //toggle triggered by checkbox change
      //edit button triggers state change and therefore view change in conditional rendering
      //delete triggers delete prop that passes in id as callback to parent which then deletes and re-renders
      const viewTemplate = (
        <div className="stack-small">
          <div className="c-cb">
              <input
                id={props.id}
                type="checkbox"
                defaultChecked={props.completed}
                onChange={() => props.toggleTaskCompleted(props.id)}
              />
              <label className="todo-label" htmlFor={props.id}>
                {props.name}
              </label>
            </div>
            <div className="btn-group">
             <button 
                type="button" 
                className="btn" 
                onClick={() => setEditing(true)}
             >
              Edit <span className="visually-hidden">{props.name}</span>
             </button>
             <button
                type="button"
                className="btn btn__danger"
                onClick={() => props.deleteTask(props.id)}
             >
                Delete <span className="visually-hidden">{props.name}</span>
             </button>
            </div>
        </div>
      );

    //display what is needed, whichever template is active
    //conditional rendering dependent on state of isEditing which then runs a ternary to render either of the two CONST above
    return (
        <li className="todo">{isEditing ? editingTemplate : viewTemplate}</li>
    ); 
} 

