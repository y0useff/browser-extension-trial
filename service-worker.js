console.log("service worker is servicing!")
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        fetch(`https://vidsrc.xyz/embed/movie?imdb=${request.id}`)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }
  );