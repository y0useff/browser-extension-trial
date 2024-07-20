console.log("service worker is servicing!");
// (async () => {
//     const membershipStatus = (await (await fetch(`http://45.63.12.74/checkMembership?email=test123`)).json())
//     console.log(membershipStatus)
// })();
chrome.runtime.onMessage.addListener(
    async function(request, sender, sendResponse) {
        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})
        if (request.fetch == true ) {
            fetch(`https://vidsrc.xyz/embed/${request.type}?imdb=${request.titleId}&season=${request.season}&episode=${request.episode}`)
                .then((res) => {
                    console.log(res.status)
                    if (res.status == 404) return false;
                        //call content script to inject
                    (async () => {
                        const response = chrome.tabs.sendMessage(tab.id, {present: true, fetch: false});
                    })();
                })
                .catch((err) => {
                    console.log(err) //dont call content script
            })
        }

        


        // if (request.email) {
        //     console.log("sw received: " + request.email)
        //     // if (!(request.email).contains("@")) return chrome.tabs.sendMessage(tab.id, {membershipStatus: false})
        //     ///const membershipStatus = await (await fetch(`http://45.63.12.74/checkMembership?email=${request.email}`)).json()
        //     //return chrome.tabs.sendMessage(tab.id, {membershipStatus: membershipStatus});

        // }
        // if (request.url) {
        //     chrome.tabs.create({url: request.url})
        // }

    }
  );

  chrome.runtime.onMessage.addListener(
    async (request, sender, sendResponse) => {
        if (request.url) {
            chrome.tabs.create({url: request.url})
        }
    }
  )

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})   
    if (request.checkMembership == true) {
        fetch(`http://soap2daydownload.com/checkMembership?email=${request.email.email}`)
            .then(async (res) => {
                const status = (await res.text())
                if (status == "true") chrome.tabs.sendMessage(tab.id, {canDownload: true});
                if (status == "false") chrome.tabs.sendMessage(tab.id, {noMembership: true})
            })
    }
})