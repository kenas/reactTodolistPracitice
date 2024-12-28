import styles from './Menu.module.css'

function Menu ({handleModal, handleCategory}) {

    function handleLocalyCategory(e) {
        const category = e.target.value;
        console.log('Selected category:', category); 
        handleCategory(category);
    }

    return (
      
        <div className={styles.menu}>
              
            <button 
                className={styles.buttonAdd}
                onClick={handleModal}
            >+</button>

            <form>
            <div className={styles.menuCategory}>
                <input 
                    type='radio' 
                    name='category' 
                    id='all'
                    value="all"
                    onChange={handleLocalyCategory} // Use the same handler
                />
                <label htmlFor='all'>All</label>
            </div>

            <div className={styles.menuCategory}>
                <input 
                    type='radio' 
                    name='category' 
                    id='urgent'
                    value="urgent"
                    onChange={handleLocalyCategory}
                />
                <label htmlFor='urgent'>Urgent</label>
            </div>

            <div className={styles.menuCategory}>

                <input 
                    type='radio' 
                    name='category' 
                    id='personal'
                    value="personal"
                    onChange={handleLocalyCategory}
                />
                <label htmlFor='personal'>Personal</label>
            </div>

            <div className={styles.menuCategory}>
                <input 
                    type='radio' 
                    name='category' 
                    id='work'
                    value="work"
                    onChange={handleLocalyCategory}
                />
                <label htmlFor='work'>Work</label>
            </div>

            <div className={styles.menuCategory}>
                <input 
                    type='radio' 
                    name='category' 
                    id='completed'
                    value="completed"
                    onChange={handleLocalyCategory}
                />
                <label htmlFor='completed'>Completed</label>
            </div>
            
            </form>
        </div>
    )
}

export default Menu;
