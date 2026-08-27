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

