var writeLog = false;
var companyName = "";
var url = (window.location.href);

const emptyTableResponse = "<thead><tr></tr></thead><tbody></tbody>";
const failMessage = " did NOT file H-1B in last couple of years.";
const successMessage = " did file H-1B in last couple of years.";

const LinkedIn = 'linkedin';
const LinkedInCompanyNames = ["job-card-container__link job-card-container__company-name ember-view", "job-card-container__primary-description", "job-card-container__company-name", "result-card__subtitle-link job-result-card__subtitle-link"];
const LinkedInSelectedCompanyName = '.job-details-jobs-unified-top-card__primary-description';

const Glassdoor = 'glassdoor';
const GlassdoorCompanyNames = ["css-8wag7x", "job-search-8wag7x"]; //"jobInfoItem jobTitle"; // css-10l5u4p e1n63ojh0 jobLink
//const GlassdoorSelectedCompanyName = ; // feature not there

const HandShake = 'handshake';
const HandShakeCompanyNames = ["style__job-detail___NfvjZ"]; //"jobInfoItem jobTitle"; // css-10l5u4p e1n63ojh0 jobLink


const Indeed = 'indeed';
const IndeedComapnyNames = "companyName";

const Simplify = 'simplify';
const SimplifyJobsName = ""

const Google = 'google';
const googleCompanyNames = ["vNEEBe"]
const GoogleSelectedCompanyName = "nJlQNd sMzDkb";


// if (url.includes(LinkedIn)) {
//   createFloatingButton();
//   /*initiate the autocomplete function on the "myInput" element, and pass along the countries array as possible autocomplete values:*/
// autocomplete(document.getElementById("h1bSearchInput"));
// }

//#region Float Button
function createFloatingButton() {


    // const container = document.createElement("div");
    // container.id = "autocomplete-container";
    // const form = document.createElement("form");
    // form.autocomplete = "off";

    const searchContainer = document.createElement("div");
    searchContainer.classList.add("search");

    // const input = document.createElement("input");
    // input.id = "h1bSearchInput";
    // input.type = "text";
    // input.name = "h1bSearchBox";
    // input.placeholder = "Atleast 4 letters...";

    const input = document.createElement("input");
    input.id = "h1bSearchInput";
    input.type = "search";
    input.classList.add("search-box");
    input.placeholder = "Atleast 4 letters...";

    // const searchButton = document.createElement("input");
    // searchButton.id = "h1bSearchBtn"
    // searchButton.type = "button";
    // searchButton.value = "Search";

    const searchButton = document.createElement("span");
    searchButton.classList.add("search-button");

    const searchIcon = document.createElement("span");
    searchIcon.classList.add("search-icon");
    searchButton.appendChild(searchIcon);

    searchButton.addEventListener("click", () => {
        searchButton.parentElement.classList.toggle('open');
        // Show the text box and search button
        if (input.value.length > 3) {
            chrome.runtime.sendMessage({
                companyName: input.value, mode: "single"
            }, function (response) {
                console.log(response);
                showResult(response);
                //if (url.includes(Glassdoor)) {
                var el = document.getElementsByName("hb_resultable");
                el[0].innerHTML = response;
                var modal = document.getElementById("myModal");
                modal.style.display = "block";
                //}
            });
        }
    });


    // form.appendChild(input);
    // form.appendChild(searchButton);

    // container.appendChild(form);
    const spanText = document.createElement("span");
    spanText.innerText = "Search H1b Employers";

    searchContainer.appendChild(input);
    searchContainer.appendChild(searchButton);
    searchContainer.appendChild(spanText);

    document.body.appendChild(searchContainer);

    //document.body.appendChild(container);
    //////////////////////////
    // const searchContainer1 = document.createElement("div");
    // searchContainer1.classList.add("search");

    // const searchInput1 = document.createElement("input");
    // searchInput1.type = "search";
    // searchInput1.classList.add("search-box");

    // const searchButton1 = document.createElement("span");
    // searchButton1.classList.add("search-button");

    // const searchIcon1 = document.createElement("span");
    // searchIcon1.classList.add("search-icon");
    // searchButton1.appendChild(searchIcon1);

    // searchContainer1.appendChild(searchInput1);
    // searchContainer1.appendChild(searchButton1);

    // document.body.appendChild(searchContainer1);
    // autocomplete(searchInput1);
}

