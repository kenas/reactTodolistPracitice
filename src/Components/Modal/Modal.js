import styles from './Modal.module.css';
import cross from '../../cross.svg';
import ok from '../../ok.svg';
import { useState } from 'react';

function Modal({handleModal, addNewtaskToState}) {

    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        category: ''
    });

    const [errorMessage, setErrorMessage] = useState({
        title: '',
        description: '',
        category: ''
    });
    const [successMessage, setSuccessMessage] = useState({
        title: '',
        description: '',
        category: ''
    });

    function handleAllData (e) {
        const { name, value } = e.target;

        if(!value) {

            setErrorMessage((prevState) => {
                return {...prevState,[name]: `Please enter the ${name}.`};
            });
            
            setSuccessMessage((prevState) => {
                return { ...prevState, [name]: ""}
            })
            //setErrorMessage({ ...errorMessage, [name]: `Please enter the ${name}.`})
        } else {
            setErrorMessage((prevState) => {
                return {...prevState, [name]: ""}
            })

            setSuccessMessage((prevState) => {
                return { ...prevState, [name]: <img src={ok} alt="success"/>}
            })
            //setSuccessMessage({...successMessage, [name]: <img src={ok} alt="success"/>})
        }

        setNewTask({ ...newTask, [name]: value });

    }

    function handleSave(e) {
        e.preventDefault();

        if(!errorMessage.title && !errorMessage.description && !errorMessage.category) {
            addNewtaskToState({
                ...newTask, id: Date.now(), completed: false
            })
            
            setNewTask({title: '', description: '', category: ''});
            handleModal(false);

        }

    }



    return (
        <section className={styles.modal}>
         
            <form className={styles.modalContent} onSubmit={handleSave}>
                <img src={cross} className={styles.closeModal} onClick={handleModal} width="40" alt="Close the modal"/>

                {errorMessage.title && <span className={styles.errorMessage}>{errorMessage.title}</span>}
                {successMessage.title && <span className={styles.successMessage}>{successMessage.title}</span>}
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Enter the title of the task ..."
                    onChange={handleAllData}
                    value={newTask.title}
                />
                {errorMessage.description && <span className={styles.errorMessage}>{errorMessage.description}</span>}
                {successMessage.description && <span className={styles.successMessage}>{successMessage.description}</span>}
                <input 
                    type="text" 
                    name="description" 
                    placeholder="Enter the description of the task ..."
                    onChange={handleAllData}
                    value={newTask.description}
                />


                <div className={styles.categories}>
                    
                    <div className={styles.category}>
                        <input 
                            type="radio" 
                            name="category" 
                            id="urgent" 
                            value="urgent"
                            required
                            onChange={handleAllData}
                        />
                        <label htmlFor="urgent">Urgent</label>
                    </div>
                    <div className={styles.category}>
                        <input 
                            type="radio" 
                            name="category" 
                            id="work"
                            value="work"
                            required
                            onChange={handleAllData}
                        />
                        <label htmlFor="work">Work</label>
                    </div>
                    <div className={styles.category}>
                        <input 
                            type="radio" 
                            name="category" 
                            id="personal"
                            value="personal"
                            required
                            onChange={handleAllData}
                        />
                        <label htmlFor="personal">Personal</label>

                    </div>
                </div>
                 {/* Error and success messages for category */}
                <button className={styles.buttonSave}>SAVE</button>
            </form> 
        </section>
    )
}

export default Modal;