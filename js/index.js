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
                document.querySelector('#user-list').innerHTML = ''
                let userList = data.items;
                userList.forEach(user => displaySearchResults(user))
            })

    })
}

function displaySearchResults(user) {
    const ul = document.querySelector('#user-list')
    const userName = document.createElement('li'); //li
          userName.className = 'user-name'
          userName.textContent = `${user.login}`
    const userInfo = document.createElement('div') //div
    const avatar = document.createElement('img') //img
          avatar.className = 'user-avatar'
          avatar.src = `${user.avatar_url}`

    userInfo.append(avatar)
    userName.appendChild(userInfo)
    ul.appendChild(userName)
    
}