//#endregion

//#region AutoComplete
function autocomplete(inp) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        if (val.length < 5) return;

        chrome.runtime.sendMessage({
            companyName: val, mode: "search"
        }, function (response) {
            if (writeLog) console.log(response);
            const arr = response;
            /*close any already open lists of autocompleted values*/
            closeAllLists();
            if (!val) {
                return false;
            }
            currentFocus = -1;
            /*create a DIV element that will contain the items (values):*/
            a = document.createElement("DIV");
            a.setAttribute("id", inp.id + "autocomplete-list");
            a.setAttribute("class", "autocomplete-items");
            /*append the DIV element as a child of the autocomplete container:*/
            inp.parentNode.appendChild(a);
            /*for each item in the array...*/
            for (i = 0; i < arr.length; i++) {
                /*check if the item starts with the same letters as the text field value:*/
                if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    /*create a DIV element for each matching element:*/
                    b = document.createElement("DIV");
                    /*make the matching letters bold:*/
                    b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i].substr(val.length);
                    /*insert a input field that will hold the current array item's value:*/
                    b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {
                        /*insert the value for the autocomplete text field:*/
                        inp.value = this.getElementsByTagName("input")[0].value;
                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });
                    a.appendChild(b);
                }
            }
        });


    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

//#endregion


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (writeLog) console.log(request.message)
    if (request.message === 'TabUpdated') {
        if (writeLog) console.log(document.location.href);

        setTimeout(function () {
            removeOldElements();
            process();
            getDataForCompanies();
        }, 800);

    }
})

var pageLoaded = false;
var tryCount = 0;

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
    if (document.location.href.includes(Glassdoor)) {
    } else if (document.location.href.includes(LinkedIn)) {
    } else if (document.location.href.includes(Indeed)) {
    } else if (document.location.href.includes(HandShake)) {
    }
}

function process() {

    if (document.getElementsByName("hb_resultP").length > 0) {
        return;
    }
    removeOldElements();
    getCompanyName();
    console.log(companyName);
    if (companyName === undefined || companyName == "" || companyName == null) {
        console.log("Cannot Find Company Name")
        return;
    }
    if (!url.includes(Glassdoor)) {
        getData();
    }
}

function removeOldElements() {
    if (document.getElementsByName("hb_resultable").length > 0) {
        var elem = document.getElementsByName("hb_resultable")
        for (var i = 0; i <= elem.length; i++) {
            if (elem[i]) elem[i].remove();
        }

    }
    if (document.getElementsByName("hb_resultP").length > 0) {
        var elem = document.getElementsByName("hb_resultP")
        for (var i = 0; i <= elem.length; i++) {
            elem[i].remove();
        }
    }
    if (document.getElementsByName("myBtn").length > 0) {
        var elem = document.getElementsByName("myBtn")
        for (var i = 0; i <= elem.length; i++) {
            elem[i].remove();
        }
    }
    if (document.getElementsByName("myModal").length > 0) {
        var elem = document.getElementsByName("myModal")
        for (var i = 0; i <= elem.length; i++) {
            if (elem[i]) elem[i].remove();
        }
    }
}

