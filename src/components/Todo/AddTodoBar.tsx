import React, { useState } from "react";
import { Button } from "../Button";

type AddTodoProps = {
  onAddTodo: (todoInput: string) => void;
  isLoading: boolean;
};

const AddTodoBar = ({ onAddTodo, isLoading }: AddTodoProps) => {
  const [todoInput, setTodoInput] = useState("");

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value;
    setTodoInput(input);
  };

  const handleAddTodo = async () => {
    if (todoInput === "") return;

    await onAddTodo(todoInput);
    setTodoInput("");
  };

  return (
    <section className="max-w-full flex justify-center gap-2 mt-6">
      <input
        className=" border-slate-500 border-solid border-2 rounded-md p-2 "
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            return handleAddTodo();
          }
          return;
        }}
        value={todoInput}
        placeholder="Just do it!"
        disabled={isLoading}
      />
      <Button
        disabled={isLoading}
        onClick={handleAddTodo}
        isLoading={isLoading}
      >
        Add
      </Button>
    </section>
  );
};

export default AddTodoBar;
