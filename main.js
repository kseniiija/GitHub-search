const searchForm = document.forms.searchForm
const search = document.querySelector(".search-input")

searchForm.addEventListener("submit", getGithubUser) 
let userData = {}

function getGithubUser(event) {
    event.preventDefault()

    try {

        const url = `https://api.github.com/users/${search.value}`

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.login) {
                    console.log(data)
                    userData = data
                    renderToDOM()
                }
                userData = {}
            })
            .catch(err => {
                console.log(err)
            })

    } catch (error) {
        console.log({
            error
        })
    }
}

// display selectors 
const fullName = document.querySelector(".full-name")
const avatar = document.querySelector(".avatar")
const username = document.querySelector(".username")
const locationName = document.querySelector(".location")
const bio = document.querySelector(".bio")
const link = document.querySelector(".link")
const company = document.querySelector(".company")

function renderToDOM() {
    fullName.innerText = userData.name
    avatar.src = userData.avatar_url
    username.innerText=userData.login
    locationName.innerText = userData.location

    // if user bio exist, show bio, else, show no bio message
    if (userData.bio) {
        if (userData.bio.length > 0) {
            bio.innerText = userData.bio
        } else {
            bio.innerText = "This profile has no bio"
        }
    }
    link.innerText = userData.blog
    company.innerText = userData.company
}