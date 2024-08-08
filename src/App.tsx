import { useState } from "react";

type TODO = {
  id: number;
  title: string;
}[];

function App() {
  const [todoInput, setTodoInput] = useState("");

  const [todos, setTodos] = useState<TODO>([]);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    console.log(input);
    setTodoInput(input);
  };

  const handleAddTodo = () => {
    const id = Math.floor(Date.now() - Math.random() * 1000);
    // TODO: use uuid later

    const newTodo = { id, title: todoInput };

    console.log(id);
    console.log(newTodo);
    setTodos((prevTodos) => [...prevTodos, newTodo]);
    setTodoInput("");
  };

  const handleRemoveTodo = (todoId: number) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  return (
    <main className="max-h-screen">
      <article className="flex justify-Hello tcenter flex-col px-6 py-4 ">
        <h1 className="text-center text-slate-700">TODO</h1>

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

        <section className="flex justify-center ">
          <ul className="border-1 border-slate-400 border-solid rounded-md min-h-[calc(100vh_-_200px)] w-96 my-6 px-6 py-4 bg-slate-50 ">
            {(!todos || todos.length === 0) && (
              <p className="italic text-slate-800">
                Add some tasks you would like to do today...
              </p>
            )}

            {todos.map((todo) => (
              <li
                key={todo.id}
                className="flex justify-start  items-center gap-2 w-full mb-2 relative"
              >
                <input
                  type="checkbox"
                  id={todo.id.toString()}
                  className="mr-2"
                />
                <label htmlFor={todo.id.toString()}>{todo.title}</label>

                <button
                  onClick={() => handleRemoveTodo(todo.id)}
                  className="w-5 h-5 rounded-[50%] bg-rose-500 text-white flex items-center justify-center absolute right-0 top-1/2 -translate-y-1/2"
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
