// In-page cache of the user's options
const options = {};
const optionsForm = document.getElementById("optionsForm");

// Immediately persist options changes

console.log(optionsForm.saveEmail)
optionsForm.saveEmail.addEventListener("click", (event) => {
    chrome.storage.local.set({email: optionsForm.email.value})
    const email =  {
        email: optionsForm.email.value
    }
    
    chrome.runtime.sendMessage({checkMembership: true, email, continue: false})
    alert("Email Saved!")
})