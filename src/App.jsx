import { useEffect, useRef, useState } from "react";
import Navbar from "./components/navbar";
import { v4 as uuidv4 } from "uuid";
import "./app.css";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  // get saved todos from local storage.
  useEffect(() => {
    const gettodo = localStorage.getItem("todos");
    if (gettodo) {
      settodos(JSON.parse(gettodo));
    }
  }, []);

  // save in local storage each time todos are modified
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const element = useRef();

  const handleAdd = () => {
    settodos([...todos, { id: uuidv4(), todo, isComplete: false }]);
    settodo("");
  };

  const handleDelete = (buttonId) => {
    let newtodo = todos.filter((items) => items.id !== buttonId);
    settodos(newtodo);
  };

  const handleFinished = () => {
    setShowFinished((showFinished) => !showFinished);
  };

  const handleEdit = (buttonId, buttonVal) => {
    handleDelete(buttonId);
    settodo(buttonVal);
    element.current.focus();
  };

  const handleChange = (e) => {
    settodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleTick = (e) => {
    let id = e.target.name;
    settodos((todo) => {
      return todo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  return (
    <>
      <Navbar />

      {/* main start */}
      <main className=" h-[95vh] w-[100vw] bg-slate-50 flex justify-center ">
        <div className=" h-[75vh] w-[75vw] lg:w-[50vw] xl:w-[40vw] bg-purple-200 mt-5">
          {/* main card start */}
          <div className="title text-2xl font-extrabold flex justify-center items-center h-[10%] text-center sm:h-[6rem]">
            {/* title section */}
            iTask - manage your todos at one place
          </div>
          <form onSubmit={handleSubmit}>
            {/* form start */}
            <div className="searchbox h-[25%] border-b border-purple-400">
              {/* input box start */}
              <div className=" font-extrabold text-xl m-3">Add a todos</div>
              <div className="flex justify-center items-center">
                <input
                  name="add"
                  ref={element}
                  onChange={handleChange}
                  value={todo}
                  type="text"
                  className=" sm:w-[80%] w-[70%] rounded-full h-[2rem] mr-3 outline-none px-3"
                />
                <button
                  onClick={handleAdd}
                  className=" bg-purple-600 text-white font-bold h-[2rem] sm:w-[15%] w-[20%] rounded-full hover:bg-purple-400 "
                >
                  Add
                </button>
              </div>
              <div className="saved font-semibold text-sm h-[20%] flex text-center gap-2 m-4 ">
                <input
                  type="checkbox"
                  id="finished"
                  className=" outline-none"
                  onChange={handleFinished}
                />
                <label htmlFor="finished"> Show finished </label>
              </div>
            </div>
            {/* input box end  */}
            <div className="contain overflow-y-scroll scrollbar h-[315px]  relative">
              {/* main start */}
              <div className=" font-extrabold text-xl mx-4 my-2 sticky top-0 bg-purple-200">
                Your todos
              </div>
              <div className="todos ">
                {/* todos start */}

                {todos
                  .filter((todo) =>
                    showFinished ? todo.isComplete : !todo.isComplete
                  )
                  .map((item) => {
                    return (
                      <div
                        key={item.id}
                        className="font-semibold text-sm h-[20%] w-[90%] flex justify-between gap-2 m-4 "
                      >
                        <div className="w-[50%] flex items-center">
                          <input
                            type="checkbox"
                            id={item.id}
                            checked={item.isComplete}
                            className=" outline-none"
                            onChange={handleTick}
                            name={item.id}
                          />
                          <label
                            className={item.isComplete ? "line-through" : ""}
                            htmlFor={item.id}
                          >
                            {item.todo}
                          </label>
                        </div>
                        <div className="flex gap-4">
                          <button onClick={() => handleDelete(item.id)}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            onClick={() => handleEdit(item.id, item.todo)}
                          >
                            <i className="fa-solid fa-pen-to-square"></i>
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
              {/* todo end */}
            </div>
            {/* main end */}
          </form>
        </div>
      </main>
    </>
  );
}

export default App;
