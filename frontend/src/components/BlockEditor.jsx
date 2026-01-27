import React, { useState, useRef, useEffect } from 'react';
import { Plus, GripVertical, MoreHorizontal, Trash2, Copy } from 'lucide-react';
import BlockTypeMenu from './BlockTypeMenu';
import AIBlockMenu from './AIBlockMenu';

const BlockEditor = ({ blocks = [], onChange }) => {
  const [focusedBlockId, setFocusedBlockId] = useState(null);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showAIMenu, setShowAIMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [selectedText, setSelectedText] = useState('');
  
  useEffect(() => {
    if (blocks.length === 0) {
      addBlock('text');
    }
  }, []);
  
  const addBlock = (type = 'text', index = blocks.length, focusAfter = true) => {
    const newBlock = {
      id: Date.now().toString(),
      type,
      content: '',
      checked: type === 'checkbox' ? false : undefined,
    };
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    onChange(newBlocks);
    
    // Focus the new block after a short delay
    if (focusAfter) {
      setTimeout(() => {
        const inputs = document.querySelectorAll('input[type="text"], textarea');
        if (inputs[index + 1]) {
          inputs[index + 1].focus();
        }
      }, 50);
    }
  };
  
  const updateBlock = (blockId, updates) => {
    const newBlocks = blocks.map(block =>
      block.id === blockId ? { ...block, ...updates } : block
    );
    onChange(newBlocks);
  };
  
  const deleteBlock = (blockId) => {
    if (blocks.length > 1) {
      onChange(blocks.filter(block => block.id !== blockId));
    }
  };
  
  const handleKeyDown = (e, blockId, index) => {
    const block = blocks[index];
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      
      // If current block is empty and is a list/checkbox, convert to text
      if (e.target.value === '' && ['bulletList', 'numberedList', 'checkbox'].includes(block.type)) {
        updateBlock(blockId, { type: 'text' });
        return;
      }
      
      // Continue the same block type for lists and checkboxes
      if (block.type === 'bulletList') {
        addBlock('bulletList', index);
      } else if (block.type === 'numberedList') {
        addBlock('numberedList', index);
      } else if (block.type === 'checkbox') {
        addBlock('checkbox', index);
      } else {
        addBlock('text', index);
      }
    } else if (e.key === 'Backspace' && e.target.value === '') {
      e.preventDefault();
      
      // If it's a list/checkbox, convert to text first before deleting
      if (['bulletList', 'numberedList', 'checkbox'].includes(block.type)) {
        updateBlock(blockId, { type: 'text' });
      } else if (blocks.length > 1) {
        deleteBlock(blockId);
        // Focus previous block
        setTimeout(() => {
          const inputs = document.querySelectorAll('input[type="text"], textarea');
          if (inputs[index - 1]) {
            inputs[index - 1].focus();
          }
        }, 50);
      }
    } else if (e.key === '/' && e.target.value === '') {
      e.preventDefault();
      const rect = e.target.getBoundingClientRect();
      setMenuPosition({ top: rect.bottom, left: rect.left });
      setShowTypeMenu(true);
      setFocusedBlockId(blockId);
    } else if (e.key === 'ArrowUp' && index > 0) {
      // Move to previous block
      const inputs = document.querySelectorAll('input[type="text"], textarea');
      if (inputs[index - 1]) {
        inputs[index - 1].focus();
      }
    } else if (e.key === 'ArrowDown' && index < blocks.length - 1) {
      // Move to next block
      const inputs = document.querySelectorAll('input[type="text"], textarea');
      if (inputs[index + 1]) {
        inputs[index + 1].focus();
      }
    }
  };
  
  const handleTextSelect = (e, blockId) => {
    const selection = window.getSelection();
    const text = selection.toString();
    
    if (text.length > 0) {
      setSelectedText(text);
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setMenuPosition({ top: rect.bottom + 5, left: rect.left });
      setShowAIMenu(true);
    } else {
      setShowAIMenu(false);
    }
  };
  
  const renderBlock = (block, index) => {
    const baseClasses = "w-full bg-transparent text-gray-300 border-none outline-none resize-none placeholder:text-gray-600";
    
    const blockProps = {
      value: block.content || '',
      onChange: (e) => updateBlock(block.id, { content: e.target.value }),
      onKeyDown: (e) => handleKeyDown(e, block.id, index),
      onFocus: () => setFocusedBlockId(block.id),
      onMouseUp: (e) => handleTextSelect(e, block.id),
      placeholder: getPlaceholder(block.type),
      className: baseClasses,
    };
    
    switch (block.type) {
      case 'heading1':
        return <input {...blockProps} className={`${baseClasses} text-3xl font-bold`} />;
      case 'heading2':
        return <input {...blockProps} className={`${baseClasses} text-2xl font-bold`} />;
      case 'heading3':
        return <input {...blockProps} className={`${baseClasses} text-xl font-semibold`} />;
      case 'bulletList':
        return (
          <div className="flex gap-2">
            <span className="text-gray-500 mt-1">•</span>
            <input {...blockProps} className={baseClasses} />
          </div>
        );
      case 'numberedList':
        return (
          <div className="flex gap-2">
            <span className="text-gray-500 mt-1">{index + 1}.</span>
            <input {...blockProps} className={baseClasses} />
          </div>
        );
      case 'checkbox':
        return (
          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              checked={block.checked || false}
              onChange={(e) => updateBlock(block.id, { checked: e.target.checked })}
              className="w-4 h-4 rounded border-gray-600 bg-[#2f2f2f] text-purple-500"
            />
            <input {...blockProps} className={`${baseClasses} ${block.checked ? 'line-through text-gray-500' : ''}`} />
          </div>
        );
      case 'code':
        return (
          <textarea
            {...blockProps}
            rows={4}
            className={`${baseClasses} bg-[#1a1a1a] rounded-lg p-3 font-mono text-sm border border-[#2f2f2f]`}
          />
        );
      case 'callout':
        return (
          <div className="bg-[#1a1a1a] border border-[#2f2f2f] rounded-lg p-4 flex gap-3">
            <span className="text-2xl">💡</span>
            <input {...blockProps} className={baseClasses} />
          </div>
        );
      default:
        return <input {...blockProps} />;
    }
  };
  
  const getPlaceholder = (type) => {
    const placeholders = {
      text: 'Type / for commands',
      heading1: 'Heading 1',
      heading2: 'Heading 2',
      heading3: 'Heading 3',
      bulletList: 'List item',
      numberedList: 'List item',
      checkbox: 'To-do',
      code: 'Code block',
      callout: 'Callout text',
    };
    return placeholders[type] || 'Type something...';
  };
  
  return (
    <div className="space-y-2">
      {blocks.map((block, index) => (
        <div
          key={block.id}
          className="group flex gap-2 items-start hover:bg-[#191919]/50 rounded-md p-2 -mx-2 transition-colors"
        >
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="p-1 hover:bg-[#2f2f2f] rounded">
              <GripVertical className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={() => addBlock('text', index)}
              className="p-1 hover:bg-[#2f2f2f] rounded"
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="flex-1">
            {renderBlock(block, index)}
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => deleteBlock(block.id)}
              className="p-1 hover:bg-[#2f2f2f] rounded text-gray-600 hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
      
      {/* Block Type Menu */}
      {showTypeMenu && (
        <BlockTypeMenu
          position={menuPosition}
          onSelect={(type) => {
            if (focusedBlockId) {
              updateBlock(focusedBlockId, { type });
            } else {
              addBlock(type);
            }
            setShowTypeMenu(false);
            setFocusedBlockId(null);
          }}
          onClose={() => {
            setShowTypeMenu(false);
            setFocusedBlockId(null);
          }}
        />
      )}
      
      {/* AI Menu */}
      {showAIMenu && selectedText && (
        <AIBlockMenu
          position={menuPosition}
          selectedText={selectedText}
          onClose={() => setShowAIMenu(false)}
        />
      )}
    </div>
  );
};

export default BlockEditor;