/* eslint-disable @typescript-eslint/no-explicit-any */
import { Profiler, useCallback, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./components/Input/Loader";
import Button from "./components/Button";

type TODOS = {
  _id: string;
  title: string;
  isComplete: boolean;
}[];

type IS_LOADING = {
  fetching: boolean;
  adding: boolean;
  deleting: boolean;
  updating: boolean;
};

function App() {
  const [todoInput, setTodoInput] = useState("");

  const [todos, setTodos] = useState<TODOS>([]);

  const [isLoading, setIsLoading] = useState<IS_LOADING>({
    fetching: false,
    adding: false,
    deleting: false,
    updating: false,
  });

  // const getLocalStorageTodos = () => {
  //   const lStorageTodos = localStorage.getItem("todos");
  //   if (lStorageTodos) {
  //     setTodos(JSON.parse(lStorageTodos));
  //   }
  // };

  const getTodos = async () => {
    try {
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, fetching: true }));
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      console.log(data);
      setTodos(data?.payload);
    } catch (e) {
      console.log(e);
      toast.error("Sorry, couldn't fetch todos");
    } finally {
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, fetching: false }));
    }
  };

  const updateTodos = (todos: TODOS) => {
    setTodos(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  useEffect(() => {
    // get todos from local storage
    // getLocalStorageTodos();

    // if user logged in get data from db
    getTodos();
  }, []);

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setTodoInput(input);
  };

  const handleAddTodo = useCallback(async () => {
    try {
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, adding: true }));

      const newTodo = { title: todoInput, isComplete: false };

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });

      console.log(res);

      const data = await res.json();

      console.log(data);

      const updatedTodos = [...todos, data.payload];

      updateTodos(updatedTodos);
      setTodoInput("");

      toast.success("Successfully added todo");
    } catch (e) {
      console.log(e);

      toast.error("Something went wrong, couldn't add todo");
    } finally {
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, adding: false }));
    }
  }, [todoInput, todos, updateTodos]);

  const handleRemoveTodo = async (todoId: string) => {
    try {
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, updating: true }));

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todos/${todoId}`,
        { method: "DELETE" }
      );

      const data = await res.json();

      console.log(data);

      toast.success("Successfully removed the todo item");

      setTodos((todos) => {
        return todos.filter((todo) => todo._id !== data.payload._id);
      });
    } catch (e) {
      console.log(e);

      toast.error("Something went wrong, could not delete");
    } finally {
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, updating: false }));
    }
  };

  const toggleStatus = async (todoId: string) => {
    try {
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, updating: true }));

      // use Map?
      const updatedTodo = todos.find((todo) => todo._id === todoId);
      if (!updatedTodo) return;

      const reqBody = { isComplete: !updatedTodo.isComplete };

      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/todos/${todoId}`,
        {
          method: "PUT",
          body: JSON.stringify(reqBody),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Sorry, failed to update the todo"
        );
      }

      const data = await res.json();

      setTodos((todos) => {
        return todos.map((todo) =>
          todo._id === data.data._id ? data.data : todo
        );
      });
      // updateTodos(data);
    } catch (e) {
      console.log(e);
      toast.error("Could not update the todo");
    } finally {
      setIsLoading((prevIsLoading) => ({ ...prevIsLoading, updating: false }));
    }
  };

  function onRender(
    id: any,
    phase: any,
    actualDuration: any,
    baseDuration: any,
    startTime: any,
    commitTime: any
  ) {
    console.log(id, phase, actualDuration, baseDuration, startTime, commitTime);
  }

  return (
    <Profiler id="a" onRender={onRender}>
      <ErrorBoundary fallback={<div>Sorry some error Occured</div>}>
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
              <Button onClick={handleAddTodo} isLoading={isLoading.adding}>
                Add
              </Button>
            </section>

            <section className="flex justify-center relative my-4">
              {(isLoading.updating || isLoading.fetching) && (
                <Loader className="absolute top-1/2 left1/2 -translate-1/2 z-10" />
              )}
              <section
                className={`border-1 border-slate-400 border-solid rounded-md h-[calc(100vh_-_200px)]  w-96  bg-slate-50 overflow-y-auto relative ${
                  isLoading.updating ? "pointer-events-none opacity-50" : ""
                }`}
              >
                <ul className="relative">
                  {isLoading.fetching && (
                    <p className="px-4 py-4">Loading...</p>
                  )}

                  {(!Array.isArray(todos) || !todos || todos.length === 0) && (
                    <p className="italic text-slate-500 font-extralight text-sm px-4 py-4 ">
                      Add some tasks you would like to do today...
                    </p>
                  )}

                  {Array.isArray(todos) &&
                    todos.map((todo) => (
                      <li
                        key={todo._id}
                        className="flex justify-start  items-center gap-2 w-full mb-2 relative hover:bg-slate-200 p-2 rounded-sm hover:text-slate-600 px-4 py-4"
                      >
                        <input
                          type="checkbox"
                          checked={!!todo.isComplete}
                          id={todo._id.toString()}
                          className="mr-2 hover:cursor-pointer "
                          onClick={() => toggleStatus(todo._id)}
                        />
                        <label
                          htmlFor={todo._id.toString()}
                          className={`${
                            todo.isComplete ? "line-through text-slate-500" : ""
                          } hover:cursor-pointer`}
                        >
                          {todo.title}
                        </label>

                        <button
                          onClick={() => handleRemoveTodo(todo._id)}
                          className="w-5 h-5 rounded-[50%] bg-rose-500 hover:bg-rose-600 text-white  flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2"
                        >
                          &#x2715;
                        </button>
                      </li>
                    ))}
                </ul>
              </section>
            </section>
          </article>
          <Toaster />
        </main>
      </ErrorBoundary>
    </Profiler>
  );
}

export default App;