function getCompanyName() {
    try {
        var try1 = '';
        var try2 = '';

        if (url.includes(Google)) {
            const employerName = document.getElementsByClassName(GoogleSelectedCompanyName);
            if (employerName) {
                companyName = employerName.textContent;
                return;
            }
        }
        if (url.includes(HandShake)) {
            try1 = "style__employer-name___54lqg";
            let z1 = document.getElementsByClassName(try1);
            if (z1.length > 0) {
                companyName = z1[0].childNodes[0].textContent;
            }
        }
        if (url.includes(Glassdoor)) {
            const employerName = document.querySelector('[data-test="employerName"]');
            if (employerName) {
                companyName = employerName.textContent;
                return;
            }


            //    try1 = "employerName";
            try1 = "css-l2wjgv e1n63ojh0 jobLink";
            try2 = "jobs-details-top-card__company-url";
            var z1 = document.getElementsByClassName(try1)
            var z2 = document.getElementsByClassName(try2)

            if (z1.length > 0) {
                if (writeLog) console.log(z1)
                companyName = z1[0].childNodes[0].textContent;

            } else if (z2.length > 0) {
                if (writeLog) console.log(z2)
                companyName = z2[0].innerText;
            }

        } else if (url.includes(LinkedIn)) {

            try1 = "topcard__org-name-link";
            try2 = "jobs-details-top-card__company-url";
            try3 = "ember-view t-black t-normal";
            var z1 = document.getElementsByClassName(try1)
            var z2 = document.getElementsByClassName(try2)
            var z3 = document.getElementsByClassName(try3)
            if (z1.length > 0) {
                if (writeLog) console.log(z1)
                companyName = z1[0].innerText;

            } else if (z2.length > 0) {
                if (writeLog) console.log(z2)
                companyName = z2[0].innerText;
            } else if (z3.length > 0) {
                if (writeLog) console.log(z3)
                companyName = z3[0].innerText;
            } else {
                //let element = document.querySelector('.jobs-unified-top-card__primary-description');
                let element = document.querySelector(LinkedInSelectedCompanyName);

                const companyNameElement = element.querySelector('div > a');

                if (companyNameElement) companyName = companyNameElement.textContent;
                //companyName = element.querySelector('a').textContent;

            }
        } else if (url.includes(Indeed)) {
            const element = document.querySelector('div[data-company-name="true"] a');
            if (element) {
                companyName = element.textContent;
                console.log(companyName);
                return;
            } else {
                // Get the iframe element
                var iframe = document.getElementById('vjs-container-iframe');

                // Get the content window of the iframe
                var iframeWindow = iframe.contentWindow;

                // Use document.querySelector() to select elements inside the iframe
                var link = iframeWindow.document.querySelector('div[data-company-name="true"] a');
                if (link) {
                    if (link.childNodes.length > 1) {
                        companyName = link.childNodes[0].textContent;
                    } else {
                        companyName = link.textContent;
                    }
                    console.error(companyName);
                    return;
                }
            }
            var iframeDocuemnt = document.getElementById("vjs-container-iframe");
            if (iframeDocuemnt == null) {
                var i1 = document.getElementsByClassName("jobsearch-InlineCompanyRating-companyHeader");
                if (i1.length > 0) {
                    companyName = i1[1].childNodes[0].text;
                    return;
                } else return;
            }

            try1 = "jobsearch-InlineCompanyRating";
            try2 = "icl-u-lg-mr--sm icl-u-xs-mr--xs";
            var z1 = iframeDocuemnt.contentWindow.document.body.getElementsByClassName(try1)
            var z2 = iframeDocuemnt.contentWindow.document.body.getElementsByClassName(try2)

            if (z1.length > 0) {
                if (writeLog) console.log(z1)
                companyName = z1[0].childNodes[1].innerText;
            }
            if (companyName == '' && z2.length > 0) {
                if (writeLog) console.log(z2)
                for (let index = 0; index < z2.length; index++) {
                    const element = z2[index].innerText;
                    if (element != '') {
                        companyName = z2[index].innerText;
                        return;
                    }
                }

            }
        }
    } catch (error) {
        console.log(error)
    }

}

function getData() {
    chrome.runtime.sendMessage({
        companyName: companyName, mode: "single"
    }, function (response) {
        if (writeLog) console.log(response);

        showResult(response);
        if (url.includes(Glassdoor)) {
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
        }
    });

}

