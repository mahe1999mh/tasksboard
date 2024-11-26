import React, { useState } from 'react';
import { Search, Settings, Plus } from 'lucide-react';
import { TaskList } from './components/TaskList';
import { Sidebar } from './components/Sidebar';
import { Board, List, Task } from './types';

function App() {
  const [boards, setBoards] = useState<Board[]>([
    {
      id: 1,
      title: 'Main Board',
      lists: [
        {
          id: 1,
          title: 'DSA',
          tasks: [
            { id: 1, title: 'Stacks', completed: false },
            { id: 2, title: 'Queues', completed: false },
            { id: 3, title: 'Hash Table', completed: false },
          ]
        },
        {
          id: 2,
          title: 'ALGORITHMS',
          tasks: [
            { id: 4, title: 'Sorting', completed: false },
            { id: 5, title: 'Bit Manipulation', completed: false },
            { id: 6, title: 'In-Order', completed: false },
          ]
        }
      ]
    }
  ]);

  const [activeBoard, setActiveBoard] = useState(1);
  const [nextId, setNextId] = useState(7);

  const addBoard = () => {
    const newBoard: Board = {
      id: Date.now(),
      title: 'New Board',
      lists: []
    };
    setBoards([...boards, newBoard]);
  };

  const editBoard = (boardId: number, newTitle: string) => {
    setBoards(boards.map(board =>
      board.id === boardId ? { ...board, title: newTitle } : board
    ));
  };

  const deleteBoard = (boardId: number) => {
    if (boards.length > 1) {
      const newBoards = boards.filter(board => board.id !== boardId);
      setBoards(newBoards);
      if (activeBoard === boardId) {
        setActiveBoard(newBoards[0].id);
      }
    }
  };

  const addList = () => {
    setBoards(boards.map(board => {
      if (board.id === activeBoard) {
        const newList: List = {
          id: Date.now(),
          title: 'New List',
          tasks: []
        };
        return {
          ...board,
          lists: [...board.lists, newList]
        };
      }
      return board;
    }));
  };

  const addTask = (listId: number) => {
    setBoards(boards.map(board => {
      if (board.id === activeBoard) {
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id === listId) {
              const newTask: Task = {
                id: nextId,
                title: 'New Task',
                completed: false
              };
              setNextId(nextId + 1);
              return {
                ...list,
                tasks: [...list.tasks, newTask]
              };
            }
            return list;
          })
        };
      }
      return board;
    }));
  };

  const toggleTask = (listId: number, taskId: number) => {
    setBoards(boards.map(board => {
      if (board.id === activeBoard) {
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                tasks: list.tasks.map(task =>
                  task.id === taskId ? { ...task, completed: !task.completed } : task
                )
              };
            }
            return list;
          })
        };
      }
      return board;
    }));
  };

  const editTask = (listId: number, taskId: number, newTitle: string) => {
    setBoards(boards.map(board => {
      if (board.id === activeBoard) {
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                tasks: list.tasks.map(task =>
                  task.id === taskId ? { ...task, title: newTitle } : task
                )
              };
            }
            return list;
          })
        };
      }
      return board;
    }));
  };

  const deleteTask = (listId: number, taskId: number) => {
    setBoards(boards.map(board => {
      if (board.id === activeBoard) {
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.id === listId) {
              return {
                ...list,
                tasks: list.tasks.filter(task => task.id !== taskId)
              };
            }
            return list;
          })
        };
      }
      return board;
    }));
  };

  const editList = (listId: number, newTitle: string) => {
    setBoards(boards.map(board =>
      board.id === activeBoard
        ? {
            ...board,
            lists: board.lists.map(list =>
              list.id === listId ? { ...list, title: newTitle } : list
            )
          }
        : board
    ));
  };

  const deleteList = (listId: number) => {
    setBoards(boards.map(board =>
      board.id === activeBoard
        ? {
            ...board,
            lists: board.lists.filter(list => list.id !== listId)
          }
        : board
    ));
  };

  const currentBoard = boards.find(board => board.id === activeBoard);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <Sidebar
        boards={boards}
        activeBoard={activeBoard}
        onBoardSelect={setActiveBoard}
        onAddBoard={addBoard}
        onEditBoard={editBoard}
        onDeleteBoard={deleteBoard}
      />

      <div className="flex-1">
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex-1 max-w-2xl relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentBoard?.lists.map(list => (
              <TaskList
                key={list.id}
                list={list}
                onToggleTask={(taskId) => toggleTask(list.id, taskId)}
                onAddTask={() => addTask(list.id)}
                onEditTask={(taskId, title) => editTask(list.id, taskId, title)}
                onDeleteTask={(taskId) => deleteTask(list.id, taskId)}
                onEditList={(title) => editList(list.id, title)}
                onDeleteList={() => deleteList(list.id)}
              />
            ))}
            
            <div 
              className="bg-white bg-opacity-60 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center h-[200px] cursor-pointer hover:bg-opacity-100 transition-all"
              onClick={addList}
            >
              <div className="text-center">
                <Plus className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600">Add new list</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;