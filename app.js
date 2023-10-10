const API_URL = 'https://api.github.com/users/';


const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');


async function getUser(username) {
    try {
        const { data } = await axios(API_URL + username)
        //console.log(data)
        createUserCard(data);
        getRepos(username);

    } catch (error) {
        createErrorCard("Sorry, the username you were looking for was not found. :( ");
    }
};

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const user = search.value;

    if (user) {
        getUser(user)

        search.value = ''
    }
});

function createUserCard(user) {

    const userName = user.name || user.login;
    const userBio = user.bio ? `<p>${user.bio}</p>` : "";

    const cardHTML = `

    <div class="card">
    <img src=${user.avatar_url} class="user-image" alt=${user.name}>
    <div class="user-info">
        <div class="user-name">
            <h2>${userName}</h2>
            <small>${user.login}</small>
        </div>
    </div>

    <p>${userBio}</p>
    
    <ul>
        <li>
          <i class="fa-solid fa-user-group"></i> ${user.followers} <br>
          <strong>Followers</strong>
        </li>
        <li>${user.following}<br><strong>Following</strong></li>
        <li>
          <i class="fa-solid fa-bookmark"></i> ${user.public_repos}<br><strong>Repository</strong>
        </li>
      </ul>
        <h4 > ${userName}'s Repos </h4>
    <div class="repos" id="repos"></div>
</div>
    
    `;
    main.innerHTML = cardHTML;
}

const createErrorCard = (msg) => {
    const cardErrorHTML = `
    <div class="card">
        <h2> ${msg} </h2>
    </div>
    
    
    `;

    main.innerHTML = cardErrorHTML;
}

const getRepos = async (username) => {
    try {
        const { data } = await axios(API_URL + username + "/repos")
        addReposToCard(data)
    } catch (error) {
        createErrorCard("Sorry, there was an error pulling the Repos :(")
    }
};


function addReposToCard(repos) {
    const reposEl = document.getElementById('repos');

    repos.slice(0, 6).map((repo) => {
        const reposLink = document.createElement('a')
        reposLink.href = repo.html_url;
        reposLink.target = "_blank";
        reposLink.innerHTML = `
        
        <i class="fa-solid fa-book-bookmark"></i>${repo.name}
        
        `
        reposEl.appendChild(reposLink);
    })

};