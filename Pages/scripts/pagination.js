
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


// handling browser redirects while pagination [ for user list]
function pushUserListState(pageNo, url) {
    var pageTitle = "Page " + pageNo;
    const state = { "page": pageNo }
    history.pushState(state, pageTitle, url);
    historyStates.push(state);
    localStorage.setItem("state", JSON.stringify(historyStates))
    currentIndex = historyStates.length - 1;
}
