import { useDispatch, useSelector } from "react-redux";
import { AddTodo, RemoveTodo, EditTodo } from "../App/createSlice";
import { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const Todo = () => {
  const [add, Setadd] = useState("");
  const [edit, SetEdit] = useState(null);
  const [editText, SetEditText] = useState("");

  const dispacth = useDispatch();
  const Todos = useSelector((state) => state.todo.value);

  const Addbutton = () => {
    alert("Please add something in the input field.");
  };

  const handleAdd = () => {
    if (add.trim() === "") {
      Addbutton();
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: add,
    };
    dispacth(AddTodo(newTodo));
    Setadd("");
  };

  const handleRemove = (id) => {
    dispacth(RemoveTodo(id));
  };

  const handleEdit = (id, text) => {
    SetEdit(id);
    SetEditText(text);
  };

  const handleSaveEdit = () => {
    if (editText.trim() === "") return;
    dispacth(EditTodo({ id: edit, text: editText }));
    SetEdit(null);
    SetEditText("");
  };

  return (
    <>
      <div className="bg-sky-100 p-6 rounded shadow-md w-full max-w-md ml-80 mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Todo App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={add}
            onChange={(e) => Setadd(e.target.value)}
            placeholder="Add something..."
            className="flex-grow p-2 border rounded bg-white"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <ul>
          {Todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-200 p-2 mb-2 rounded"
            >
              {edit === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => SetEditText(e.target.value)}
                  className="flex-grow p-2 border rounded bg-white"
                />
              ) : (
                todo.text
              )}

              <div className="flex gap-2">
                {edit === todo.id ? (
                  <button
                    onClick={handleSaveEdit}
                    className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                )}

                <button
                  onClick={() => handleRemove(todo.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Todo;
