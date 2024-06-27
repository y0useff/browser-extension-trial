console.log("service worker is servicing!")

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.fetch == true ) {
            console.log(request)
        
            fetch(`https://vidsrc.xyz/embed/${request.type}?imdb=${request.titleId}`)
                .then((res) => {
                    console.log(res.status)
                    if (res.status == 404) return false;
                        //call content script to inject
                    (async () => {
                        const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
                        const response = chrome.tabs.sendMessage(tab.id, {present: true, fetch: false});
                    })();
                })
                .catch((err) => {
                    console.log(err) //dont call content script
            })
        }
    }
  );