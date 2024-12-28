import styles from './Task.module.css';
import bin from '../../bin.svg';

function Task({task, handleDeleteTask, handleDone}) {

    function handleDoneOnClick(taskID) {
        handleDone(taskID);
    }

    return (
        <section className={styles.card}>
            <div className={styles.cardContainer}>
                <input 
                    type="radio" 
                    name={`complete-${task.id}`}
                    value={`complete-${task.id}`}
                    onChange={() => handleDoneOnClick(task.id)}
                    checked={task.completed}
                />
                    <div className={styles.cardDetails}>
                        <h4>{task.completed ? <del>{task.title}</del> : task.title}</h4>
                        <p>{task.completed ? <del>{task.description}</del> : task.description}</p>
                        {/* {task.completed ? <del><h4>{task.title}</h4><p>{task.description}</p></del> : <div><h4>{task.title}</h4><p>{task.description}</p></div>} */}
                    </div>
                <button 
                    className={styles.buttonDelete}
                    onClick={() => handleDeleteTask(task.id)}
                    ><img src={bin} alt="Delete task"/></button>
            </div>
        </section>
    )
}

export default Task;