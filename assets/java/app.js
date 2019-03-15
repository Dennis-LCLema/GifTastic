
var movies = ["Dark Knight","8mile","Saving Private Ryan","Mad Max"];

// creates buttons for each of these
function makeButtons(){ 
	// deletes the movie prior to adding new movies so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the movies array
	for (var i = 0; i < movies.length; i++){
		
		var a = $('<button>') 
		a.addClass('movie'); 
		a.attr('data-name', movies[i]); 
		a.text(movies[i]); 
		$('#buttonsView').append(a); 
	}
}

// handles addMovie button event
$("#addMovie").on("click", function(){

	// grabs the user movie input
	var movie = $("#movie-input").val().trim();
	movies.push(movie);
	makeButtons();
	return false; 
})

// function to display gifs
function displayGifs(){
	var movie = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&limit=9&api_key=dc6zaTOxFJmzC";

        $.ajax({url: queryURL, 
            method: "GET"
        })
        .done(function (response) {
			console.log(response.data);
			var results = response.data;
			for (var i = 0; i < results.length; i++) {
				var gifDiv = $('<div class=gifs>');
				var movieGif = $('<img>');
					movieGif.attr('src', results[i].images.fixed_height_still.url);
					movieGif.attr('title', "Rating: " + results[i].rating);
					movieGif.attr('data-still', results[i].images.fixed_height_still.url);
					movieGif.attr('data-state', 'still');
					movieGif.addClass('gif');
					movieGif.attr('data-animate', results[i].images.fixed_height.url);
				gifDiv.append(movieGif)

				$("#gifsView").prepend(gifDiv);
			}
			
		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying movie gifs
$(document).on("click", ".movie", displayGifs);

// initially calls the makeButtons function
makeButtons();