const createPElement = (status) => {
    let color = '';

    const iframeDocument = document.getElementById("vjs-container-iframe");
    if (iframeDocument) {
        const z1 = iframeDocument.contentWindow.document.body.getElementsByClassName("hb_resultP");
        if (z1.length > 0) {
            iframeDocument.contentWindow.document.body.getElementsByClassName("hb_resultP")[0].remove();
        }
    }
    if (document.getElementsByName("hb_resultP").length > 0) {
        const elList = document.getElementsByName("hb_resultP");
        elList.forEach(element => {
            element.remove();
        });
    }
    const resultP = document.createElement("p");

    resultP.setAttribute("name", "hb_resultP");
    resultP.setAttribute("class", "hb_resultP");
    if (status === 'success') {
        color = 'green';

        //btn
        var btn = document.createElement("a");
        btn.setAttribute("id", "myBtn");
        btn.setAttribute("name", "myBtn");
        btn.setAttribute("class", "myBtn");
        btn.innerText = "H1b Info"

        btn.addEventListener("click", () => {
            removeOldElements()
            var modal = "";
            if (url.includes(Indeed)) {
                modal = getIndeedModal()
            } else {
                modal = document.getElementById("myModal");
            }
            getData()
            modal.style.display = "block";
        });
        // if (url.includes(Indeed)) {
        //   resultP.insertAdjacentElement('afterend', btn);
        // } else {
        //   resultP.appendChild(btn);
        // }

        resultP.innerHTML = `${this.companyName}${successMessage} ${btn.outerHTML}`;
    } else {
        color = 'red';
        resultP.innerHTML = `${this.companyName}${failMessage}`;
    }
    resultP.style = `color: ${color}`;


    return resultP;
};

const getIndeedModal = () => {
    const iframeDocument = document.getElementById("vjs-container-iframe");
    if (iframeDocument) {
        const z1 = iframeDocument.contentWindow.document.body.getElementsByClassName("h1bmodal");
        return z1[0];
    } else {
        //const modal = document.getElementById("myModal");
        const modal = document.getElementsByClassName("h1bmodal");
        return modal;
    }
};

