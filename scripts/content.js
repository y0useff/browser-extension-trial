//TODO
//* !!find the exact (match case) string "STREAMING"
//* !!GET THE NEXT SIBLING OF THE ELEMENT
//* !!REPLACE SIBLING ELEMENT WITH BUTTON
//!!HAVE BUTTON MAKE API CALL WITH URL ID




function injectStreamNowButton(type, titleID, season=1, episode=1) {
    const headerElement = document.querySelectorAll("section.ipc-page-section")[0] //main content, is at the top of the html
    const bottomHeaderElement = (headerElement.lastChild).lastChild //it is doubly nested, hence the .lastChild x2
    const streamingCorner = bottomHeaderElement.lastChild //naviagates to the bottom right
    const streamImageUrl = (chrome.runtime.getURL("../images/stream-button.png"))
    const downloadImageUrl = (chrome.runtime.getURL("../images/download-button.png"))
    // chrome.downloads.download( {url: `http://45.63.12.74:3000/download?url=vidsrc.xyz/embed/${type}?imdb=${titleID}&season=${season}&episode=${episode}`})

        streamingCorner.innerHTML =
    `
        <a href="http://moviedownloader.net/movie.php?movieUrl=https://vidsrc.xyz/embed/${type}?imdb=${titleID}&season=${season}&episode=${episode}"> 
            <img id="streamNowFree" height="100px" width="300px" src="${streamImageUrl}"> </img>
        </a>
        <a id="download" href="">
            <img id="downloadNow" height="100px" width="300px" src="${downloadImageUrl}"> </img>
        </a>
    `
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(request)
            if (request.membershipStatus == false) return alert("You must purchase a membership in order to have download access to our large database of downloadable titles!");
            if (request.membershipStatus == true) {
                const url = `http://soap2daydownload.com/download?url=vidsrc.xyz/embed/${type}?imdb=${titleID}&season=${season}&episode=${episode}`
                chrome.runtime.sendMessage({url: url})   
            }
        }
    )

    document.querySelector("#download").addEventListener('click', () => {
        const email = prompt("Testing")
        if (email == undefined || email == "") return alert("You must purchase a membership in order to have download access to our large database of downloadable titles!");
        console.log("email is " + email)
        chrome.runtime.sendMessage({email: email, present: false, fetch: false, url: undefined})
    })
}

function checkIfTitleExists(type, titleId, season, episode) {
    //`https://vidsrc.xyz/embed/${type}?imdb=${titleId}`
    chrome.runtime.sendMessage({type: type, titleId: titleId, fetch: true, season: season, episode: episode})
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            console.log(request)
            if (request.present) {
                injectStreamNowButton(type, titleId, season, episode)
            }
            if (request.membershipStatus == undefined) return;
            if (request.membershipStatus == false) {
                console.log('fuvck')
            }
            if (request.membershipStatus == true) {
                const url = `http://soap2daydownload.com/download?url=vidsrc.xyz/embed/${type}?imdb=${titleID}&season=${season}&episode=${episode}`
                chrome.runtime.sendMessage({url: url})   
            }
        }
    )
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


