'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';

export default function Home() {
  const [name, setName] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background gradient spots */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(203,213,225)_1px,transparent_0)] bg-[size:20px_20px] opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgb(148,163,184)_1px,transparent_0)] bg-[size:40px_40px] opacity-10" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <main className="relative max-w-4xl mx-auto pt-16 sm:pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl font-semibold mb-6 text-slate-900 tracking-tight">
            Check Your Brand Name
          </h1>
          <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto font-normal">
            Analyze the cultural significance and potential implications of your brand name before committing to it.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="bg-white rounded-lg shadow-sm ring-1 ring-slate-900/5 p-6 mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your brand name"
              className="flex-1 px-4 py-2 rounded-md border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 text-black transition-all duration-200 placeholder:text-black-500"
              onKeyPress={(e) => e.key === 'Enter' && analyzeName()}
            />
            <button
              onClick={analyzeName}
              disabled={loading}
              className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] text-base shadow-sm"
            >
              {loading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Analyze'
              )}
            </button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 text-red-500 text-sm"
            >
              {error}
            </motion.p>
          )}
        </motion.div>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="bg-white rounded-lg shadow-sm ring-1 ring-slate-900/5 p-6"
          >
            <h2 className="text-xl font-semibold mb-4 text-slate-900">Analysis Results</h2>
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown
                className="text-slate-600 text-base leading-relaxed"
                components={{
                  p: ({ children }) => <p className="mb-4">{children}</p>,
                  strong: ({ children }) => <span className="font-medium text-slate-900">{children}</span>,
                  em: ({ children }) => <span className="italic text-slate-800">{children}</span>,
                  ul: ({ children }) => <ul className="list-disc pl-6 mb-4 marker:text-slate-400">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-6 mb-4 marker:text-slate-400">{children}</ol>,
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

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <p className="text-sm text-slate-600">Built by Alex Choi</p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            Links
          </button>
        </div>
      </footer>

      {/* Links Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl ring-1 ring-slate-900/5 p-6 w-full max-w-sm z-50 mx-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Links</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <a
                  href="https://github.com/alexechoi/check-the-name"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Alex Choi GitHub Repository
                </a>
                <a
                  href="https://alexchoi.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Alex Choi Portfolio
                </a>
                <a
                  href="https://x.com/alexchhk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Alex Choi X
                </a>
                <a
                  href="https://strollr.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Strollr
                </a>
                <a
                  href="https://meetinthemiddle.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Meet in the Middle app
                </a>
                <a
                  href="https://bloganywhe.re"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Blog Anywhere - AI Blog generator
                </a>
                <a
                  href="https://taxbot.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors"
                >
                  Taxbot IE - Irish Tax Advice
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
