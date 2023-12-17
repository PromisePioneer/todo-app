import { SunnyOutline } from 'react-ionicons'
import {useState} from "react";






export default function App(){
    const [todoList, setTodoList] = useState([]);
    const [sortBy, setSortBy] = useState("All");
    const [todo, setTodo] = useState("");


    function handleItemChecked(id){

        setTodoList(todoList.map(item => item.id === id ? {...item, checked: !item.checked} : item))
    }


    function handleDeleteItem(id) {
        setTodoList(todoList.filter(item => item.id !== id));
    }


    function handleClearItem(){
        setTodoList(todoList.filter(item =>  !item.checked));
    }


    return (
        <>
            <Header />
            <TodoInput
                todo={todo}
                onSetTodo={setTodo}
                onAddTodo={setTodoList}
                todoList={todoList}
            />
            <ItemList  todoList={todoList}
                       onAddItemCheck={handleItemChecked}
                       onDeleteItem={handleDeleteItem}
                       onClearItem={handleClearItem}
                       sortBy={sortBy}
                       onSort={setSortBy}
            />
        </>
    )

}



function Header(){
    return (
        <div className="container">
            <div className="heading">
                <h1>TODO</h1>
                <SunnyOutline
                    color={'#9EC8B9'}
                    height="50px"
                    width="50px"
                />
            </div>
        </div>
    )
}


function TodoInput({onAddTodo, todoList, todo, onSetTodo}) {



    function handleSubmit(e){
        e.preventDefault();

        if (!todo) return;

        const itemList = {
            id: crypto.randomUUID(),
            description: todo,
            checked: false
        }
        //add item to array
        onAddTodo([...todoList, itemList ])
        onSetTodo("");
    }
    return (
        <div className="container">
            <div className="todo-card-input">
                <form className="todo-form" onSubmit={(e) => handleSubmit(e)}>
                    <input type="text" value={todo} onChange={(e) => onSetTodo(e.target.value)} placeholder="Create new todo"/>
                </form>
            </div>
        </div>
    )
}



function ItemList({todoList, onAddItemCheck, onDeleteItem, onClearItem, sortBy, onSort}) {

    let sortedItems;

    if (sortBy === "All"){
        sortedItems = todoList;
    }

    if (sortBy === "Active"){
        sortedItems = todoList.filter(items => !items.checked)
    }


    if (sortBy === "Completed"){
        sortedItems = todoList.filter(items => items.checked === true)
    }



    
    
    return (
        <section className="card-section">
            <div className="card-list">
                <Item  todoList={todoList}  onAddItemCheck={onAddItemCheck} onDeleteItem={onDeleteItem} sortedItems={sortedItems}/>
                <FilterList todoList={todoList} onClearItem={onClearItem} sortBy={sortBy} onSort={onSort}/>
            </div>
        </section>
    )
}


function Item({todoList, onAddItemCheck, onDeleteItem, sortedItems}) {

    return (
        <>
            {
                sortedItems.map(item => (
                    <div className="item" key={item.id}>
                        <input type="checkbox" value={item.checked} onChange={() =>  onAddItemCheck(item.id)}/>
                        <p className={`item-description ${item.checked ? 'checked' : ''}`}>{item.description}</p>
                        <button className="btn" onClick={() => onDeleteItem(item.id)}>❌</button>
                    </div>
                ))
            }
        </>
    );
}


function FilterList({todoList, onClearItem, sortBy, onSort}) {

    const total = todoList.length;

    return (
        <div className="filter-item">
            <p className="total-left-description">{total} items left</p>

            <div className="filter-active">
                <Button onSort={onSort} sortBy={sortBy}>All</Button>
                <Button onSort={onSort} sortBy={sortBy}>Active</Button>
                <Button onSort={onSort} sortBy={sortBy}>Completed</Button>
            </div>

            <div className="clear-complete">
                <a href="#" onClick={onClearItem}>Clear Complete</a>
            </div>

        </div>
    );

}



function Button({children, onSort, sortBy}) {
    return (
        <button className={`filter-button ${sortBy === children ? 'button-active' : ''} `} onClick={(e) => onSort(e.target.textContent)}>{children}</button>
    )
}