// GitHub API configuration
const GITHUB_USERNAME = 'AlldruM';

// DOM Elements
const avatar = document.getElementById('avatar');
const username = document.getElementById('username');
const bio = document.getElementById('bio');
const aboutText = document.getElementById('about-text');
const totalStarsEl = document.getElementById('total-stars');
const totalReposEl = document.getElementById('total-repos');
const followersEl = document.getElementById('followers');
const repositoriesGrid = document.getElementById('repositories-grid');

// Language colors mapping
const languageColors = {
    'JavaScript': '#f1e05a',
    'Python': '#3572A5',
    'Java': '#b07219',
    'TypeScript': '#2b7489',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#239120',
    'Go': '#00ADD8',
    'Rust': '#dea584',
    'PHP': '#4F5D95',
    'Ruby': '#701516',
    'Swift': '#ffac45',
    'Kotlin': '#A97BFF',
    'Vue': '#41b883',
    'React': '#61dafb',
    'Shell': '#89e051',
    'PowerShell': '#012456'
};

// Fetch user profile
async function fetchUserProfile() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`);
        if (!response.ok) throw new Error('Failed to fetch user profile');
        
        const user = await response.json();
        
        // Update profile elements
        avatar.src = user.avatar_url;
        username.textContent = user.name || user.login;
        bio.textContent = user.bio;
        aboutText.textContent = user.bio 
            ? `Welcome to my portfolio! ${user.bio} Here you can explore my GitHub repositories and projects.`
            : `Welcome to my portfolio! I'm a developer passionate about creating amazing projects. Here you can explore my GitHub repositories.`;
        
        totalReposEl.textContent = user.public_repos.stargazers_count;
        followersEl.textContent = user.followers;
        
    } catch (error) {
        console.error('Error fetching user profile:', error);
        bio.textContent = 'Developer';
        aboutText.textContent = 'Welcome to my portfolio! Here you can explore my GitHub repositories and projects.';
    }
}

// Fetch repositories and calculate total stars
async function fetchRepositories() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        if (!response.ok) throw new Error('Failed to fetch repositories');
        
        const repositories = await response.json();
        
        // Calculate total stars
        const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        totalStarsEl.textContent = totalStars;

        // Clear loading message
        repositoriesGrid.innerHTML = '';
        
        // Display repositories
        if (repositories.length === 0) {
            repositoriesGrid.innerHTML = '<div class="loading">No repositories found.</div>';
            return;
        }
        
        repositories.forEach(repo => {
            const repoCard = createRepoCard(repo);
            repositoriesGrid.appendChild(repoCard);
        });
        
    } catch (error) {
        console.error('Error fetching repositories:', error);
        repositoriesGrid.innerHTML = '<div class="loading">Failed to load repositories. Please try again later.</div>';
    }
}


// Create repository card element
function createRepoCard(repo) {
    const card = document.createElement('div');
    card.className = 'repository-card';
    
    const languageColor = languageColors[repo.language] || '#ff6b6b';
    const languageHtml = repo.language 
        ? `<div class="repo-language"><span class="language-dot" style="background: ${languageColor}"></span>${repo.language}</div>`
        : '';
    
    card.innerHTML = `
        <h3>${repo.name}</h3>
        <p>${repo.description || 'No description provided.'}</p>
        ${languageHtml}
        <div class="repo-stats">
            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
        </div>
        <a href="${repo.html_url}" target="_blank">
            <i class="fab fa-github"></i> View Repository
        </a>
    `;
    
    return card;
}


// Initialize
async function init() {
    await fetchUserProfile();
    await fetchRepositories();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
