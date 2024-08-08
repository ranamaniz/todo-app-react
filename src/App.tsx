import { useEffect, useState } from "react";

type TODOS = {
  id: number;
  title: string;
  isComplete: boolean;
}[];

function App() {
  const [todoInput, setTodoInput] = useState("");

  const [todos, setTodos] = useState<TODOS>([]);

  const getLocalStorageTodos = () => {
    const lStorageTodos = localStorage.getItem("todos");
    if (lStorageTodos) {
      setTodos(JSON.parse(lStorageTodos));
    }
  };

  const updateTodos = (todos: TODOS) => {
    setTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    // get todos from local storage
    getLocalStorageTodos();
  }, []);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setTodoInput(input);
  };

  const handleAddTodo = () => {
    const id = Math.floor(Date.now() - Math.random() * 1000);
    // TODO: use uuid later

    const newTodo = { id, title: todoInput, isComplete: false };

    const updatedTodos = [...todos, newTodo];

    updateTodos(updatedTodos);
    setTodoInput("");
  };

  const handleRemoveTodo = (todoId: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== todoId);

    updateTodos(updatedTodos);
  };

  const toggleStatus = (todoId: number) => {
    // use Map?

    const updatedTodos = todos.map((todo) =>
      todo.id === todoId ? { ...todo, isComplete: !todo.isComplete } : todo
    );

    updateTodos(updatedTodos);
  };

  return (
    <main className="max-h-screen">
      <article className="flex justify-Hello tcenter flex-col px-6 py-4 ">
        <h1 className="text-center text-slate-900 text-lg bold">Tasks</h1>

        <section className="flex justify-center gap-2 mt-6  ">
          <input
            className="w-72 border-slate-500 border-solid border-2 rounded-md p-2"
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                return handleAddTodo();
              }
              return;
            }}
            value={todoInput}
            placeholder="Just do it!"
          />
          <button
            className="bg-blue-500 rounded-md py-2 px-6 text-white"
            onClick={handleAddTodo}
          >
            Add
          </button>
        </section>

        <section className="flex justify-center  ">
          <ul className="border-1 border-slate-400 border-solid rounded-md h-[calc(100vh_-_200px)]  w-96 my-6 px-4 py-4 bg-slate-50 overflow-y-auto ">
            {(!todos || todos.length === 0) && (
              <p className="italic text-slate-500 font-extralight text-sm  ">
                Add some tasks you would like to do today...
              </p>
            )}

            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-start  items-center gap-2 w-full mb-2 relative hover:bg-slate-200 p-2 rounded-sm hover:text-slate-600"
              >
                <input
                  type="checkbox"
                  id={todo.id.toString()}
                  className="mr-2 hover:cursor-pointer "
                  onClick={() => toggleStatus(todo.id)}
                />
                <label
                  htmlFor={todo.id.toString()}
                  className={`${
                    todo.isComplete ? "line-through text-slate-500" : ""
                  } hover:cursor-pointer`}
                >
                  {todo.title}
                </label>

                <button
                  onClick={() => handleRemoveTodo(todo.id)}
                  className="w-5 h-5 rounded-[50%] bg-rose-500 hover:bg-rose-600 text-white  flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2"
                >
                  &#x2715;
                </button>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}

export default App;
