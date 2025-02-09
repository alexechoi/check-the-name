'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

export default function Home() {
  const [name, setName] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const analyzeName = async () => {
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analyze-name`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name.trim() }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze name');
      }

      setAnalysis(data.analysis);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze name');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-white p-4 sm:p-8">
      <main className="max-w-4xl mx-auto pt-12 sm:pt-20 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            Check Your Brand Name
          </h1>
          <p className="text-slate-700 dark:text-black-200 text-lg sm:text-xl max-w-2xl mx-auto font-light">
            Analyze the cultural significance and potential implications of your brand name before committing to it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="bg-white dark:bg-slate-900/90 rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-8 mb-12 backdrop-blur-sm"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your brand name"
              className="flex-1 px-6 py-4 rounded-xl border border-slate-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg transition-all duration-200 placeholder:text-slate-400"
              onKeyPress={(e) => e.key === 'Enter' && analyzeName()}
            />
            <button
              onClick={analyzeName}
              disabled={loading}
              className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px] text-lg shadow-lg hover:shadow-xl disabled:hover:shadow-none"
            >
              {loading ? (
                <div className="h-6 w-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Analyze'
              )}
            </button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="bg-white dark:bg-slate-900/90 rounded-2xl shadow-xl ring-1 ring-slate-900/5 p-8 backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold mb-6 text-slate-900 dark:text-white">Analysis Results</h2>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              <ReactMarkdown
                className="text-slate-700 dark:text-slate-200 text-lg leading-relaxed"
                components={{
                  p: ({ children }) => <p className="mb-4">{children}</p>,
                  strong: ({ children }) => <span className="font-semibold">{children}</span>,
                  em: ({ children }) => <span className="italic">{children}</span>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4">{children}</ol>,
                  li: ({ children }) => <li className="mb-2">{children}</li>
                }}
                remarkPlugins={[remarkBreaks, remarkGfm]}
              >
                {analysis}
              </ReactMarkdown>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
