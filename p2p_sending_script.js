function process_data_to_send(data_type){
  
  
  
  var lag_mod = 0;
	var my_x = parseInt(game_grid.getAttribute("x_pos"))	    ;
var my_y = parseInt(game_grid.getAttribute("y_pos"))	    ;

		    
		    var player_array = document.querySelectorAll(".other_player");
		    
	
		    
		    player_array.forEach(function(playerstart){
												var player = document.getElementById(playerstart.id);
						if(player.getAttribute("ping") == null){
						    
						    lag_mod = 100;
						}else{
						    
						     lag_mod = parseInt(player.getAttribute("ping"));
			
						}
		        
		       
		             
		             try{
				setTimeout(() => { //send info to player to match lag
				    if(data_type == "movement"){
				       
				      send_and_process_movement(my_x, my_y, player);
				        
				    } else if (data_type == "attack"){
				      
				      send_and_process_attack();
				    }
								    
				}, lag_mod); //gives a free frame for each frame used to loop through array 
			
			
		        }catch(error){
		            
		            
		            
		            
		        }
		        
		        
			});//loop end
			
}

function send_and_process_movement(my_x, my_y, player){
  try{
	  var result_counter = 0;
		 while(result.length > result_counter){
      if (result.substring(result_counter,result_counter+1) == "R") {
          my_x += 5; // Example: Increase left position by 200vw
      }
      
      if (result.substring(result_counter,result_counter+1)  == "L") {
          my_x  -= 5; // Example: Increase left position by 200vw
      }
      
         if (result.substring(result_counter,result_counter+1)  == "D") {
          my_y  += 5; // Example: Increase left position by 200vw
      }
      
      if (result.substring(result_counter,result_counter+1)  == "U") {
          my_y  -= 5; // Example: Increase left position by 200vw
      }
      
   
      
     result_counter+=1; 
    }
    var temp_array = current_inputs[(current_inputs.length-1)].split("@");
				player.conn.send("conn_input" + ","+ temp_array);//send info early
				
  }catch(error){
    //alert(error); //not done yet
  }
}


function ping_update_loop(){ 
    
	 var player_array = document.querySelectorAll(".other_player");
		    
		    
		    
		    
		    player_array.forEach(function(playerstart){
				try{
       
					var other_player = document.getElementById(playerstart.id);
					   
				    					other_player.conn.send("ping_request" + ","+Date.now());
	                    other_player.setAttribute("ping_request_time", Date.now());
				}catch(error){
		
				}
				
				
			});
			
		setTimeout(() => { 
			ping_update_loop();
		}, 2500); //every 2.5 seconds send ping updates

	
	
}



function send_and_process_attack(){
	if(game_grid.getAttribute("status") == "grabbing"){
	
	
		alert("you used " + result);
		
	}else{
		//this is for defensive abilities when being grabbed
	}


}




function grab_check(result){ //this is only for 1v1 grabs. For multiple grabs you don't need to know, yoou only need to know who is grabbing YOU client side.



  try{
    
      var my_x = parseInt(game_grid.getAttribute("x_pos")); 
	var my_y = parseInt(game_grid.getAttribute("y_pos"));

    
     var result_counter = 0;
    while(result.length > result_counter){
      if (result.substring(result_counter,result_counter+1) == "R") {
          my_x -= 5; // Example: Increase left position by 200vw
      }
      
      if (result.substring(result_counter,result_counter+1) == "L") {
          my_x += 5; // Example: Increase left position by 200vw
      }
      
      if (result.substring(result_counter,result_counter+1) == "U") {
          my_y += 5; // Example: Increase left position by 200vw
      }
      
      if (result.substring(result_counter,result_counter+1) == "D") {
          my_y -= 5; // Example: Increase left position by 200vw
      }
      
     result_counter+=1; 
    }




	  var player_array_5 = document.querySelectorAll(".other_mob_map_pos_" + my_x + "\\," + my_y);
	  
	    var player_array_1 = document.querySelectorAll(".other_mob_map_pos_" + (my_x-5) + "\\," + (my_y-5));
	      var player_array_2 = document.querySelectorAll(".other_mob_map_pos_" + (my_x) + "\\," + (my_y-5));
	      
	        var player_array_3 = document.querySelectorAll(".other_mob_map_pos_" + (my_x+5) + "\\," + (my_y-5));
	          var player_array_4 = document.querySelectorAll(".other_mob_map_pos_" + (my_x-5) + "\\," + (my_y));
	          
	            var player_array_6 = document.querySelectorAll(".other_mob_map_pos_" + (my_x+5) + "\\," + (my_y));
	              var player_array_7 = document.querySelectorAll(".other_mob_map_pos_" + (my_x-5) + "\\," + (my_y+5));
	              
	                var player_array_8 = document.querySelectorAll(".other_mob_map_pos_" + (my_x) + "\\," + (my_y+5));
	                  var player_array_9 = document.querySelectorAll(".other_mob_map_pos_" + (my_x+5) + "\\," + (my_y+5));
	            
		    player_array_5.forEach(function(player){
		      
		      neutral_grab_result(player);
		    });
		    
		    player_array_1.forEach(function(player){
		      bottom_grab_result(player);
		    });
		    
		    player_array_2.forEach(function(player){
		       bottom_grab_result(player);
		      
		    });
		    
		    player_array_3.forEach(function(player){
		     bottom_grab_result(player);
		      
		    });
		    
		    player_array_4.forEach(function(player){
		   neutral_grab_result(player);
		      
		    });
		    
		    player_array_6.forEach(function(player){
		      neutral_grab_result(player);
		      
		    });
		    
		    player_array_7.forEach(function(player){
		      top_grab_result(player);
		      
		    });
		    
		    player_array_8.forEach(function(player){
		     top_grab_result(player);
		      
		    });
		    
		    player_array_9.forEach(function(player){
		     top_grab_result(player);
		      
		    });
	
  
      
      

  
  
  
  }catch(error){
     
   console.log("connection error disconnecting from user"); //add functionality here 
  }
  
}





function top_grab_result(player){
  //im grabbed

    game_grid.setAttribute("status", "grabbed");
	  game_grid.setAttribute("status_by", ("player,grabbed,"+Date.now()));
    if(player.getAttribute("connection_priority")=="receiver"){
        
        player.conn.send("gamestate_validation"+","+"grabbing");
        
    }

}

function neutral_grab_result(player){
  //left, right, if same pos 
    //sender goes left, receiver goes right
}

function bottom_grab_result(player){

  game_grid.setAttribute("status", "grabbing");
  game_grid.setAttribute("status_by", ("player,grabbing,"+Date.now()));
	if(player.getAttribute("connection_priority")=="receiver"){
        
        player.conn.send("gamestate_validation"+","+"grabbed");
    }

}