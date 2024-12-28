//Imported components.
import Menu from './Components/Menu/Menu';
import { useState, useEffect } from 'react';
import Modal from './Components/Modal/Modal';
import TaskList from './Components/TaskList/TaskList'

//Imported CSS style.
import styles from '../src/App.module.css';

function App() {

  const [tasks, setTasks] = useState([]);
  const [modal, setModal] = useState(false);
  const [allTasks, setAllTasks] = useState([]);


  /* When the state `tasks` changes, check if it contains any tasks and update sessionStorage 
  with the `tasks` state. */
  useEffect(() => {
    if (tasks.length > 0) {
      sessionStorage.setItem('sessionStorageTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  /* On component load, check for tasks in sessionStorage. If found, parse the data from JSON 
  and update `allTasks` and `tasks` states. */
  useEffect(() => {
    const savedTasks = sessionStorage.getItem('sessionStorageTasks');
    if (savedTasks) {
        const tasksData = JSON.parse(savedTasks);

        // Update `allTasks` and `tasks` with parsed sessionStorage data.
        setAllTasks(tasksData);
        setTasks(tasksData);
    }
  }, []);

  // Toggle modal visibility.
  function handleModal() {
      setModal(!modal);
  }

  /* Add a new task to `tasks` and `allTasks`, updating sessionStorage as well. 
  Receives new task data from the modal. */
  function addNewtaskToState(newTask) {
    setTasks((prevTasks) => {
        const updatedTasks = [...prevTasks, newTask];

        // Update allTasks with the new task.
        setAllTasks(updatedTasks); 

        // Update sessionStorage with the new task.
        sessionStorage.setItem('sessionStorageTasks', JSON.stringify(updatedTasks));

        // Return updated tasks for state update.
        return updatedTasks;
    });
  }

  /* Mark a task as done based on its ID. Updates `tasks`, `allTasks`, 
  and sessionStorage to reflect the change. */
  function handleDone(taskID) {
    setTasks((prevTasks) => {
        const updatedTasks = prevTasks.map((task) =>
            task.id === taskID ? { ...task, completed: true } : task
        );

        // Update allTasks and sessionStorage.
        setAllTasks(updatedTasks); 
        sessionStorage.setItem('sessionStorageTasks', JSON.stringify(updatedTasks)); 

        return updatedTasks;
    });
  }
  
  // Handle task filtering based on the selected category from Menu.js.
  function handleCategory(category) {
    if(category === 'all') {
      setTasks(allTasks);
    } else if(category === 'completed') {
      setTasks(allTasks.filter((task) => task.completed === true));
    } else {
      setTasks(allTasks.filter((task) => task.category === category)); 
    }
  }

  // Handle deleting a task based on its ID. Updates `tasks` state.
  function handleDeleteTask(taskID){
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskID))
  }

  
  return (
    <div className={styles.mainContainer}>

      <TaskList 
        tasks={tasks}
        handleDeleteTask={handleDeleteTask}
        handleDone={handleDone}
      />
      {modal && <Modal handleModal={handleModal} addNewtaskToState={addNewtaskToState} />}
      <Menu 
        handleModal={handleModal}
        handleCategory={handleCategory}
      />
    </div>
  );
}

export default App;
