// API ENDPOINTS
const ALL_ISSUES_API =
    "https://phi-lab-server.vercel.app/api/v1/lab/issues";

const SINGLE_ISSUE_API =
    "https://phi-lab-server.vercel.app/api/v1/lab/issue";

const SEARCH_ISSUE_API =
    "https://phi-lab-server.vercel.app/api/v1/lab/issues/search";



// DOM ELEMENTS
const issueContainer =
    document.getElementById("issueContainer");

const issueCount =
    document.getElementById("issueCount");

const loadingSpinner =
    document.getElementById("loadingSpinner");

const emptyState =
    document.getElementById("emptyState");

const searchInput =
    document.getElementById("searchInput");

const searchButton =
    document.getElementById("searchButton");

const allTab =
    document.getElementById("allTab");

const openTab =
    document.getElementById("openTab");

const closedTab =
    document.getElementById("closedTab");


// MODAL ELEMENTS
const issueModal =
    document.getElementById("issueModal");

const closeModalButton =
    document.getElementById("closeModalButton");

const modalCloseAction =
    document.getElementById("modalCloseAction");

const modalTitle =
    document.getElementById("modalTitle");

const modalMeta =
    document.getElementById("modalMeta");

const modalStatus =
    document.getElementById("modalStatus");

const modalAuthor =
    document.getElementById("modalAuthor");

const modalDate =
    document.getElementById("modalDate");

const modalLabels =
    document.getElementById("modalLabels");

const modalDescription =
    document.getElementById("modalDescription");

const modalInformation =
    document.getElementById("modalInformation");

const modalAssignee =
    document.getElementById("modalAssignee");

const modalPriority =
    document.getElementById("modalPriority");

const modalLoadingSpinner =
    document.getElementById("modalLoadingSpinner");    



// APPLICATION STATE
let allIssues = [];

let currentFilter = "all";

let hasApiError = false;

let hasSearchError = false;

let currentSearch = "";

let currentSearchResults = [];





// TAB ACTIVE STATE
function setActiveTab(activeTab) {

    allTab.classList.remove("bg-blue-700", "text-white");

    openTab.classList.remove("bg-blue-700", "text-white");

    closedTab.classList.remove("bg-blue-700", "text-white");

    activeTab.classList.add("bg-blue-700", "text-white");
}


// TAB CLICK EVENTS
allTab.addEventListener("click", () => {

    currentFilter = "all";

    setActiveTab(allTab);

    applyFilter();

});


openTab.addEventListener("click", () => {

    currentFilter = "open";

    setActiveTab(openTab);

    applyFilter();

});


closedTab.addEventListener("click", () => {

    currentFilter = "closed";

    setActiveTab(closedTab);

    applyFilter();

});


// Default active tab
setActiveTab(allTab);


// SEARCH FUNCTIONALITY
searchButton.addEventListener("click", () => {
    searchIssues();
});



// SEARCH ON ENTER
searchInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        searchButton.click();
    }

});


async function searchIssues() {

    const searchText = searchInput.value.trim();

    if (searchText === "") {
        return;
    }

    currentSearch = searchText;

    hasSearchError = false;


    // Spinner SHOW
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");



    try {

        const url = `${SEARCH_ISSUE_API}?q=${encodeURIComponent(searchText)}`;

        const response = await fetch(url);

        if(!response.ok) {

            throw new Error("Failed to load issues");
        } 


        const data = await response.json();

        currentSearchResults = data.data || [];

        applyFilter()


}  catch (error) {

    console.log(error);

    currentSearchResults = [];

    hasSearchError = true;

    showSearchErrorState();

    } finally {
        // Spinner HIDE
        loadingSpinner.classList.add("hidden");
        loadingSpinner.classList.remove("flex");

    }

}


function showSearchErrorState() {

    issueContainer.classList.remove("hidden");

    emptyState.classList.add("hidden");

    issueCount.innerText = "Error";

    issueContainer.innerHTML = `

        <div class="col-span-full flex min-h-[400px] items-center justify-center">

            <div class="text-center">

                <i class="fa-solid fa-triangle-exclamation text-3xl text-red-500"></i>

                <h3 class="mt-3 font-bold text-slate-700">
                    Something went wrong
                </h3>

                <p class="mt-1 text-sm text-slate-400">
                    Failed to search issues. Please try again.
                </p>

                <button
                    onclick="searchIssues()"
                    class="mt-4 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
                    Try Again
                </button>

            </div>    

        </div>
    `;

}




function showErrorState() {

    emptyState.classList.add("hidden");

    issueContainer.classList.remove("hidden");

    issueCount.innerText = "Error";

    issueContainer.innerHTML = `

        <div class="col-span-full flex min-h-[400px] items-center justify-center">

            <div class="text-center">

                <i class="fa-solid fa-triangle-exclamation text-3xl text-red-500"></i>

                <h3 class="mt-3 font-bold text-slate-700">
                    Something went wrong
                </h3>

                <p class="mt-1 text-sm text-slate-400">
                    Failed to load issues. Please refresh the page and try again.
                </p>

                <button onclick="loadIssues()"
                    class="mt-4 rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
                    Try Again
                </button>

            </div>

        </div>
    `;
}




