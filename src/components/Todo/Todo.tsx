import { TODO } from "../../types";

type TODO_ITEM_PROPS = {
  todo: TODO;
  onUpdateTodo: (id: string) => void;
  onRemoveTodo: (id: string) => void;
};

const Todo = ({ todo, onUpdateTodo, onRemoveTodo }: TODO_ITEM_PROPS) => {
  return (
    <li
      key={todo._id}
      className="flex justify-start  items-center gap-2 w-full mb-2 relative hover:bg-slate-200 p-2 rounded-sm hover:text-slate-600 px-4 py-4"
    >
      <input
        type="checkbox"
        checked={!!todo.isComplete}
        id={todo._id.toString()}
        className="mr-2 hover:cursor-pointer "
        onClick={() => onUpdateTodo(todo._id)}
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
        onClick={() => onRemoveTodo(todo._id)}
        className="w-5 h-5 rounded-[50%] bg-rose-500 hover:bg-rose-600 text-white  flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2"
      >
        &#x2715;
      </button>
    </li>
  );
};

export default Todo;
