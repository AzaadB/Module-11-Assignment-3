//The first thing the init function(line 4), will do is initiate our global variable(line 2)//
var rootPath;

function init() {
    //initializing the global variable//
    rootPath = "https://mysite.itvarsity.org/api/mini-blog/";
    //The next thing init is going to do is add event handlers for the three menu items//
    document.getElementById("getAll").addEventListener("click", getAllPosts);
    document.getElementById("getLatest").addEventListener("click", getLatestPosts);
    document.getElementById("getPopular").addEventListener("click", getPopularPosts);

    getAllPosts();
}

//creating a function to retrieve all posts//
function getAllPosts() {
    //setting the category for the api//
    category = "getAll";
    //fetching posts in the category//
    fetchPosts(category);
    //Setting the "All" menu item to acive when link is clicked//
    setActiveLink(category);
}
//creating a function to retrieve the Latest posts//
function getLatestPosts() {
    //setting the category for the api//
    category = "getLatest";
    //fetching posts in the category//
    fetchPosts(category);
    //Setting the "Latest" menu item to acive when link is clicked//
    setActiveLink(category);
}

//creating a function to retrieve all posts//
function getPopularPosts() {
    //setting the category for the api//
    category = "getPopular";
    //fetching posts in the category//
    fetchPosts(category);
    //Setting the "Popular" menu item to acive when link is clicked//
    setActiveLink(category);
}
//creating a function to fetch the posts//
function fetchPosts(category) {
    fetch(rootPath + "get-posts/?category=" + category)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayPosts(data);
        })
}

//creating a function to display the info we get back from the server in a card form//
function displayPosts(data) {
    var output = "";
    //itterating through the array we get back//
    for (a = 0; a < data.length; a++) {
        output += //Creating the output cards//
            `
        <div class="card mb-4 box-shadow">
            <div class="card-header">
            <h4 class="my-0 font-weight-normal">${data[a][0]}</h4>
            </div>
            <div class="card-body">
            <img src="${rootPath}/uploads/${data[a][3]}" class="card-img-top" />
            <p class="card-text">${data[a][1]}</p>
            <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                    <button type="button" class="btn btn-lg btn-link"><i class="far fa-heart"></i></button>
                    <button type="button" class="btn btn-lg btn-link"><i class="far fa-comment"></i></button>
                    <button type="button" class="btn btn-lg btn-link"><i class="fa fa-retweet"></i></button>
                </div>
                <small class="text-muted">${data[a][2]}</small>
                </div>
         </div>
        </div>`
    }
    document.getElementById("posts").innerHTML = output;
}

//creating a function for the links//
function setActiveLink(id) {
    //First deactivating all links
    document.getElementById("getAll").classList.remove("active");
    document.getElementById("getLatest").classList.remove("active");
    document.getElementById("getPopular").classList.remove("active");

    //We will know which link is active by it's id//
    document.getElementById(id).classList.add("active");
}