// FILTER LOGIC
function applyFilter() {


    // All Issues API error
    if (hasApiError) {
        showErrorState();
        return;
    }

    // Search API error
    if (hasSearchError) {
        showSearchErrorState();
        return;
    }


    issueContainer.classList.add("hidden");

    emptyState.classList.add("hidden");



    let issuesToFilter;

    if (currentSearch !== "") {

        issuesToFilter = currentSearchResults;

    } else {

        issuesToFilter = allIssues;
    }    



    let filteredIssues;


    if (currentFilter === "all") {

        filteredIssues = issuesToFilter;

    } else if (currentFilter === "open") {

        filteredIssues = issuesToFilter.filter(
            issue => issue.status === "open"
        );

    } else if (currentFilter === "closed") {

        filteredIssues = issuesToFilter.filter(
            issue => issue.status === "closed"
        );

    }


    displayIssues(filteredIssues);


    if (filteredIssues.length === 0) {

        emptyState.classList.remove("hidden");

    } else {

        issueContainer.classList.remove("hidden");

    }


}







// LOAD ALL ISSUES FROM API
async function loadIssues() {

    hasApiError = false;

    // spinner show
    loadingSpinner.classList.remove("hidden");
    loadingSpinner.classList.add("flex");

    try {
        const response = await fetch(ALL_ISSUES_API);

        if(!response.ok) {
            throw new Error("Failed to load issues");
        } 

        const data = await response.json();

        allIssues = data.data || [];

        applyFilter();


    } catch (error) {
        console.log(error);

        hasApiError = true;

        showErrorState();

    } finally {
        loadingSpinner.classList.add("hidden");
        loadingSpinner.classList.remove("flex");
    }

}


// DISPLAY ISSUES
function displayIssues(issues) {

    issueContainer.innerText = "";

    issueCount.innerText = `${issues.length} Issues`;

    issues.forEach(issue => {

        const card = createIssueCard(issue);

        issueContainer.appendChild(card);

    });

}


// CREATE ISSUE CARD
function createIssueCard(issue) {

    const card = document.createElement("div");


    // Status color
    const statusColor =
        issue.status === "open"
            ? "border-t-green-500"
            : "border-t-purple-500";


    // Status icon
    const statusIcon =
        issue.status === "open"
            ? "assets/Open-Status.png"
            : "assets/Closed-Status.png";


    // Priority styles
    const priorityClass = {

        high: "bg-red-100 text-red-500",

        medium: "bg-yellow-100 text-yellow-600",

        low: "bg-slate-100 text-slate-400"

    };


    // Card styles
    card.className = `
        bg-white
        border border-slate-200
        border-t-2
        ${statusColor}
        rounded-lg
        shadow-sm
        overflow-hidden
        transition
        duration-200
        hover:-translate-y-1
        hover:shadow-md
    `;


    // Card HTML
    card.innerHTML = `

        <!-- Card body -->

        <div class="p-5">

            <!-- Status + Priority -->

            <div class="flex items-center justify-between mb-3">

                <img
                    src="${statusIcon}"
                    alt="${issue.status}"
                    class="w-6 h-6"
                >

                <span
                    class="rounded-full px-3 py-1 text-xs font-semibold uppercase
                    ${priorityClass[issue.priority] || "bg-slate-100 text-slate-400"}"
                >
                    ${issue.priority || "Low"}
                </span>

            </div>


            <!-- Title -->

            <h3 class="font-semibold text-sm leading-tight text-slate-800 capitalize">

                ${issue.title}

            </h3>


            <!-- Description -->

            <p class="mt-2 text-xs leading-4 text-slate-400 line-clamp-3">

                ${issue.description}

            </p>


            <!-- Labels -->

            <div class="mt-3 flex flex-wrap gap-1">

                ${(issue.labels || [])
                    .map(label => `

                        <span
                            class="rounded-full px-2 py-1 capitalize text-xs font-medium
                            ${getLabelStyle(label)}"
                        >

                            ${getLabelIcon(label)}

                            ${label}

                        </span>

                    `)
                    .join("")}

            </div>

        </div>


        <!-- Footer -->

        <div class="border-t border-slate-100 px-5 py-3">

            <p class="text-xs text-slate-400">

                #${issue.id} by ${issue.author}

            </p>

            <p class="mt-1 text-xs text-slate-400">

                ${formatDate(issue.createdAt)}

            </p>

        </div>

    `;



    


    return card;

}



// LABEL STYLES
function getLabelStyle(label) {

    if (label === "bug") {

        return "bg-red-100 text-red-500 border border-red-200";

    }

    if (label === "documentation") {

        return "bg-purple-100 text-purple-500 border border-purple-200";

    }

    if (label === "enhancement") {

        return "bg-green-100 text-green-500 border border-green-200";

    }

    if (label === "good first issue") {

        return "bg-blue-100 text-blue-500 border border-blue-200";

    }

    if (label === "help wanted") {

        return "bg-orange-100 text-orange-500 border border-orange-200";

    }

    return "bg-slate-50 text-slate-500 border border-slate-200";

}


// LABEL ICONS
function getLabelIcon(label) {

    if (label === "bug") {

        return '<i class="fa-solid fa-bug"></i>';

    }

    if (label === "documentation") {

        return '<i class="fa-solid fa-book"></i>';

    }

    if (label === "enhancement") {

        return '<i class="fa-solid fa-seedling"></i>';

    }

    if (label === "good first issue") {

        return '<i class="fa-solid fa-seedling"></i>';

    }

    if (label === "help wanted") {

        return '<i class="fa-solid fa-hand"></i>';

    }

    return "";

}


// DATE FORMATTING
function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-US", {

        month: "short",

        day: "numeric",

        year: "numeric"

    });

}


loadIssues(); 

