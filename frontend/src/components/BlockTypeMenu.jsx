import React from 'react';
import { Type, Heading1, Heading2, Heading3, List, ListOrdered, CheckSquare, Code, AlertCircle, Quote, Minus, Table } from 'lucide-react';

const BlockTypeMenu = ({ position, onSelect, onClose }) => {
  const blockTypes = [
    { 
      category: 'Basic Blocks',
      items: [
        { type: 'text', label: 'Text', icon: Type, description: 'Plain text', shortcut: '' },
        { type: 'heading1', label: 'Heading 1', icon: Heading1, description: 'Large heading', shortcut: '# ' },
        { type: 'heading2', label: 'Heading 2', icon: Heading2, description: 'Medium heading', shortcut: '## ' },
        { type: 'heading3', label: 'Heading 3', icon: Heading3, description: 'Small heading', shortcut: '### ' },
      ]
    },
    {
      category: 'Lists',
      items: [
        { type: 'bulletList', label: 'Bullet List', icon: List, description: 'Bulleted list', shortcut: '- ' },
        { type: 'numberedList', label: 'Numbered List', icon: ListOrdered, description: 'Numbered list', shortcut: '1. ' },
        { type: 'checkbox', label: 'Checkbox', icon: CheckSquare, description: 'To-do item', shortcut: '[] ' },
      ]
    },
    {
      category: 'Advanced',
      items: [
        { type: 'quote', label: 'Quote', icon: Quote, description: 'Quote block', shortcut: '> ' },
        { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal line', shortcut: '---' },
        { type: 'code', label: 'Code', icon: Code, description: 'Code block', shortcut: '``` ' },
        { type: 'callout', label: 'Callout', icon: AlertCircle, description: 'Highlighted text', shortcut: '' },
        { type: 'table', label: 'Table', icon: Table, description: 'Table', shortcut: '' },
      ]
    }
  ];
  
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div
        className="fixed z-50 bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg shadow-2xl w-96 max-h-[500px] overflow-y-auto"
        style={{ top: position.top, left: position.left }}
      >
        <div className="p-2">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase">
            Block Types
          </div>
          
          {blockTypes.map((category) => (
            <div key={category.category} className="mb-2">
              <div className="px-3 py-1 text-xs font-medium text-gray-600">
                {category.category}
              </div>
              {category.items.map((blockType) => {
                const Icon = blockType.icon;
                return (
                  <button
                    key={blockType.type}
                    onClick={() => onSelect(blockType.type)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-[#2f2f2f] transition-colors text-left group"
                  >
                    <Icon className="w-5 h-5 text-gray-400" />
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{blockType.label}</div>
                      <div className="text-xs text-gray-500">{blockType.description}</div>
                    </div>
                    {blockType.shortcut && (
                      <div className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        {blockType.shortcut}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlockTypeMenu;