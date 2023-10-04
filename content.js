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
    if (companyName === undefined || companyName === "" || companyName == null) {
        console.log("Cannot Find Company Name");
    }
}

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

function getCompanyNameListElement() {
    let companyDivs = document.getElementsByClassName(HandShakeCompanyNamesCSS[0]);
    let companyLi = [];
    for (let div of companyDivs) {
        let span = div.querySelector('span:nth-child(1) > span');
        if (span) {
            companyLi.push(span);
        }
    }
    return companyLi;
}

function getDataForCompanies(companyLi = getCompanyNameListElement()) {

    companyLi.forEach((element, index) => {

        const companyName = element.textContent;

        chrome.runtime.sendMessage({
            companyName: companyName,
            mode: "list"
        }, (response) => {

            if (writeLog) console.log(response);

            if (!element.parentElement.querySelector('.h1bBadge')) {

                const badge = document.createElement("span");
                badge.classList.add("h1bBadge");
                const badgeType = response ? "sbadge" : "fbadge";
                const badgeText = response ? 'H1B Sponsor' : 'Not H1B';

                badge.setAttribute(badgeType, badgeText);

                // Insert the badge just before the closing </span> tag
                const elementHTML = element.outerHTML;
                const updatedHTML = elementHTML.replace("</span>", ` ${badge.outerHTML}</span>`);

                element.outerHTML = updatedHTML;
            }

        });
    });
}


