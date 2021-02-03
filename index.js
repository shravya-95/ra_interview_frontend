//add your js code here 
// 1. call the REST APIs
// 2. Populate the tagged count, comment count, and ranking from the returned JSONs

$('document').ready(function(){

    console.log("document is ready now!");
    var username = "johnny293"
    getcomments(username);
    getcounts(username);
    getrankings(username);

});

function getcomments(username)
{
    //make the call
    //get the ids
    //insert
    var mentionsContainer = document.getElementById("mentions-container");
    $.get( "http://localhost:5000/api/users/"+username+"/comments", function( data ) {
        // $( ".result" ).html( data );
        data=JSON.parse( data );
        for(let i=0; i<data.length;i++){
            console.log(data[i])
            var commentContainer = document.createElement("div");
            commentContainer.className="comments-container";
            var commentHeader = document.createElement("div");
            commentHeader.className="comment-head";
            var commentAuthor = document.createElement("div");
            commentAuthor.innerText = data[i]['author'];
            commentAuthor.className="author";
            var timer = document.createElement("div");
            timer.innerText=data[i]["timeelapsed"]+"m"
            timer.className="timer"
            commentHeader.appendChild(commentAuthor);
            commentHeader.appendChild(timer);
            var commentUser = document.createElement("span");
            commentUser.className="comment"
            commentUser.innerText=data[i]['username']+" "
            var commentText = document.createElement("span")
            commentText.className="comment-light"
            commentText.innerText=data[i]['comment']
            commentUser.appendChild(commentText)
            commentContainer.appendChild(commentHeader)
            commentContainer.appendChild(commentUser)
            mentionsContainer.appendChild(commentContainer);


        }
        // var taggedcount = document.getElementById("tagged-count");
        // taggedcount.innerText=data[0]['taggedcount'];
      });
}


function getcounts(username)
{
    $.get( "http://localhost:5000/api/users/"+username+"/counts", function( data ) {
        data=JSON.parse(data);
        console.log(data)
        var taggedCount = document.getElementById("tagged-count")
        taggedCount.innerText = data[0]['taggedcount']
        var captureCount = document.getElementById("captured-count")
        captureCount.innerText = data[0]['capturedcount']

    });

}


function getrankings(username)
{
    $.get( "http://localhost:5000/api/users/"+username+"/ranking", function( data ) {
        data=JSON.parse(data);
        console.log(data)
        var ranking = document.getElementById("user-rank")
        ranking.innerText = data[1]['ranking']
        var totalUsers = document.getElementById("total-users")
        totalUsers.innerText = "/"+ data[0]['total']

    });

}
