document.addEventListener('DOMContentLoaded', () => {
    fetchSearchResults()
})

function fetchSearchResults() {
    document.querySelector('#github-form').addEventListener('submit', event => {
        event.preventDefault()
        const input = event.target[0].value

        fetch(`https://api.github.com/search/users?q=${input}`)
            .then(res => res.json())
            .then(data => {
                document.querySelector('#user-list').innerHTML = '' //wipe previous search results when a new search is performed
                let userList = data.items;
                userList.forEach(user => displaySearchResults(user))
            })
    })
}

function displaySearchResults(user) {
    const userList = document.querySelector('#user-list')
    const userName = document.createElement('li'); //li
          userName.className = 'user-name'
          userName.textContent = `${user.login}`
    const userInfo = document.createElement('div') //div
    const avatar = document.createElement('img') //img
          avatar.className = 'user-avatar'
          avatar.src = `${user.avatar_url}`
    const profileLink = document.createElement('a') //a
          profileLink.setAttribute('href', `${user.html_url}`)
          profileLink.textContent = 'GitHub Profile'

    userInfo.append(avatar, profileLink)
    userName.appendChild(userInfo)
    userList.appendChild(userName)

    avatar.addEventListener('click', () => {
        window.scrollTo(0, 0);
        let login = userName.textContent.split('GitHub Profile')[0];
        fetch(`https://api.github.com/users/${login}/repos`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('#repos-list').innerHTML = ''
            data.forEach(repo => {
                const repoList = document.querySelector('#repos-list');
                const repoName = document.createElement('li'); //li
                      repoName.className = 'repo-name'
                      repoName.textContent = `Repo Name: ${repo.name}`
                const repoInfo = document.createElement('div') //div
                const repoUser = document.createElement('p') //p
                      repoUser.textContent = `User: ${repo.owner.login}`
                const description = document.createElement('p') //p
                if (repo.description) {
                    description.textContent = `Description: ${repo.description}`
                } else {
                    description.textContent = 'Description: N/A'
                }
                const language = document.createElement('p')
                      language.textContent = `Language: ${repo.language}`
                const repoLink = document.createElement('a')
                      repoLink.setAttribute('href', `${repo.html_url}`)
                      repoLink.textContent = `Link: ${repo.html_url}`

            repoInfo.append(repoUser, description, language, repoLink)
            repoName.appendChild(repoInfo)
            repoList.appendChild(repoName)
                })
            })
            .catch(error => console.log(error))
    })
    
};

