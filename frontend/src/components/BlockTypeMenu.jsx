import React from 'react';
import { Type, Heading1, Heading2, Heading3, List, ListOrdered, CheckSquare, Code, AlertCircle } from 'lucide-react';

const BlockTypeMenu = ({ position, onSelect, onClose }) => {
  const blockTypes = [
    { type: 'text', label: 'Text', icon: Type, description: 'Plain text' },
    { type: 'heading1', label: 'Heading 1', icon: Heading1, description: 'Large heading' },
    { type: 'heading2', label: 'Heading 2', icon: Heading2, description: 'Medium heading' },
    { type: 'heading3', label: 'Heading 3', icon: Heading3, description: 'Small heading' },
    { type: 'bulletList', label: 'Bullet List', icon: List, description: 'Bulleted list' },
    { type: 'numberedList', label: 'Numbered List', icon: ListOrdered, description: 'Numbered list' },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'To-do item' },
    { type: 'code', label: 'Code', icon: Code, description: 'Code block' },
    { type: 'callout', label: 'Callout', icon: AlertCircle, description: 'Highlighted text' },
  ];
  
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg shadow-2xl w-80 max-h-96 overflow-y-auto"
        style={{ top: position.top, left: position.left }}
      >
        <div className="p-2">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
            Block Types
          </div>
          {blockTypes.map((blockType) => {
            const Icon = blockType.icon;
            return (
              <button
                key={blockType.type}
                onClick={() => onSelect(blockType.type)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#2f2f2f] transition-colors text-left"
              >
                <Icon className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="text-white text-sm font-medium">{blockType.label}</div>
                  <div className="text-xs text-gray-500">{blockType.description}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default BlockTypeMenu;