import React, { useState } from 'react';
import { LayoutGrid, Plus, Pencil, Trash2 } from 'lucide-react';
import { Board } from '../types';

interface SidebarProps {
  boards: Board[];
  activeBoard: number;
  onBoardSelect: (id: number) => void;
  onAddBoard: () => void;
  onEditBoard: (id: number, title: string) => void;
  onDeleteBoard: (id: number) => void;
}

export function Sidebar({
  boards,
  activeBoard,
  onBoardSelect,
  onAddBoard,
  onEditBoard,
  onDeleteBoard
}: SidebarProps) {
  const [editingBoard, setEditingBoard] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');

  const handleEditStart = (board: Board) => {
    setEditingBoard(board.id);
    setEditValue(board.title);
  };

  const handleEditSave = (boardId: number) => {
    if (editValue.trim()) {
      onEditBoard(boardId, editValue.trim());
    }
    setEditingBoard(null);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <LayoutGrid className="h-6 w-6 text-blue-600" />
          <span className="text-xl font-semibold">TasksBoard</span>
        </div>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {boards.map(board => (
          <div
            key={board.id}
            className={`group relative flex items-center justify-between p-2 rounded-lg cursor-pointer mb-1 ${
              activeBoard === board.id
                ? 'bg-blue-50 text-blue-600'
                : 'hover:bg-gray-100'
            }`}
          >
            {editingBoard === board.id ? (
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={() => handleEditSave(board.id)}
                onKeyPress={(e) => e.key === 'Enter' && handleEditSave(board.id)}
                className="flex-1 px-2 py-1 border rounded mr-2"
                autoFocus
              />
            ) : (
              <>
                <div
                  className="flex items-center space-x-2 flex-1"
                  onClick={() => onBoardSelect(board.id)}
                >
                  <LayoutGrid className="h-5 w-5" />
                  <span>{board.title}</span>
                </div>
                <div className="hidden group-hover:flex items-center space-x-1">
                  <button
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditStart(board);
                    }}
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    className="p-1 hover:bg-gray-200 rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteBoard(board.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
        <button
          className="w-full flex items-center space-x-2 text-gray-700 hover:bg-gray-100 p-2 rounded-lg cursor-pointer mt-2"
          onClick={onAddBoard}
        >
          <Plus className="h-5 w-5" />
          <span>Add Board</span>
        </button>
      </div>
      <div className="mt-auto p-4 border-t border-gray-200">
        <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer mb-2">
          TasksBoard Premium pricing
        </div>
        <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer mb-2">
          Terms of service
        </div>
        <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer mb-2">
          Privacy policy
        </div>
        <div className="text-sm text-gray-600 hover:text-gray-900 cursor-pointer">
          Help
        </div>
      </div>
    </div>
  );
}