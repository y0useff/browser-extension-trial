//TODO
//* !!find the exact (match case) string "STREAMING"
//* !!GET THE NEXT SIBLING OF THE ELEMENT
//* !!REPLACE SIBLING ELEMENT WITH BUTTON
//!!HAVE BUTTON MAKE API CALL WITH URL ID


function injectStreamNowButton(type) {
    const headerElement = document.querySelectorAll("section.ipc-page-section")[0] //main content, is at the top of the html
    const bottomHeaderElement = (headerElement.lastChild).lastChild //it is doubly nested, hence the .lastChild x2
    const streamingCorner = bottomHeaderElement.lastChild //naviagates to the bottom right
    return streamingCorner.innerHTML =
    `
    <span>
        <h1> Stream Now For Free!
        <br />
        <button onClick="window.location.href='http://moviedownloader.net/movie.php?movieUrl=https://vidsrc.xyz/embed/${type}?imdb=${getTitleID()}'" id="streamNowFree">
            STREAM NOW
        </button>
    </span>
    `

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
        if (node.textContent == "TV Series") return injectStreamNowButton("tv") // true means show
    }
    injectStreamNowButton("movie")

}   

function main(){
    isTvOrMovie()
}

main()


