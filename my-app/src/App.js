import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import BookTable from './components/BookTable';
import DisplayBoard from './components/DisplayBoard';
import CreateBook from './components/CreateBook';
import { getAllBooks, createBook } from './services/BookService';
import Footer from './components/Footer';

import CreateTodo from './components/CreateTodo';
import TodoTable from './components/TodoTable';
import { getAllTodos, createTodo } from './services/TodoService';

function App () {

  const [bookShelf, setBookShelf] = useState({});
  const [books, setBooks] = useState([]);
  const [numberOfBooks, setNumberBooks] = useState(0);

  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [isTodo, setIsTodo] = useState(false);

  const handleSubmit = () => {
      createBook(bookShelf)
        .then(() => {
          setNumberBooks(numberOfBooks+1);
      });
  }

  const getAllBook = () => {
    getAllBooks()
      .then(data => {
        setBooks(data);
        setNumberBooks(data.length);
      });
  }

  const handleOnChangeForm = (e) => {
      let inputData = bookShelf;
      if (e.target.name === 'book') {
        bookShelf.book = e.target.value;
      } else if (e.target.name === 'category') {
        bookShelf.category = e.target.value;
      } else if (e.target.name === 'author') {
        bookShelf.author = e.target.value;
      }
      setBookShelf(inputData);
  }

  const handleOnChangeTodoForm = (e) => {
    let inputData = todo;
    if(e.target.name === 'todo')
      todo.todo = e.target.value;
    else if(e.target.name === 'category')
      todo.category = e.target.value;
    setTodo(inputData);
  }

  const handleTodoSubmitted = (e) => {
    createTodo(todo);
  }

  const getAllTodo = () => {
    getAllTodos()
      .then(data => {
        setTodos(data);
      });
  }


  return (
    <div className="main-wrapper">
      <div className="main">
        <Header />
        <button onClick={()=>isTodo? setIsTodo(false) : setIsTodo(true)}>Todo</button>

        {isTodo ?
        <CreateTodo
          onChangeForm={handleOnChangeTodoForm}
          handleSubmit={handleTodoSubmitted}/>
        :
        <CreateBook
          bookShelf={bookShelf}
          onChangeForm={handleOnChangeForm}
          handleSubmit={handleSubmit}/>
        }

        {!isTodo &&
        <DisplayBoard
          numberOfBooks={numberOfBooks}
          getAllBook={getAllBook}
        />}

        {isTodo ?
          <TodoTable todos={todos} getAllTodos={getAllTodos}/>
          :
          <BookTable books={books} />
        }
        <Footer />
      </div>
    </div>
  );
}

export default App;
