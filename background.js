// Import PapaParse library and data file
importScripts('PapaParse.min.js');
importScripts('data/h1b_20_21_22.js');
importScripts('data/exclusionlist.js');


// Initialize data source as empty array
const dataSource = [];
const exclusionListDataSource = [];
// Open a new tab with hello.html when extension is installed
chrome.runtime.onInstalled.addListener((details) => {
    console.log(details.id);
    console.log(details.previousVersion);
    console.log(details.reason);
    chrome.tabs.create({url: "https://ndsu.joinhandshake.com/stu/postings"}, (tab) => {
        console.log(`Created tab ${tab.id}`);
    });
    // chrome.tabs.create({url: chrome.runtime.getURL("hello.html")}, (tab) => {
    //     console.log(`Created tab ${tab.id}`);
    // });
});

// Parse CSV data and update tab on tab update
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    console.log(changeInfo.status);
    if (changeInfo.status === 'complete' && tab.active) {
        Papa.parse(csv, {
            header: true,
            complete: function (results) {
                Object.assign(dataSource, results);
            }
        });
        Papa.parse(otherNameCompanyList, {
            header: true,
            complete: function (results) {
                Object.assign(exclusionListDataSource, results);
            }
        });
        chrome.tabs.sendMessage(tabId, {message: 'TabUpdated'});
    }

});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.companyName);
    if (request.mode === 'single') {
        const results = findCompany(request.companyName);
        if (results.length == 0) return false;
        sendResponse(jsonToTable(JSON.stringify(results)));
    } else if (request.mode === 'search') {
        var searchResults = searchCompany(request.companyName);
        sendResponse(searchResults);
    } else {
        const found = findCompany(request.companyName).length > 0;
        sendResponse(found);
    }
    return true;
});

function searchCompany(searchString) {
    const searchResult = findCompany(searchString);

    if (searchResult && searchResult.length > 0)
        var employers = searchResult.map(m => m["Employer"])
    return employers;

}

// Find companies based on name and return results
function findCompany(name) {

    let matchType = 'exact';
    if (!name) return [];

    const exListResult = exclusionListDataSource.data.filter(data => data.Employer != undefined && data.Employer == (name));
    if (exListResult.length > 0) {
        name = exListResult[0]['OtherEmployerName'];
    }
    name = name.trim().toUpperCase().replace(/[,.\s]+/g, ' ').trim();
    if (name.includes('(')) {
        name = name.replace(/\([^)]*\)/g, '').trim();
    }
    if (name.startsWith('THE ')) {
        name = name.slice(4);
    } else if (name.endsWith(' COMPANY')) {
        name = name.slice(0, -8);
    } else if (name.endsWith(' INC')) {
        name = name.slice(0, -4);
    } else if (name.endsWith(' LIMITED')) {
        name = name.slice(0, -8);
    } else if (name.endsWith(' LTD')) {
        name = name.slice(0, -4);
    }

    let result = dataSource.data.filter(data => data.Employer != undefined && data.Employer.toUpperCase().includes(name) && data.Employer.toUpperCase().startsWith(name));

    if (result.length === 0 && name.toUpperCase().includes("'")) {
        name = name.replace(/'/g, "");
        result = dataSource.data.filter(data => data.Employer != undefined && data.Employer.includes(name) && data.Employer.startsWith(name));
    }

    if (result.length === 0 && name.toUpperCase().endsWith("S")) {
        name = name.slice(0, -1) + '';
        result = dataSource.data.filter(data => data.Employer != undefined && data.Employer.includes(name) && data.Employer.startsWith(name));
    }
    if (name.match(/[^\w\s]/gi)) {
        name = name.replace(/[^\w\s]/gi, "");
    }
    console.log(name + '-' + matchType + '-' + result.length);
    return result;
}

function jsonToTable(json) {
    const data = JSON.parse(json);
    const columns = Object.keys(data[0]);
    let table = `<thead><tr>${columns.map(column => `<th>${column}</th>`).join('')}</tr></thead><tbody>`;
    const dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
        const row = data[i];
        let rowString = "<tr>";
        for (const [key, value] of Object.entries(row)) {
            const cellValue = value != null ? value.toString().replace(/</g, '&lt;') : 'null';
            rowString += `<td><p>${cellValue}</p></td>`;
        }
        rowString += "</tr>";
        table += rowString;
    }
    table += "</tbody>";
    return table;
}
