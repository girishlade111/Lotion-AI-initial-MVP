import React, { useState } from 'react';
import { Search as SearchIcon, FileText, Clock, Sparkles } from 'lucide-react';
import { Input } from '../components/ui/input';
import useStore from '../store/useStore';
import { Link } from 'react-router-dom';

const Search = () => {
  const [query, setQuery] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { pages } = useStore();
  
  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    // Simulate AI search
    setTimeout(() => {
      setAiAnswer(`Based on your workspace, here's what I found about "${query}": This is a mock AI-powered answer. In production, this would search through all your pages, projects, and meetings to provide relevant information.`);
      setIsSearching(false);
    }, 1500);
  };
  
  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(query.toLowerCase())
  );
  
  return (
    <div className="flex-1 bg-[#0f0f0f] overflow-y-auto">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Search</h1>
          <p className="text-gray-400 text-lg mb-8">
            Search your workspace or ask AI anything
          </p>
          
          <div className="flex gap-3">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="Search pages or ask AI..."
              className="flex-1 h-12 text-lg bg-[#191919] border-[#2f2f2f] text-white placeholder:text-gray-500"
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-6 h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-md font-medium transition-all"
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>
        
        {/* AI Answer */}
        {aiAnswer && (
          <div className="mb-12 bg-[#191919] rounded-xl p-6 border border-[#2f2f2f]">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">AI Answer</h3>
                <p className="text-sm text-gray-400">Generated from your workspace</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">{aiAnswer}</p>
          </div>
        )}
        
        {/* Search Results */}
        {query && (
          <div>
            <h2 className="text-white font-semibold mb-4">
              {filteredPages.length} results for "{query}"
            </h2>
            <div className="space-y-2">
              {filteredPages.map((page) => (
                <Link
                  key={page.id}
                  to={`/page/${page.id}`}
                  className="flex items-center gap-4 bg-[#191919] hover:bg-[#202020] rounded-lg p-4 border border-[#2f2f2f] hover:border-[#3f3f3f] transition-all group"
                >
                  <span className="text-2xl">{page.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-medium group-hover:text-purple-400 transition-colors">
                      {page.title}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Updated {new Date(page.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <FileText className="w-5 h-5 text-gray-600" />
                </Link>
              ))}
              
              {filteredPages.length === 0 && (
                <div className="bg-[#191919] rounded-lg p-8 border border-[#2f2f2f] text-center">
                  <SearchIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No pages found matching your search</p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Recent Searches or Suggestions */}
        {!query && (
          <div>
            <h2 className="text-white font-semibold mb-4">Suggested searches</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                'Meeting notes from last week',
                'Project updates',
                'AI-generated summaries',
                'Tasks due this week',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setQuery(suggestion)}
                  className="bg-[#191919] hover:bg-[#202020] rounded-lg p-4 border border-[#2f2f2f] hover:border-[#3f3f3f] transition-all text-left"
                >
                  <SearchIcon className="w-4 h-4 text-gray-500 mb-2" />
                  <p className="text-white text-sm">{suggestion}</p>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;