function showResult(response) {

    var noLoginDiv = "";
    var loginDiv = "";
    var jobCardDiv = "";
    var el = document.getElementsByName("hb_resultable");
    if (el && el.length > 0) el[0].innerHTML = response;

    if (url.includes(Glassdoor)) {
        //result table


        return;
        //jobCardDiv = document.querySelectorAll(`[data-test="employerName"]`);

        //noLoginDiv = "css-1h9mu8x e14vl8nk0";
        //noLoginDiv = "empInfo newDetails";
        //loginDiv = "jobs-details-top-card";
    } else if (url.includes(LinkedIn)) {
        noLoginDiv = "topcard__flavor-row";// "topcard__content-left";
        loginDiv = "ember-view t-black t-normal";
    } else if (url.includes(Indeed)) {
        const element = document.querySelector('div[data-company-name="true"] a');
        if (element) {
            jobCardDiv = element;

        } else {
            var iframeDocuemnt = document.getElementById("vjs-container-iframe");
            if (iframeDocuemnt != null) {
                var linkElement = iframeDocuemnt.contentWindow.document.querySelector('div[data-company-name="true"] a');
                if (linkElement) {
                    jobCardDiv = linkElement;

                } else {
                    try1 = "jobsearch-InlineCompanyRating";
                    try2 = "icl-u-lg-mr--sm icl-u-xs-mr--xs";
                    var z1 = iframeDocuemnt.contentWindow.document.body.getElementsByClassName(try1)
                    var z2 = iframeDocuemnt.contentWindow.document.body.getElementsByClassName(try2)
                    // console.log(z1)
                    // console.log(z2)
                    jobCardDiv = z1;
                }
            } else {
                var i1 = document.getElementsByClassName("jobsearch-InlineCompanyRating-companyHeader");
                if (i1.length > 0) {
                    jobCardDiv = i1[1];
                } else console.log("No Div to attach.")
            }

        }
    }


    if (!url.includes(Indeed) && !url.includes(Glassdoor)) {
        jobCardDiv = document.getElementsByClassName(noLoginDiv);
    }

    var divToAttach = "";
    if (jobCardDiv.length == 0) {

        jobCardDiv = document.getElementsByClassName(loginDiv);
    }
    if (url.includes(LinkedIn)) {
        jobCardDiv = document.querySelector(LinkedInSelectedCompanyName);
    }
    if (jobCardDiv.length == 0) {
        return;
    }
    if (writeLog) console.log(jobCardDiv)
    if (url.includes(LinkedIn)) divToAttach = jobCardDiv; else if (url.includes(Glassdoor)) divToAttach = jobCardDiv[0].parentElement; else if (url.includes(Glassdoor)) divToAttach = jobCardDiv[0].parentElement.parentElement; else if (url.includes(Indeed)) {
        if (jobCardDiv.length > 0) {
            divToAttach = jobCardDiv[0];
        } else {
            divToAttach = jobCardDiv;
        }
    }

    if (response === emptyTableResponse || response === null || response === undefined) {

        var resultP = createPElement('fail');
        // Check if the element with name "hb_resultP" already exists in the parent element
        var existingElement = divToAttach.querySelector('p[name="hb_resultP"]');
        if (existingElement) {
            existingElement.remove();
        }
        divToAttach.appendChild(resultP);
        return;
    }
    var resultP = createPElement('success');
    if (url.includes(Indeed)) {
        divToAttach.parentElement.insertAdjacentElement('afterend', resultP);
    } else {
        divToAttach.appendChild(resultP);
    }


    //result table
    var resultTable = document.createElement("table");
    resultTable.setAttribute("name", "hb_resultable");
    resultTable.setAttribute("class", "h1btable");
    resultTable.setAttribute("id", "h1b_result_table");
    resultTable.innerHTML = response;

    addModal(divToAttach, resultTable);
}

