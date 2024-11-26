import React from "react";
import { MoreVertical, Plus, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { Task, List } from "../types";

interface TaskListProps {
  list: List;
  onToggleTask: (taskId: number) => void;
  onAddTask: (listId: number) => void;
  onEditTask: (taskId: number, title: string) => void;
  onDeleteTask: (taskId: number) => void;
  onEditList: (title: string) => void;
  onDeleteList: () => void;
}

export function TaskList({
  list,
  onToggleTask,
  onAddTask,
  onEditTask,
  onDeleteTask,
  onEditList,
  onDeleteList,
}: TaskListProps) {
  const [isEditing, setIsEditing] = React.useState<number | null>(null);
  const [editValue, setEditValue] = React.useState("");
  const [isEditingTitle, setIsEditingTitle] = React.useState(false);
  const [titleValue, setTitleValue] = React.useState(list.title);
  const [showActions, setShowActions] = React.useState(false);

  const handleEditTask = (taskId: number, currentTitle: string) => {
    setIsEditing(taskId);
    setEditValue(currentTitle);
  };

  const handleSaveTask = (taskId: number) => {
    if (editValue.trim()) {
      onEditTask(taskId, editValue.trim());
    }
    setIsEditing(null);
  };

  const handleSaveTitle = () => {
    if (titleValue.trim()) {
      onEditList(titleValue.trim());
    }
    setIsEditingTitle(false);
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center relative">
        {isEditingTitle ? (
          <input
            type="text"
            value={titleValue}
            onChange={e => setTitleValue(e.target.value)}
            onBlur={handleSaveTitle}
            onKeyPress={e => e.key === "Enter" && handleSaveTitle()}
            className="text-lg font-semibold px-2 py-1 border rounded"
            autoFocus
          />
        ) : (
          <h2
            className="text-lg font-semibold cursor-pointer hover:text-blue-600"
            onClick={() => setIsEditingTitle(true)}
          >
            {list.title}
          </h2>
        )}
        <div className="relative">
          <button
            className="p-1 hover:bg-gray-100 rounded"
            onClick={() => setShowActions(!showActions)}
          >
            <MoreVertical className="h-5 w-5 text-gray-600" />
          </button>
          {showActions && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                  onClick={() => setIsEditingTitle(true)}
                >
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit List
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                  onClick={onDeleteList}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete List
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <button
          className="w-full text-left text-blue-600 hover:bg-blue-50 p-2 rounded-lg flex items-center space-x-2"
          onClick={() => onAddTask(list.id)}
        >
          <Plus className="h-4 w-4" />
          <span>Add a task</span>
        </button>
        <div className="mt-4 space-y-2">
          {list.tasks.map(task => (
            <div
              key={task.id}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg group"
            >
              {isEditing === task.id ? (
                <input
                  type="text"
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onBlur={() => handleSaveTask(task.id)}
                  onKeyPress={e => e.key === "Enter" && handleSaveTask(task.id)}
                  className="flex-1 px-2 py-1 border rounded mr-2"
                  autoFocus
                />
              ) : (
                <div
                  className="flex items-center space-x-3 flex-1 cursor-pointer"
                  onClick={() => onToggleTask(task.id)}
                >
                  <CheckCircle2
                    className={`h-5 w-5 ${
                      task.completed
                        ? "text-green-500 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                  <span
                    className={`${
                      task.completed
                        ? "text-gray-400 line-through"
                        : "text-gray-700"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
              )}
              <div className="opacity-0 group-hover:opacity-100 flex space-x-1">
                <button
                  className="p-1 hover:bg-gray-200 rounded"
                  onClick={() => handleEditTask(task.id, task.title)}
                >
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  className="p-1 hover:bg-gray-200 rounded"
                  onClick={() => onDeleteTask(task.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
