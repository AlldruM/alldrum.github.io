document.addEventListener('DOMContentLoaded', function() {
    const repositoriesGrid = document.getElementById('repositories-grid');

    // «апрос к GitHub API дл€ получени€ репозиториев пользовател€
    fetch(`https://api.github.com/users/AlldruM/repos`)
        .then(response => response.json())
        .then(repositories => {
            repositories.forEach(repo => {
                const repoCard = document.createElement('div');
                repoCard.className = 'repository-card';

                repoCard.innerHTML = `
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'No description provided.'}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                `;

                repositoriesGrid.appendChild(repoCard);
            });
        })
        .catch(error => {
            console.error('Error fetching repositories:', error);
            repositoriesGrid.innerHTML = '<p>Failed to load repositories. Please try again later.</p>';
        });
});