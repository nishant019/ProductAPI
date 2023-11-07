let index = 1;

function createPagination(totalPages, activePage) {

    var startPage, endPage;
    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (activePage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (activePage >= totalPages - 2) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {
            startPage = activePage - 2;
            endPage = activePage + 2;
        }
    }

    // Create the pagination links
    var paginationContainer = document.getElementById("pagination-container");
    paginationContainer.innerHTML = ''; // Clear existing links

    // Add the "First" link
    if (startPage > 1) {
        var firstLink = document.createElement("a");
        firstLink.href = "#";
        firstLink.textContent = "1";
        paginationContainer.appendChild(firstLink);
    }
    if (startPage > 2) {
        var ellipsis1 = document.createElement("a");
        ellipsis1.textContent = "...";
        ellipsis1.classList.add("disabled")

        paginationContainer.appendChild(ellipsis1);
    }

    // Add the page links
    for (var i = startPage; i <= endPage; i++) {
        var pageLink = document.createElement("a");
        pageLink.href = "#";
        pageLink.textContent = i;
        if (i === activePage) {
            pageLink.classList.add("active");
        }
        paginationContainer.appendChild(pageLink);
    }

    // Add the ellipsis if needed after the last page
    if (endPage < totalPages) {
        var ellipsis2 = document.createElement("a");
        ellipsis2.textContent = "...";
        ellipsis2.classList.add("disabled")
        paginationContainer.appendChild(ellipsis2);
    }
    if (endPage < totalPages) {
        var lastLink = document.createElement("a");
        lastLink.href = "#";
        lastLink.textContent = totalPages;
        paginationContainer.appendChild(lastLink);
    }

}




function historyManagement(historyStates) {

    historyStates.pop()
    if (historyStates.length > 0) {
        index = (historyStates[historyStates.length - 1].page)
        historyStates.pop()
    } else {
        history.back()
        index = 1
        history.back()

    }
}

//for handling pagination in refresh, or navigation
function getPagePath(url) {
    const pathname = new URL(url).pathname;
    return pathname;
}
function resetPage(pageLoaded) {
    let currentPath = getPagePath(window.location.href);
    let referrerPath = getPagePath(document.referrer);

    if (currentPath !== referrerPath) {
        localStorage.setItem(pageLoaded, '');
    }
}
function historyListState(pageNo, url, historyStates, pageState) {
    var pageTitle = "Page " + pageNo;
    const state = { "page": pageNo };
    history.pushState(state, pageTitle, url);
    historyStates.push(state);
    localStorage.setItem(pageState, JSON.stringify(historyStates));
    currentIndex = historyStates.length - 1;
}

function initPage(executionFunction, pageLoaded, pageState) {
    // window.addEventListener("load", (event) => {
    //     let currentPath = getPagePath(window.location.href);
    //     let referrerPath = getPagePath(document.referrer);
    //     console.log(         currentPath , referrerPath
    //     )
    //     if (currentPath !== referrerPath || referrerPath !== '/updateUser') {
    //         // The page was visited from another page and not from '/updateUser'
    //         localStorage.setItem(pageState, '');
    //         localStorage.setItem(pageLoaded, '');
    //       }
    // })


    let sta = [];
    let hasPageBeenLoaded = localStorage.getItem(pageLoaded);

    if (!hasPageBeenLoaded) {
        localStorage.setItem(pageLoaded, 'true');
        index = 1;
    } else {
        sta = JSON.parse(localStorage.getItem(pageState));
        if (sta) {
            index = sta[sta.length - 1].page;
        } else {
            index = 1
        }
    }

    execFunction(executionFunction, index);
}

function handlePageChange(e, func) {
    if (e.target.tagName === "A") {
        e.preventDefault();
        const clickedPage = parseInt(e.target.textContent);
        currentPage = clickedPage;
        execFunction(func, currentPage);
    }
}

function handlePreviousPageClick(func) {
    if (currentPage > 1) {
        currentPage--;
        execFunction(func, currentPage);
    }
}

function handleNextPageClick(func) {
    if (currentPage < maxPages) {
        currentPage++;
        execFunction(func, currentPage);
    }
}

function execFunction(func, currentPage) {
    func(currentPage);
}