function addModal(divToAttach, resultTable) {

    var modalDiv = document.createElement("div");
    modalDiv.setAttribute("id", "myModal");
    modalDiv.setAttribute("name", "myModal");
    modalDiv.setAttribute("class", "h1bmodal");
    modalDiv.style.display = "none";
    modalDiv.style.overflow = "auto";
    if (url.includes(Indeed)) {
        modalDiv.style.width = "510px";
    }

    var modalContentDiv = document.createElement("div");
    modalContentDiv.setAttribute("id", "myModalContent");
    modalContentDiv.setAttribute("class", "h1bmodal-content");
    modalContentDiv.style.maxHeight = "500px";
    modalContentDiv.style.overflowY = "auto";

    var modalHeader = document.createElement("div");
    modalHeader.setAttribute("id", "modal-header");
    modalHeader.setAttribute("class", "h1bmodal-header");

    var modalBody = document.createElement("div");
    modalBody.setAttribute("id", "modal-body");
    modalBody.setAttribute("class", "h1bmodal-body");

    var modalFooter = document.createElement("div");
    modalFooter.setAttribute("id", "modal-footer");
    modalFooter.setAttribute("class", "h1bmodal-footer");

    var footerLink = document.createElement("a");
    footerLink.setAttribute("name", "website_url");
    footerLink.setAttribute("target", "_blank");
    footerLink.href = "https://www.uscis.gov/tools/reports-and-studies/h-1b-employer-data-hub/understanding-our-h-1b-employer-data-hub";
    footerLink.innerText = 'H-1B Employer Data Hub Glossary';

    var supportSpan = document.createElement("span");
    //supportSpan.setAttribute("class", "close");
    //supportSpan.innerHTML = '<span>Paypal or Credit\\Debit Card </span><a href="https://www.buymeacoffee.com/kart33k" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"  style="height: 45px !important;width: 217px !important;"></a>';

    var supportSpan1 = document.createElement("span");
    //supportSpan1.setAttribute("class", "close");
    //   supportSpan1.innerHTML =
    //  `<span>Paypal or Credit\\Debit Card </span> <a href='https://ko-fi.com/V7V0GD4YJ' target='_blank'><img height='36' style='border:0px;height:36px;'src='https://storage.ko-fi.com/cdn/kofi2.png?v=3' border='0' alt='Buy Me a Coffee at ko-fi.com' /></a>`;
    //  modalFooter.appendChild(supportSpan);
    //  modalFooter.appendChild(supportSpan1);
    //   modalFooter.appendChild(footerLink);

    var donationHtml = `
  <table class="donation-table">
  <thead>
    <tr>
      <th><span>Credit\\Debit Card</span></th>
      <th><span>Paypal\\Venmo\\Credit\\Debit Card</span></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="https://www.buymeacoffee.com/kart33k" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee"></a></td>
      <td><a href="https://ko-fi.com/V7V0GD4YJ" target="_blank"><img src="https://storage.ko-fi.com/cdn/kofi2.png?v=3" alt="Buy Me a Coffee at ko-fi.com"></a></td>
    </tr>
  </tbody>
</table>
  `;
    supportSpan.innerHTML = donationHtml;
    modalFooter.appendChild(footerLink);
    modalFooter.appendChild(supportSpan);

    var timesSpan = document.createElement("span");
    timesSpan.setAttribute("class", "close");
    timesSpan.innerHTML = "&times;";
    timesSpan.style.float = "right";
    timesSpan.style.fontSize = "28px";
    timesSpan.style.fontWeight = "bold";
    timesSpan.style.cursor = "pointer";
    timesSpan.addEventListener("click", () => {
        var modal = "";
        if (url.includes(Indeed)) {
            modal = getIndeedModal();
            for (let index = 0; index < modal.length; index++) {
                const element = modal[index];
                element.style.display = "none";
            }

        } else {
            modal = document.getElementById("myModal");
            modal.style.display = "none";
        }


    });
    var header = document.createElement("h3");
    header.innerText = "Results";
    //header.style.height = "50px";

    modalHeader.appendChild(timesSpan);
    modalHeader.appendChild(header);
    modalBody.appendChild(resultTable);

    modalContentDiv.appendChild(modalHeader);
    modalContentDiv.appendChild(modalBody);
    modalContentDiv.appendChild(modalFooter);
    modalDiv.appendChild(modalContentDiv);

    if (url.includes(Glassdoor)) {
        document.body.appendChild(modalDiv);
    } else if (url.includes(Indeed)) {
        divToAttach.parentElement.insertAdjacentElement('afterend', modalDiv);
    } else {
        divToAttach.appendChild(modalDiv);
    }
    var modal = "";
    if (url.includes(Indeed)) {
        modal = getIndeedModal()

    } else {
        modal = document.getElementById("myModal");
    }
    document.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        } else if (event.target.id == "myBtn") {
            getData()
            if (url.includes(Indeed)) {
                modal[0].style.display = "block";
            } else modal.style.display = "block";
        }
    }
    if (url.includes(Indeed)) {
        var iframeDocuemnt = document.getElementById("vjs-container-iframe");
        if (iframeDocuemnt) {
            // Get the iframe's content document
            var iframeDoc = iframeDocuemnt.contentDocument || iframeDocuemnt.contentWindow.document;

            // Create a style element
            var style = iframeDoc.createElement('style');

            // Set the style element's type attribute
            style.type = 'text/css';

            // Set the style element's content
            style.innerHTML = `
.myBtn {
  cursor: pointer;
}
#myBtn{
  cursor: pointer;
}
/* The Modal (background) */
.h1bmodal {
  display: none;
  /* Hidden by default */
  position: fixed;
  /* Stay in place */
  z-index: 100;
  /* Sit on top */
  padding-top: 100px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100% !important;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
}

/* Modal Content */
.h1bmodal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  height: auto;
  max-height: 500px;
  overflow-y: auto;
}


/* The Close Button */
.close {
  /* color: white; */
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.h1bmodal-header {
  padding: 2px 16px; 
  background-color: #5cb85c;
  color: white;
}

.h1bmodal-body {
  padding: 2px 16px;
  height: auto;
  max-height: 300px;
  overflow: scroll;
}
.h1bmodal-footer {
  padding: 2px 16px;
  background-color: aliceblue;
  color: white;
}
#h1b_result_table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  color: #000;
  border: ridge;
}

#h1b_result_table td,
#h1b_result_table th {
  border: 1px solid #ddd;
  padding: 8px;
}

#h1b_result_table tr:nth-child(even) {
  background-color: #f2f2f2;
}

#h1b_result_table tr:hover {
  background-color: #ddd;
}

#h1b_result_table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #006097;
  color: white;
}
#h1b_result_table p {
    color: black;
}
[sbadge]:after {
  background: green;
border-radius: 30px;
color: #fff;
content: attr(sbadge);
font-size: 9px;
margin-top: -3px;
min-width: 20px;
padding: 1px;
position: absolute;
text-align: center;
}

[sbadge^="-"]:after,
[sbadge="0"]:after,
[sbadge=""]:after {
display: none;
}

[fbadge]:after {
  background: red;
border-radius: 30px;
color: #fff;
content: attr(fbadge);
font-size: 9px;
margin-top: -3px;
min-width: 20px;
padding: 1px;
position: absolute;
text-align: center;
}

[fbadge^="-"]:after,
[fbadge="0"]:after,
[fbadge=""]:after {
display: none;
}
.donation-table {
  color: #fff;
  background-color: #333;
  font-family: Arial, sans-serif;
  font-size: 14px;
  line-height: 1.5;
  border-collapse: collapse;
  width: 100%;
}

.donation-table th,
.donation-table td {
  padding: 2px;
  text-align: center;
}

.donation-table th span {
  font-weight: bold;
}

.donation-table td span {
  display: block;
}

.donation-table img {
  height: 45px;
  width: 217px;
  border: 0;
}
/* Style the button */
.myBtn {
  display: inline-block;
  padding: 3px;
  background-color: #4CAF50;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Hover effect */
.myBtn:hover {
  background-color: #3e8e41;
}

/* Active effect */
.myBtn:active {
  background-color: #3e8e41;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}
`;
            // Append the style element to the iframe's head element
            iframeDoc.head.appendChild(style);

            iframeDocuemnt.contentWindow.document.onclick = function (event) {
                if (event.target == modal) {
                    modal.style.display = "none";
                } else if (event.target.className == "close") {
                    const iframeDocument = document.getElementById("vjs-container-iframe");
                    if (iframeDocument) {
                        const z1 = iframeDocument.contentWindow.document.body.getElementsByClassName("h1bmodal");
                        if (z1 && z1.length) {
                            for (let index = 0; index < z1.length; index++) {
                                const element = z1[index];
                                element.style.display = "none";
                            }
                        }
                    } else modal.style.display = "none";
                } else if (event.target.id == "myBtn") {
                    getData();
                    modal.style.display = "block";
                }
            }
        }
    }
}

