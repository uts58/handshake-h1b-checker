const HandShake = 'handshake';
const HandShakeCompanyNamesCSS = ["style__job-detail___NfvjZ"];

const writeLog = false;
let url = window.location.href;
var companyName = "";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (writeLog) console.log(request.message);

    if (request.message === 'TabUpdated') {
        if (writeLog) console.log(document.location.href);

        setTimeout(() => {
            removeOldElements();
            process();
            getDataForCompanies();
        }, 800);
    }
});

function removeOldElements() {
    const elementNames = ["hb_resultable", "hb_resultP", "myBtn", "myModal"];

    elementNames.forEach(name => {
        const elements = document.getElementsByName(name);
        if (elements.length > 0) {
            elements.forEach(el => el.remove());
        }
    });
}

let pageLoaded = false;
let tryCount = 0;

setTimeout(function () {
    try {
        initiate();
        pageLoaded = true;
    } catch (error) {
        pageLoaded = false;
        tryCount = tryCount + 1;
        while (pageLoaded === false && tryCount <= 5) {
            setTimeout(function () {
                initiate();
                pageLoaded = true;
            }, 1000);
        }
    }
}, 1000);

function getCompanyName() {
    try {
        if (url.includes(HandShake)) {
            let z1 = document.getElementsByClassName(HandShakeCompanyNamesCSS[0]);
            if (z1.length > 0) {
                companyName = z1[0].childNodes[0].textContent;
            }
        }
    } catch (error) {
        console.log(error)
    }

}

function initiate() {
    if (document.location.href.includes(HandShake)) {
    }
}

function process() {
    if (document.getElementsByName("hb_resultP").length > 0) {
        return;
    }
    removeOldElements();
    getCompanyName();
    console.log(companyName);
    if (companyName === undefined || companyName === "" || companyName == null) {
        console.log("Cannot Find Company Name")
        return;
    }
}

function getCompanyNameListElement() {
    let companyLi;
    if (url.includes(HandShake)) {
        for (const element of HandShakeCompanyNamesCSS) {
            companyLi = document.getElementsByClassName(element)
            if (companyLi.length > 0) {
                break;
            }
        }
    }
    return companyLi;
}

function getDataForCompanies(companyLi = null) {
    if (companyLi == null) {
        companyLi = getCompanyNameListElement();
    }
    for (let i = 0; i < companyLi.length; i++) {
        let name = companyLi[i].innerText.trim();

        chrome.runtime.sendMessage({
            companyName: name, mode: "single"
        }, function (response) {
            try {
                if (writeLog) console.log(response);
                let badge = document.createElement("span");
                badge.setAttribute("class", "h1bBadge");
                if (response === true) {
                    badge.setAttribute("sbadge", 'H1B Sponsor');
                } else {
                    badge.setAttribute("fbadge", 'Not a H1B Sponsor');
                }
                // console.log(name, badge);
            } catch (e) {
                console.log(e);
            }
        })
    }
}