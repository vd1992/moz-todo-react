import React, { useState } from "react";

//render form, props passed in include addTask function
function Form(props) {
  //to handle input into form, state hook initialized and set to empty string
  const [name, setName] = useState('');  

  //as form gets content typed into it, onchange calls this function to adjust state
  function handleChange(e) {
    setName(e.target.value);
  } 

  //on button submit action, this function is called
  function handleSubmit(e) {
    e.preventDefault();
    //call props function, pass in current name state triggering it in the parent, wipe the state to empty to conclude
    props.addTask(name);
    setName("");
  } 

    //render form, has functions to trigger on form submission as well as any change via event listener in the input field
    return (
      <form onSubmit={handleSubmit}>
        <h2 className="label-wrapper">
          <label htmlFor="new-todo-input" className="label__lg">
            What needs to be done?
          </label>
        </h2>
        <input
          type="text"
          id="new-todo-input"
          className="input input__lg"
          name="text"
          autoComplete="off"
          value={name}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn__primary btn__lg">
          Add
        </button>
      </form>
    );
  }
  
  export default Form;
  