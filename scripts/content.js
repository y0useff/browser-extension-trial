

let titleURL;
let userEmail;
let type, titleId, season, episode;

function injectStreamNowButton(type, titleID, season=1, episode=1) {
    titleURL = `vidsrc.xyz/embed/${type}?imdb=${titleID}&season=${season}&episode=${episode}`
    const headerElement = document.querySelectorAll("section.ipc-page-section")[0] //main content, is at the top of the html
    const bottomHeaderElement = (headerElement.lastChild).lastChild //it is doubly nested, hence the .lastChild x2
    const streamingCorner = bottomHeaderElement.lastChild //naviagates to the bottom right
    const streamImageUrl = (chrome.runtime.getURL("../images/stream-button.png"))
    const downloadImageUrl = (chrome.runtime.getURL("../images/download-button.png"))
    // chrome.downloads.download( {url: `http://45.63.12.74:3000/download?url=vidsrc.xyz/embed/${type}?imdb=${titleID}&season=${season}&episode=${episode}`})

        streamingCorner.innerHTML =
    `
        <a href="http://moviedownloader.net/movie.php?movieUrl=https://${titleURL}"> 
            <img id="streamNowFree" height="100px" width="300px" src="${streamImageUrl}"> </img>
        </a>
        <a id="download" href="#">
            <img id="downloadNow" height="100px" width="300px" src="${downloadImageUrl}"> </img>
        </a>
    `


    document.querySelector("#download").addEventListener('click', () => {
        chrome.storage.local.get()
        .then((email) => {
            userEmail = email;
            checkMembership(email)
        })

    })
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    console.log(request.canDownload)
    console.log(request.noMembership)
    if (request.canDownload) {
        alert("insert code here to validate if content is in cdn")
        alert("insert code here to open download link")
    }
    if (request.noMembership) {
        alert("You must purchase a membership to utilize the download functionality of our platform! Purchase one from https://soap2daymovies.app/download")
        chrome.runtime.sendMessage({url: "https://soap2daymovies.app/download"})
    }
})

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request)
        if (request.present) {
            injectStreamNowButton(type, titleId, season, episode)
        }
    }
)


function checkMembership(email) {

    chrome.runtime.sendMessage({checkMembership: true, email: email})
}

function checkIfTitleExists(t, tId, s, e) {
    type = t;
    titleId = tId;
    season = s;
    episode = e;
    //`https://vidsrc.xyz/embed/${type}?imdb=${titleId}`
    chrome.runtime.sendMessage({type: type, titleId: titleId, fetch: true, season: season, episode: episode})

}


function getTitleID() {
    let url = window.location.href
    url = url.split("/")
    if (url[3] == "title") return url[4]

    // for (let node of document.querySelectorAll('li')) {
    //     if (node.textContent == "TV Series") injectStreamNowButton(true) // true means show
    // }
}

function isTvOrMovie() {
    const episode = document.querySelector('div[data-testid="hero-subnav-bar-season-episode-numbers-section"]')
    if (episode)  { //code for if tv episode 
        const titleId = ((episode.nextSibling.nextSibling).getAttribute('href')).split("/")[2]
        //we get a modified title ID of the entire show, if detected that this is an individual episode
        console.log("Episode!")
        const s = episode.textContent.split(".")[0]
        const ep = episode.textContent.split(".")[1]
        return checkIfTitleExists("tv", titleId, s.substring(1), ep.substring(1))
        //handle tv episode//season call
        //return at end
    }
    for (let node of document.querySelectorAll('li')) {
        if (node.textContent == "TV Series")return checkIfTitleExists("tv", getTitleID())
    }
    return checkIfTitleExists("movie", getTitleID())
}   

function main(){
    isTvOrMovie()
}

main()


