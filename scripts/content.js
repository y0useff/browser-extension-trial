//TODO
//* !!find the exact (match case) string "STREAMING"
//* !!GET THE NEXT SIBLING OF THE ELEMENT
//* !!REPLACE SIBLING ELEMENT WITH BUTTON
//!!HAVE BUTTON MAKE API CALL WITH URL ID

function injectStreamNowButton() {
    const headerElement = document.querySelectorAll("section.ipc-page-section")[0] //main content, is at the top of the html
    const bottomHeaderElement = (headerElement.lastChild).lastChild //it is doubly nested, hence the .lastChild x2
    const streamingCorner = bottomHeaderElement.lastChild //naviagates to the bottom right
    streamingCorner.innerHTML = 
    `
    <span>
        <h1> Stream Now For Free!
        <br />
        <button id="streamNowFree">
            STREAM
        </button>
    </span>
    `
}

