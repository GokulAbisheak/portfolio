// GitHub API utility functions

/**
 * Fetches GitHub repositories with proper authentication
 * @param {string} username - GitHub username
 * @param {Object} options - Fetch options
 * @returns {Promise<Array>} - Array of repositories
 */
export async function fetchGitHubRepos(username, options = {}) {
  const {
    sort = 'stars',
    direction = 'desc',
    per_page = 100,
    page = 1
  } = options;

  // Use environment variable for GitHub token if available
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=${sort}&direction=${direction}&per_page=${per_page}&page=${page}`,
      { headers }
    );

    if (!response.ok) {
      // Handle rate limiting
      if (response.status === 403) {
        const resetTime = response.headers.get('X-RateLimit-Reset');
        const resetDate = resetTime ? new Date(parseInt(resetTime) * 1000) : null;
        
        throw new Error(
          `GitHub API rate limit exceeded. ${
            resetDate ? `Resets at ${resetDate.toLocaleTimeString()}` : ''
          }`
        );
      }
      
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    // Return empty array instead of throwing to prevent app crashes
    return [];
  }
}

/**
 * Fetches GitHub user profile data
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} - User profile data
 */
export async function fetchGitHubProfile(username) {
  const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  
  const headers = {
    'Accept': 'application/vnd.github.v3+json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      { headers }
    );

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
} 