var list = document.getElementsByClassName(getCompanyNameListElement());
var listIndex = 0;

function getDataForCompanies(companyLi = null) {
    listIndex = 0;
    if (companyLi == null) {
        companyLi = getCompanyNameListElement();
    }
    if (url.includes(Indeed) || url.includes(Simplify)) {
        var badgeElList = document.getElementsByClassName("h1bBadge");
        //if (badgeElList.length > 0) return;
    }
    for (var i = 0; i < companyLi.length; i++) {
        var name = companyLi[i].innerText;
        if (url.includes(Simplify)) {
            name = companyLi[i].querySelector('a').textContent;
        }

        chrome.runtime.sendMessage({
            companyName: name, mode: "list"
        }, function (response) {
            try {
                if (writeLog) console.log(response);
                if (!url.includes(Glassdoor)) {
                    var badge = document.createElement("span");
                    badge.setAttribute("class", "h1bBadge");
                    //badge.innerHTML = response;
                    var badgeText = "";
                    if (response === true) {
                        badgeText = 'H1B Sponsor';
                        badge.setAttribute("sbadge", badgeText);
                    } else {
                        badgeText = 'Not a H1B Sponsor';
                        badge.setAttribute("fbadge", badgeText);
                    }
                }
                //console.log(listIndex);


                if (url.includes(Glassdoor)) {
                    var btn = document.createElement("a");
                    btn.setAttribute("id", "myBtn");
                    btn.setAttribute("name", "myBtn");
                    btn.setAttribute("class", "myBtn");
                    btn.innerText = "H1b Info"
                    btn.addEventListener("click", (event) => {
                        console.log(event);
                        var modal = "";

                        //   companyName = event.currentTarget.parentElement.childNodes[0].childNodes[0].textContent;
                        //   if (companyName != "" || companyName != undefined || companyName != null)
                        //     getData();
                        // } else {
                        //   modal = document.getElementById("myModal");

                    });
                    var badge = document.createElement("span");
                    badge.setAttribute("class", "h1bBadge");
                    //badge.innerHTML = response;
                    var badgeText = "";
                    if (response === true) {
                        badgeText = 'H1B Sponsor';
                        badge.setAttribute("sbadge", badgeText);
                        companyLi[listIndex].appendChild(badge)
                        // companyLi[listIndex].parentElement.append(btn);
                    } else {
                        badgeText = 'Not a H1B Sponsor';
                        badge.setAttribute("fbadge", badgeText);
                        companyLi[listIndex].appendChild(badge)
                    }


                    var resultTable = document.createElement("table");
                    resultTable.setAttribute("name", "hb_resultable");
                    resultTable.setAttribute("class", "h1btable");
                    resultTable.setAttribute("id", "h1b_result_table");


                    addModal(companyLi[listIndex].parentElement, resultTable);

                } else if (url.includes(Indeed)) {
                    if (companyLi[listIndex].parentElement.getElementsByClassName("h1bBadge").length == 0) {
                        companyLi[listIndex].parentElement.appendChild(badge)
                    }
                } else if (url.includes(Simplify)) {
                    if (companyLi[listIndex]) companyLi[listIndex].appendChild(badge)
                } else {
                    if (companyLi[listIndex].parentElement.getElementsByClassName("h1bBadge").length == 0) {
                        companyLi[listIndex].parentElement.appendChild(badge)
                    }
                }
                listIndex = listIndex + 1;
            } catch (error) {
                console.log(error);
            }
        })
    }
};  

function getCompanyLiForGivenCompanyNames(companyNames) {
    let companyLi;
    for (const element of companyNames) {
        companyLi = document.getElementsByClassName(element)
        if (companyLi.length > 0) {
            break;
        }
    }
    return companyLi;
}

function getCompanyNameListElement() {
    let companyLi;
    if (url.includes(LinkedIn)) {
        companyLi = getCompanyLiForGivenCompanyNames(LinkedInCompanyNames)
    } else if (url.includes(Glassdoor)) {
        companyLi = getCompanyLiForGivenCompanyNames(GlassdoorCompanyNames)
    } else if (url.includes(HandShake)) {
        companyLi = getCompanyLiForGivenCompanyNames(HandShakeCompanyNames)
    } else if (url.includes(Indeed)) {
        companyLi = document.getElementsByClassName(IndeedComapnyNames)
    } else if (url.includes(Google)) {
        companyLi = getCompanyLiForGivenCompanyNames(googleCompanyNames)
    } else if (url.includes(Simplify)) {
        companyLi = document.querySelectorAll('[data-testid="job-card"]');
    }
    return companyLi;
}

