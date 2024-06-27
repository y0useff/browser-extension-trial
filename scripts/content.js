//TODO
//* !!find the exact (match case) string "STREAMING"
//* !!GET THE NEXT SIBLING OF THE ELEMENT
//* !!REPLACE SIBLING ELEMENT WITH BUTTON
//!!HAVE BUTTON MAKE API CALL WITH URL ID




function injectStreamNowButton(type) {
    const headerElement = document.querySelectorAll("section.ipc-page-section")[0] //main content, is at the top of the html
    const bottomHeaderElement = (headerElement.lastChild).lastChild //it is doubly nested, hence the .lastChild x2
    const streamingCorner = bottomHeaderElement.lastChild //naviagates to the bottom right
    const titleID = getTitleID()
    return streamingCorner.innerHTML =
    `
    <span>
        <h1> Stream Now For Free!
        <br />
        <button onClick="window.location.href='http://moviedownloader.net/movie.php?movieUrl=https://vidsrc.xyz/embed/${type}?imdb=${titleID}'" id="streamNowFree">
            STREAM NOW
        </button>
    </span>
    `
}

function checkIfTitleExists(type, titleId) {
    //`https://vidsrc.xyz/embed/${type}?imdb=${titleId}`
    chrome.runtime.sendMessage({type, titleId, fetch: true})
    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            if (request.present) return injectStreamNowButton(type)
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
    for (let node of document.querySelectorAll('li')) {
        if (node.textContent == "TV Series") checkIfTitleExists("TV Series", getTitleID())
    }
    checkIfTitleExists("movie", getTitleID())
}   

function main(){
    isTvOrMovie()
}

main()


