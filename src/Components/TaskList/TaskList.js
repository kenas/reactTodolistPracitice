import Task from '../Task/Task';

import styles from './TaskList.module.css';

function TaskList({tasks, handleDeleteTask, handleDone}) {

    return (
        <section className={styles.tasks}>
        {tasks.map((task) =>
            <Task
                key={task.id}
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleDone={handleDone}
            />
        )}
        </section>
    )
}

export default TaskList;