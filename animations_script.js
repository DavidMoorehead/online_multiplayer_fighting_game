//animation processing here
 
 




function move_other_player(x_pos, y_pos, peer_id){
  
  var test_player = document.getElementById(peer_id);
    
  
    var new_left = (parseInt(x_pos)*-1) + 50;
    var new_top = (parseInt(y_pos)*-1) + 50;



       test_player.style.left = new_left+"vw"; // Set final left position
        test_player.style.top = new_top+"vh"; // Set final top position

        test_player.setAttribute("x_value", new_left-50);
         test_player.setAttribute("y_value", new_top-50);
        // Remove the dynamically added @keyframes style to avoid clutter
      
          //document.head.removeChild(styleEl);
   
          
          grab_check("");
        

}






function base_movement_animation(result){

  var game_grid = document.getElementById('game_grid'); // Assuming game_grid is the element you're animating


    var new_left = parseInt(game_grid.getAttribute("x_pos"));
    var new_top = parseInt(game_grid.getAttribute("y_pos"));

    var current_left = new_left;
    var current_top = new_top;

    var result_counter = 0;
    while(result.length > result_counter){
      if (result.substring(result_counter,result_counter+1) == "R") {
          new_left -= 5; // Example: Increase left position by 200vw
      }
      
      if (result.substring(result_counter,result_counter+1) == "L") {
          new_left += 5; // Example: Increase left position by 200vw
      }
      
      if (result.substring(result_counter,result_counter+1) == "U") {
          new_top += 5; // Example: Increase left position by 200vw
      }
      
      if (result.substring(result_counter,result_counter+1) == "D") {
          new_top -= 5; // Example: Increase left position by 200vw
      }
      
     result_counter+=1; 
    }

    new_left = new_left + "vw";
    new_top = new_top + "vh";


         game_grid.style.left = new_left; // Set final left position
        game_grid.style.top = new_top; // Set final top position


       grab_check(result);
    
}