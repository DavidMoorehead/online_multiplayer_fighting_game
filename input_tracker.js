var historical_inputs = [];
var current_inputs = [];

function input_tracker_update(result){
    const currentTime = Date.now();
// Time elapsed since the page started loading (in milliseconds)
const elapsedTime = currentTime - pageLoadTime;

    historical_inputs.push(result + " at " + elapsedTime + "@"+game_grid.getAttribute("x_pos") + "#" + game_grid.getAttribute("y_pos"));
    
    if(current_inputs.length<50){
    current_inputs.push(result + "@" + Date.now() + "@"+game_grid.getAttribute("x_pos") + "#" + game_grid.getAttribute("y_pos"));
    }else{
      current_inputs.shift();
      current_inputs.push(result + "@" + Date.now() + "@"+game_grid.getAttribute("x_pos") + "#" + game_grid.getAttribute("y_pos"));
    }

    localStorage.setItem('input_tracker', historical_inputs);
    	localStorage.setItem('stored_position', (game_grid.getAttribute("x_pos")+","+game_grid.getAttribute("y_pos"))); 
		
}

// Time when the page started loading
const pageLoadTime = Date.now();

// Current time
var test_array;

/*
try{
    test_arr
}localStorage.getItem('input_tracker').split(",");
alert(test_array[0]);
*/




function status_check_loop(){
  if(game_grid.getAttribute("status") != "default" && game_grid.getAttribute("status") != "resyncing"){
  var current_time = Date.now();
  try{
  var status_by_info = game_grid.getAttribute("status_by").split(",");
  var last_state_time = parseInt(status_by_info[2]);
  
  //needs alot more logic updates in future, just made it simple for now
  //since current maximum for status effect is 2s
  
  if(current_time - last_state_time >=2){

    game_grid.setAttribute("status", "default");
  }
  
}catch(error){
  
}

}
}


status_check_loop(); 