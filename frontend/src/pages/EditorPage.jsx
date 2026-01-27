import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MoreHorizontal, Share2, Sparkles } from 'lucide-react';
import useStore from '../store/useStore';
import BlockEditor from '../components/BlockEditor';
import AIAssistant from '../components/AIAssistant';
import { Button } from '../components/ui/button';

const EditorPage = () => {
  const { pageId } = useParams();
  const navigate = useNavigate();
  const { pages, currentPage, setCurrentPage, updatePage } = useStore();
  const [showAI, setShowAI] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [pageIcon, setPageIcon] = useState('📄');
  const [blocks, setBlocks] = useState([]);
  
  useEffect(() => {
    const page = pages.find(p => p.id === pageId);
    if (page) {
      setCurrentPage(page);
      setPageTitle(page.title);
      setPageIcon(page.icon);
      setBlocks(page.content || []);
    }
  }, [pageId, pages]);
  
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setPageTitle(newTitle);
    if (pageId) {
      updatePage(pageId, { title: newTitle, updatedAt: new Date().toISOString() });
    }
  };
  
  const handleBlocksChange = (newBlocks) => {
    setBlocks(newBlocks);
    if (pageId) {
      updatePage(pageId, { content: newBlocks, updatedAt: new Date().toISOString() });
    }
  };
  
  return (
    <div className="flex-1 bg-[#0f0f0f] overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#0f0f0f]/80 backdrop-blur-lg border-b border-[#2f2f2f]">
        <div className="max-w-4xl mx-auto px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/')}
              className="p-1.5 hover:bg-[#2f2f2f] rounded-md transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-gray-400" />
            </button>
            <span className="text-sm text-gray-500">Back to Home</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowAI(!showAI)}
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-[#2f2f2f]"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Assistant
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white hover:bg-[#2f2f2f]"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <button className="p-1.5 hover:bg-[#2f2f2f] rounded-md transition-colors">
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Editor Container */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Page Icon & Title */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <button className="text-6xl hover:bg-[#2f2f2f] rounded-lg p-2 transition-colors">
              {pageIcon}
            </button>
          </div>
          <input
            type="text"
            value={pageTitle}
            onChange={handleTitleChange}
            placeholder="Untitled"
            className="w-full text-4xl font-bold text-white bg-transparent border-none outline-none placeholder:text-gray-700"
          />
        </div>
        
        {/* Block Editor */}
        <BlockEditor blocks={blocks} onChange={handleBlocksChange} />
      </div>
      
      {/* AI Assistant Panel */}
      {showAI && (
        <AIAssistant onClose={() => setShowAI(false)} />
      )}
    </div>
  );
};

export default EditorPage;