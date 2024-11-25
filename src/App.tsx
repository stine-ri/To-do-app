import React, { useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const handleAddTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
    setNewTask("");
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleUpdateTask = (id: number) => {
    const updatedText = prompt(
      "Update your task:",
      tasks.find((task) => task.id === id)?.text || ""
    );
    if (updatedText !== null && updatedText.trim()) {
      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, text: updatedText.trim() } : task
        )
      );
    }
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "active"
      ? tasks.filter((task) => !task.completed)
      : tasks.filter((task) => task.completed);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center mb-4">TODO</h1>
        {/* Input Section */}
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Currently typing"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-2 border rounded-lg"
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        {/* Task List */}
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-2 border rounded-lg"
            >
              <span
                className={`flex-grow ${
                  task.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {task.text}
              </span>
              <button
                onClick={() => handleToggleComplete(task.id)}
                className={`${
                  task.completed
                    ? "text-green-500 hover:text-green-700"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                ✔️
              </button>
              <button
                onClick={() => handleUpdateTask(task.id)}
                className="text-yellow-500 hover:text-yellow-700"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
        {/* Footer Section */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-sm text-gray-500">
            {tasks.filter((task) => !task.completed).length} items left
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`${
                filter === "all" ? "font-bold underline" : ""
              } text-blue-500 hover:underline`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("active")}
              className={`${
                filter === "active" ? "font-bold underline" : ""
              } text-blue-500 hover:underline`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`${
                filter === "completed" ? "font-bold underline" : ""
              } text-blue-500 hover:underline`}
            >
              Completed
            </button>
          </div>
          <button
            onClick={handleClearCompleted}
            className="text-red-500 hover:underline"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
