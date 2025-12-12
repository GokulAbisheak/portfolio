"use client"

import React, { useState, useEffect } from 'react';
import { FaGithub, FaStar, FaCodeBranch, FaEye, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';
import { fetchGitHubRepos } from '@/utils/github';
import Head from 'next/head';

const Projects = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // all, starred, forked
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(6);
  const [sortBy, setSortBy] = useState('stars');
  const [sortDirection, setSortDirection] = useState('desc');

  useEffect(() => {
    const loadRepos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchGitHubRepos('GokulAbisheak', {
          sort: sortBy,
          direction: sortDirection,
          per_page: 100
        });
        
        if (data.length === 0) {
          setError('No repositories found or API rate limit exceeded.');
        } else {
          setRepos(data);
        }
      } catch (err) {
        setError(err.message || 'Failed to load repositories');
      } finally {
        setLoading(false);
      }
    };

    loadRepos();
  }, [sortBy, sortDirection]);

  // Filter repositories based on selected filter
  const filteredRepos = repos.filter(repo => {
    if (filter === 'starred') return repo.stargazers_count > 0;
    if (filter === 'forked') return repo.fork;
    return true;
  });

  // Sort repositories based on selected sort criteria
  const sortedRepos = [...filteredRepos].sort((a, b) => {
    if (sortBy === 'stars') {
      return sortDirection === 'desc' 
        ? b.stargazers_count - a.stargazers_count 
        : a.stargazers_count - b.stargazers_count;
    } else if (sortBy === 'forks') {
      return sortDirection === 'desc' 
        ? b.forks_count - a.forks_count 
        : a.forks_count - b.forks_count;
    } else if (sortBy === 'updated') {
      return sortDirection === 'desc' 
        ? new Date(b.updated_at) - new Date(a.updated_at) 
        : new Date(a.updated_at) - new Date(b.updated_at);
    } else if (sortBy === 'name') {
      return sortDirection === 'desc' 
        ? b.name.localeCompare(a.name) 
        : a.name.localeCompare(b.name);
    }
    return 0;
  });

  // Calculate pagination
  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = sortedRepos.slice(indexOfFirstRepo, indexOfLastRepo);
  const totalPages = Math.ceil(sortedRepos.length / reposPerPage);

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortDirection('desc');
    }
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Get sort icon
  const getSortIcon = (field) => {
    if (sortBy !== field) return <FaSort className="ml-1" />;
    return sortDirection === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Generate structured data for SEO
  const generateStructuredData = () => {
    const projectItems = currentRepos.map(repo => ({
      "@type": "SoftwareApplication",
      "name": repo.name,
      "description": repo.description || "No description provided",
      "url": repo.html_url,
      "applicationCategory": "DeveloperApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Person",
        "name": "Gokul Abisheak"
      },
      "datePublished": repo.created_at,
      "dateModified": repo.updated_at
    }));

    return {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": projectItems.map((item, index) => ({
        "@type": "ListItem",
        "position": indexOfFirstRepo + index + 1,
        "item": item
      }))
    };
  };

  return (
    <>
      <Head>
        <title>Projects | Gokul Abisheak</title>
        <meta name="description" content="Explore the projects of Gokul Abisheak, a Software Engineer specializing in full-stack development, DevOps, and cloud technologies." />
        <link rel="canonical" href="https://gokulabisheak.dev/#projects" />
      </Head>
      
      <div id="projects" className="min-h-screen w-full bg-slate-900 px-3 md:px-5 lg:px-8 py-20">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-12">My Projects</h1>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => {
                setFilter('all');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === 'all' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => {
                setFilter('starred');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === 'starred' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Starred
            </button>
            <button
              onClick={() => {
                setFilter('forked');
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                filter === 'forked' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Forks
            </button>
          </div>
          
          {/* Sort buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => handleSortChange('stars')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center cursor-pointer ${
                sortBy === 'stars' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Stars {getSortIcon('stars')}
            </button>
            <button
              onClick={() => handleSortChange('forks')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center cursor-pointer ${
                sortBy === 'forks' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Forks {getSortIcon('forks')}
            </button>
            <button
              onClick={() => handleSortChange('updated')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center cursor-pointer ${
                sortBy === 'updated' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Updated {getSortIcon('updated')}
            </button>
            <button
              onClick={() => handleSortChange('name')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center cursor-pointer ${
                sortBy === 'name' 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              Name {getSortIcon('name')}
            </button>
          </div>
          
          {/* Loading state */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          )}
          
          {/* Error state */}
          {error && (
            <div className="bg-red-900/50 text-red-300 p-4 rounded-lg mb-8">
              <p>{error}</p>
              <p className="text-sm mt-2">
                If this is a rate limit issue, please try again later or add a GitHub token to your environment variables.
              </p>
            </div>
          )}
          
          {/* Projects grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentRepos.map((repo) => (
                <div 
                  key={repo.id} 
                  className="bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-semibold text-white">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-teal-500 transition-colors cursor-pointer"
                      >
                        {repo.name}
                      </a>
                    </h2>
                    {repo.fork && (
                      <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded">
                        Fork
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {repo.description || 'No description provided'}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    {repo.language && (
                      <span className="flex items-center gap-1">
                        <span className="w-3 h-3 rounded-full bg-teal-500"></span>
                        {repo.language}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      {repo.stargazers_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCodeBranch className="text-blue-500" />
                      {repo.forks_count}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaEye className="text-purple-500" />
                      {repo.watchers_count}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <a 
                      href={repo.html_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-teal-500 hover:text-teal-400 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <FaGithub />
                      <span>View on GitHub</span>
                    </a>
                    {repo.homepage && (
                      <a 
                        href={repo.homepage} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-teal-500 hover:text-teal-400 transition-colors cursor-pointer"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 space-x-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg ${
                  currentPage === 1
                    ? 'bg-slate-800 text-gray-500 cursor-not-allowed'
                    : 'bg-slate-800 text-white hover:bg-slate-700 cursor-pointer'
                }`}
              >
                <HiChevronLeft />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg cursor-pointer ${
                    currentPage === page
                      ? 'bg-teal-500 text-white'
                      : 'bg-slate-800 text-white hover:bg-slate-700'
                  }`}
                >
                  {page}
                </button>
              ))}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg ${
                  currentPage === totalPages
                    ? 'bg-slate-800 text-gray-500 cursor-not-allowed'
                    : 'bg-slate-800 text-white hover:bg-slate-700 cursor-pointer'
                }`}
              >
                <HiChevronRight />
              </button>
            </div>
          )}
          
          {/* Empty state */}
          {!loading && !error && filteredRepos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-300">No projects found matching your filter.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Structured data for SEO */}
      {!loading && !error && currentRepos.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateStructuredData())
          }}
        />
      )}
    </>
  );
};

export default Projects; 