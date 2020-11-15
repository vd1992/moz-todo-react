import React, { useState } from "react"; 
import { nanoid } from "nanoid";

import './App.css'; 

//call in the components
import Todo from "./components/Todo"; 
import Form from "./components/Form";
import FilterButton from "./components/FilterButton"; 

//object for the filter buttons, each key corresponds to button text and has a function associated to use in filter methods
const FILTER_MAP = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

function App(props) {
  //set hooks, corresponding to the tasklist and what filter button is active, tasklist comes from props passed in from index, is an array of objects 
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  //add task function to pass in as prop to Form Component, once callback happens is creates a new task using its parameters and hook is called to adjust tasklist state
  function addTask(name) {
    //in case of empty string tasks, return without changing a thing
    if(name===""){return}
    const newTask = { id: "todo-" + nanoid(), name: name, completed: false };
    setTasks([...tasks, newTask]);
  } 

  //add delete function to pass as prop to Todo component, once callback happens it takes id from parameter and filters just that task out of tasklist then state is adjusted
  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id);
    setTasks(remainingTasks);
  }

  //add toggle (of check) function to pass as prop to Todo component, upon callback it uses map to flip the boolean of the parameter id 
  function toggleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTasks);
  } 

  //add edit function to pass as prop to Todo component, on callback it receives a name in parameter which is to replace the old name for the id associated which is also a parameter
  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
    // if this task has the same ID as the edited task
      if (id === task.id) {
        //
        return {...task, name: newName}
      }
      return task;
    });
    setTasks(editedTaskList);
  }

  //call map on props passed in to map the props object into an array of components to add into the return statement
  //also filters by using the state of filter, by default it is 'all' therefore filtering out nothing
  const taskList = tasks.filter(FILTER_MAP[filter])
.map(task => (
  <Todo
    id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggleTaskCompleted={toggleTaskCompleted}
    deleteTask={deleteTask}
    editTask={editTask}
  />
));

  //map filternames into a component to render, passing in setfilter as props to initiate a state adjust callback when needed
  const filterList = FILTER_NAMES.map(name => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));
  
  //render the app body, array of objects for filterList and taskList defined above
  return (
    <div className="todoapp stack-large">
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {/* render array of filter buttons here */}
        {filterList}
      </div>
      <h2 id="list-heading">{taskList.length} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {/* render the array of todo components here */}
        {taskList}
      </ul>
    </div>
  );
}

export default App;
