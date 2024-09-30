
/*To do list:
-keyboard controls fixed-keyboard aim 
-mouse click aim
-login only allows one uid at a time
-saving and updating login position

*/




document.body.classList.add('no-scroll');

//const game_grid = document.getElementById("game_grid");
//NOTE -> player stores info for inputs by users but game_grid is shared data among online players (like positions and game states and moves)
game_grid.innerHTML = "";

game_grid.classList.add("Game_Grid");
game_grid.setAttribute("id", "game_grid");


 
	
    game_grid.setAttribute("x_pos",0);
    game_grid.setAttribute("y_pos", 0);
  
    game_grid.setAttribute("old_x_pos", 0);
    game_grid.setAttribute("old_y_pos", 0);
    
    game_grid.setAttribute("column_right_pos", 1000);
    game_grid.setAttribute("column_left_pos", -1000);
    
    game_grid.setAttribute("column_up_pos", -1000);
    game_grid.setAttribute("column_down_pos", 1000);
	
	
	
	
	
	 //default player stats
	
	game_grid.setAttribute("status", "default"); //default state, can do any actions
	game_grid.setAttribute("frames", 0); //frames that are applied and used for either counting down until freedom, or how long you have until you can attack/move
	
	game_grid.setAttribute("mhealth", 100);
	game_grid.setAttribute("health", 100);

              


	// Create the player div
	create_player("player", "user", 5, 10, 50, 50);
	create_touch_controls();
	
	
	
	
var	isTouchDown = false;
var isKeyDown = false;

var isAttackDown = false;
var keys_down = ["", ""];
  
  var start_point = [0,0];
  
 
	var timeout_Id;
	
	
	//Touch version
	document.addEventListener('touchstart', function(){
		isTouchDown = true;
	  
	      
			
		start_point[0] = event.touches[0].clientX;
	  start_point[1] = event.touches[0].clientY;
	  
	  console.log(start_point);
        action_delay_processor(event);
	  
		if(softlock_check == false && game_grid.getAttribute("status") != "default"){
		  softlock_check = true;
		  setTimeout(function() {
		      
		  
		  status_check_loop();
		  softlock_check = false;
		  },10000);
		}
	});


	document.addEventListener('touchmove', function(event) {
		player_input(event);
	});


	document.addEventListener('touchend', function(){
		isTouchDown = false;
		clearTimeout(timeout_Id);
	  start_point =[0,0];
	});
	
	


	//Keyboard version
	document.addEventListener('keydown', function(event) { 

		var player = document.getElementById("player");
		
		if(event.key == player.getAttribute("button_0_control")){
			  if(isAttackDown == false){
            isAttackDown = true;
            result = "button_0";
            action_delay_processor(event);
      }
		}
		if(event.key ==player.getAttribute("button_1_control")){
			  if(isAttackDown == false){
            isAttackDown = true;
            result = "button_1";
            action_delay_processor(event);
      }
		}
		if(event.key ==player.getAttribute("button_2_control")){
			  if(isAttackDown == false){
            isAttackDown = true;
            result = "button_2";
            action_delay_processor(event);
      }
		}
		
		
		
		
		if(isKeyDown == false ){
			if(event.key == player.getAttribute("up_direction_control") || event.key == player.getAttribute("left_direction_control") || event.key == player.getAttribute("down_direction_control") || event.key == player.getAttribute("right_direction_control")){
				isKeyDown = true;
				action_delay_processor(event);
			}
		}
		


		player_input(event);
		
		
			
		
	});
	
	document.addEventListener('keyup', function(event) {


		
		//movement
		if(event.key == player.getAttribute("up_direction_control")){
			result = "h" + result.substring(1, 4);
		} else if (event.key == player.getAttribute("down_direction_control")){
			result = result.substring(0,1) + "a" + result.substring(2, 4);
		}

		if (event.key == player.getAttribute("left_direction_control")){
			result = result.substring(0,2) + "h" + result.substring(3, 4);
		}else if (event.key == player.getAttribute("right_direction_control")){
			result = result.substring(0,3) + "a";
		}

		if(result == "haha" || result.length >4){
		  result = "haha";
			isKeyDown = false;
			clearTimeout(timeout_Id);
		}	
	});
  
  
  
var softlock_check = false;
var send_lock = false;
  	function action_delay_processor(event){
  	    
  	    
		
		if(isTouchDown == true || isKeyDown == true){
		  if(isAttackDown == false &&game_grid.getAttribute("status") == "default" ){ //cant move during attack animation
		
      game_grid.setAttribute("status", "walking");
		              game_grid.setAttribute("status_by", ("player,walking_start,"+Date.now()));
  	 	input_tracker_update(result);       
  	 	if(send_lock == false){
    process_data_to_send("movement");
    send_lock = true;
  	 	}
		    timeout_Id = setTimeout(function() {
		      
	
			base_movement_animation(result);
			  player_movement(result);
        send_lock = false;
		
		if(game_grid.getAttribute("status") == "walking"){
	    game_grid.setAttribute("status", "default");
		               game_grid.setAttribute("status_by", ("player,walking_reset,"+Date.now()));
		}
			action_delay_processor(event);
		
       	
			    
			    
		}, 100);
		}
			

		}
		
		
		
		
		if(isAttackDown == true && (game_grid.getAttribute("status") == "default" || game_grid.getAttribute("status") == "grabbing")){
    
  	  	input_tracker_update(result);
		  process_data_to_send("attack");

			timeout_Id = setTimeout(function() {
			  	isAttackDown = false;
				action_delay_processor(event);
			  //put animation process here
				//removed changing status for now since grabbing attacks and default attacks are different
   
  	        
		}, 100);
		
			}
  	    
  	    
  	    
  	    if(game_grid.getAttribute("status") == "walking" || game_grid.getAttribute("status") == "attacking"){
  	       game_grid.setAttribute("status", "default");
  	      game_grid.setAttribute("status_by", "player,walking_reset,"+Date.now());
  	        
		}
	
	}

  
  

  
  
  
  
	var past_x = 0;
	var past_y = 0;
	
	var result = "haha";
	var player_input_value = "";
	

	
	
	
	function player_input(event){ //based on sensitivity, will detect player inputs

		 if (isTouchDown){
			
			var touchX = event.touches[0].clientX;
			var touchY = event.touches[0].clientY;
			
			
			result = "";
			
			if(touchY+20 < start_point[1]){
				result += "U";
			} else if (touchY-20 > start_point[1]){
				result += "D";
			}
			
			
			if(touchX+15 < start_point[0]){
					result += "L";
				} else if (touchX-15 > start_point[0]){
					result += "R";
				}
	  
			update_current_moves();
	  
	  
	  
		} else if(isKeyDown){
		
			if(event.key == player.getAttribute("up_direction_control")){
				result = "U" + result.substring(1, 4);
			} else if (event.key == player.getAttribute("down_direction_control")){
				result = result.substring(0,1) + "D" + result.substring(2, 4);
			}

			if (event.key == player.getAttribute("left_direction_control")){
				result = result.substring(0,2) + "L" + result.substring(3, 4);
			}else if (event.key == player.getAttribute("right_direction_control")){
				result = result.substring(0,3) + "R";
			}

			update_current_moves();
		}			
	}





	function player_movement(type){
		x = 0;
		while(x!= type.length){
			if(type.substring(x,x+1) == "U"){
				var temp = parseInt(game_grid.getAttribute("y_pos"));						
				//game_grid.style.top = (temp+5) + "%";
				game_grid.setAttribute("y_pos", temp+5);
        
        
        
        
        if (parseInt(game_grid.getAttribute("y_pos")) > parseInt(game_grid.getAttribute("old_y_pos"))) {


					generate_cell("up");
					
					game_grid.setAttribute("old_y_pos", (parseInt(game_grid.getAttribute("old_y_pos"))+1000) );
          
          game_grid.setAttribute("column_down_pos", (parseInt(game_grid.getAttribute("column_down_pos"))-1000));
          game_grid.setAttribute("column_up_pos", (parseInt(game_grid.getAttribute("column_up_pos"))-1000));
          
					
				}
				
				if(parseInt(game_grid.getAttribute("y_pos")) > parseInt(game_grid.getAttribute("old_y_pos")) && parseInt(game_grid.getAttribute("old_y_pos")) == 0){
					generate_cell("up");
					
					game_grid.setAttribute("old_y_pos", (parseInt(game_grid.getAttribute("old_y_pos"))+1000) );
          
          game_grid.setAttribute("column_down_pos", (parseInt(game_grid.getAttribute("column_down_pos"))-1000));
          game_grid.setAttribute("column_up_pos", (parseInt(game_grid.getAttribute("column_up_pos"))-1000));
          
          
				}
			} else if(type.substring(x,x+1) == "D"){
				var temp = parseInt(game_grid.getAttribute("y_pos"));						
				//game_grid.style.top = (temp -2) + "%";
				game_grid.setAttribute("y_pos", temp-5);
        
        
        
        if (parseInt(game_grid.getAttribute("y_pos")) < parseInt(game_grid.getAttribute("old_y_pos"))) {


					generate_cell("down");
					
					game_grid.setAttribute("old_y_pos", (parseInt(game_grid.getAttribute("old_y_pos"))-1000) );
          
          game_grid.setAttribute("column_down_pos", (parseInt(game_grid.getAttribute("column_down_pos"))+1000));
          game_grid.setAttribute("column_up_pos", (parseInt(game_grid.getAttribute("column_up_pos"))+1000));
          
					
				}
				
				if(parseInt(game_grid.getAttribute("y_pos")) < parseInt(game_grid.getAttribute("old_y_pos")) && parseInt(game_grid.getAttribute("old_y_pos")) == 0){
					generate_cell("down");
					
					game_grid.setAttribute("old_y_pos", (parseInt(game_grid.getAttribute("old_y_pos"))-1000) );
          
          game_grid.setAttribute("column_down_pos", (parseInt(game_grid.getAttribute("column_down_pos"))+1000));
          game_grid.setAttribute("column_up_pos", (parseInt(game_grid.getAttribute("column_up_pos"))+1000));

        	}
        
			} else if(type.substring(x,x+1) == "L"){
				var temp = parseInt(game_grid.getAttribute("x_pos"));						
				//game_grid.style.left = (temp+5) + "%";
				game_grid.setAttribute("x_pos", temp+5);
				
				var temp_test = parseInt(game_grid.getAttribute("old_x_pos"));
  
		
				
				if (parseInt(game_grid.getAttribute("x_pos")) > parseInt(game_grid.getAttribute("old_x_pos"))) {


					generate_cell("left");
					
					game_grid.setAttribute("old_x_pos", (parseInt(game_grid.getAttribute("old_x_pos"))+1000) );
          
          game_grid.setAttribute("column_right_pos", parseInt(game_grid.getAttribute("column_right_pos"))-1000);
          game_grid.setAttribute("column_left_pos", parseInt(game_grid.getAttribute("column_left_pos"))-1000);
          
					
				}
				
				if(parseInt(game_grid.getAttribute("x_pos")) > parseInt(game_grid.getAttribute("old_x_pos")) && parseInt(game_grid.getAttribute("old_x_pos")) == 0){
					generate_cell("left");
					
					game_grid.setAttribute("old_x_pos", (parseInt(game_grid.getAttribute("old_x_pos"))+1000) );
          
          game_grid.setAttribute("column_right_pos", parseInt(game_grid.getAttribute("column_right_pos"))-1000);
          game_grid.setAttribute("column_left_pos", parseInt(game_grid.getAttribute("column_left_pos"))-1000);
				}
				
			
			}else if(type.substring(x,x+1) == "R"){
				var temp = parseInt(game_grid.getAttribute("x_pos"));						
				//game_grid.style.left = (temp-2) + "%";   handled in animation now
				game_grid.setAttribute("x_pos", temp-5);
			
        
				if (parseInt(game_grid.getAttribute("x_pos")) < parseInt(game_grid.getAttribute("old_x_pos")))  {
					generate_cell("right");
					
					game_grid.setAttribute("old_x_pos", (parseInt(game_grid.getAttribute("old_x_pos"))-1000) );
          
					game_grid.setAttribute("column_right_pos", parseInt(game_grid.getAttribute("column_right_pos"))+1000);
          game_grid.setAttribute("column_left_pos", parseInt(game_grid.getAttribute("column_left_pos"))+1000);
				}
				
				if(parseInt(game_grid.getAttribute("x_pos")) < parseInt(game_grid.getAttribute("old_x_pos")) && parseInt(game_grid.getAttribute("old_x_pos")) == 0){
					generate_cell("right");
					
					game_grid.setAttribute("old_x_pos", (parseInt(game_grid.getAttribute("old_x_pos"))-1000) );
          
          game_grid.setAttribute("column_right_pos", parseInt(game_grid.getAttribute("column_right_pos"))+1000);
          game_grid.setAttribute("column_left_pos", parseInt(game_grid.getAttribute("column_left_pos"))+1000);
				}
				
			}
			
			
			x+=1;
		}
    
//console.log(game_grid.getAttribute("y_pos") + "/" + game_grid.getAttribute("old_y_pos"));
    
  }


  
  
  
  


	 
	  
	  
	 

	
      

    
  
	
	
	
	function create_player(id, type, width, height, top, left){
		new_player = document.createElement('div');
		
		new_player.id = id;
		new_player.style.width = width + "vw";//removed custom for now
		
		new_player.style.height = height + "vh";
		new_player.style.position = 'absolute';
		
		new_player.style.backgroundColor = 'gray'; //temporary
		new_player.style.top = top + "vh";
		
		new_player.style.left = left + "vw";
		
		
		if(type == "user"){ //player charac4er
			
			new_player.setAttribute("button_0_control", "u");
			new_player.setAttribute("button_1_control", "i");
			
			new_player.setAttribute("button_2_control", "o");
			
			new_player.setAttribute("up_direction_control", "w");
			new_player.setAttribute("left_direction_control", "a");
			
			new_player.setAttribute("down_direction_control", "s");
			new_player.setAttribute("right_direction_control", "d");
			
		    document.body.appendChild(new_player);
			
			assign_default_values(); // assigns base move values to game grid
		} else{
  game_grid.appendChild(new_player);
		}
	
	}

  
  var past_result = "";
  
  
  
  
  function update_current_moves(){
    if(past_result != result){
      past_result = result;
      
      var counter = 0;
      while(counter !=3){
        var temp_div = document.getElementById("button_"+counter);
        temp_div.style.backgroundColor = getRandomColor();
        temp_div.setAttribute("attack_direction", result);
        counter+=1;
      }
    }
  }
  
  
  
  
	function create_touch_controls(){
	  
	  var counter = 0;
	  while(counter!=3){
	    create_square_ui("button_"+counter, 10, 10, (62.5+(counter*10)+(counter*2.5)), 80);
	    counter+=1;
	  }
	  

	}


function create_square_ui(sq_id, sq_width, sq_height,sq_left, sq_top){
 const bigSquare2 = document.createElement('div');
		bigSquare2.id = sq_id;
		bigSquare2.style.position = 'absolute';
  
		bigSquare2.style.width = sq_width + "vw";
		bigSquare2.style.height = sq_height + "vh";
  
		bigSquare2.style.backgroundColor = 'gray';
		bigSquare2.style.border = '2px solid black';
  
		bigSquare2.style.left = sq_left + "%";
		bigSquare2.style.top = sq_top + "%";
  
		bigSquare2.style.zIndex = '2000';
  
  bigSquare2.addEventListener('click', function(event) {
      if(isAttackDown == false){
            isAttackDown = true;
            result = bigSquare2.id;
            action_delay_processor(event);
      }
        });
    

  
  bigSquare2.setAttribute("attack_direction", "R");
		document.body.appendChild(bigSquare2);
}



//new stuff here
// Function to create a random hex color
function getRandomColor() {
    var color;
    do {
        color = '#' + Math.floor(Math.random() * 16777215).toString(16);
    } while (parseInt(color.substring(1), 16) > 0xcccccc); // Check if the color is too light
    return color;
}


  
  
  
  
  
  
gameGrid = document.getElementById("game_grid");

function generate_cell(direction){
	
	if(direction == "startup"){
		var counter = 0;
		while(counter !=9){
		
		  var top_value = 0;

		  
		  if(counter >=3){
			top_value = 1;

		  } 
		  if(counter >=6){
			top_value = 2;

		  }
		  
		  var startup_div = document.createElement('div');
		  startup_div.id = "cell_"+ ((parseInt(game_grid.getAttribute("old_x_pos")-1000) + ((counter-(top_value*3))*1000)))+ ","+(parseInt(game_grid.getAttribute("old_y_pos")) + ((top_value*1000)-1000));
		  startup_div.className = "game_cell";
		  
		  startup_div.style.width = "1000vw";
		  startup_div.style.height = "1000vh";
		  
		  startup_div.style.border = "5px solid black";
		  startup_div.style.backgroundColor = getRandomColor();


		  // Set the position
		  startup_div.style.position = "absolute";
		  startup_div.style.left = (parseInt(game_grid.getAttribute("old_x_pos")-1000) + (((counter-(top_value*3))*1000)))+"%";
		  
		  startup_div.style.top = (parseInt(game_grid.getAttribute("old_y_pos")) + ((top_value*1000) -1000))+"%";
		  // Append the div to the game_grid container

		  console.log(startup_div.id);
		  gameGrid.appendChild(startup_div);
			counter+=1;
		
		}
	  
    }
   else if(direction == "left"){ //negative because old_x_pos increases in reverse values to the positioning due to how the game world is moving in oppposition
	    var counter = 0;
		while(counter !=3){
		var col_right = parseInt(game_grid.getAttribute("column_right_pos"));
    var col_left = parseInt(game_grid.getAttribute("column_left_pos"));
		console.log("looking for: " +  "cell_"+ col_right+ ","+(parseInt(game_grid.getAttribute("column_up_pos"))+ ((counter*1000))));
			 var startup_div = document.getElementById("cell_"+ col_right+ ","+(parseInt(game_grid.getAttribute("column_up_pos"))+ ((counter*1000))));
			 
		  startup_div.id = "cell_"+ (col_left-1000)+ ","+(parseInt(game_grid.getAttribute("column_up_pos"))+ ((counter*1000)));
		  startup_div.className = "game_cell";
		  
		  startup_div.style.width = "1000vw";
		  startup_div.style.height = "1000vh";
		  
		  startup_div.style.border = "5px solid black";
		  startup_div.style.backgroundColor = getRandomColor();


		  // Set the position
		  startup_div.style.position = "absolute";
		  startup_div.style.left = (col_left-1000)+"%";
		  
		  startup_div.style.top = (parseInt(game_grid.getAttribute("column_up_pos"))+ (counter*1000))+"%";
		  // Append the div to the game_grid container

		  console.log(startup_div.id);
		  gameGrid.appendChild(startup_div);
			
			counter+=1;
		}
	}
	
  else if(direction == "right"){ //negative because old_x_pos increases in reverse values to the positioning due to how the game world is moving in oppposition
	    var counter = 0;
		while(counter !=3){
		var col_right = parseInt(game_grid.getAttribute("column_right_pos"));
    var col_left = parseInt(game_grid.getAttribute("column_left_pos"));
		console.log("looking for: " +  "cell_"+ col_left+ ","+(parseInt(game_grid.getAttribute("column_up_pos"))+ ((counter*1000))));
			 var startup_div = document.getElementById("cell_"+ col_left+ ","+(parseInt(game_grid.getAttribute("column_up_pos"))+ ((counter*1000))));
			 
		  startup_div.id = "cell_"+ (col_right+1000)+ ","+(parseInt(game_grid.getAttribute("column_up_pos"))+ ((counter*1000)));
		  startup_div.className = "game_cell";
		  
		  startup_div.style.width = "1000vw";
		  startup_div.style.height = "1000vh";
		  
		  startup_div.style.border = "5px solid black";
		  startup_div.style.backgroundColor = getRandomColor();


		  // Set the position
		  startup_div.style.position = "absolute";
		  startup_div.style.left = (col_right+1000)+"%";
		  
		  startup_div.style.top = (parseInt(game_grid.getAttribute("column_up_pos"))+ (counter*1000))+"%";
		  // Append the div to the game_grid container

		  console.log(startup_div.id);
		  gameGrid.appendChild(startup_div);
			
			counter+=1;
		}
	}
    
    
    
    else if(direction =="up"){
    var counter = 0;
		while(counter !=3){
		var col_up = parseInt(game_grid.getAttribute("column_up_pos"));
    var col_down = parseInt(game_grid.getAttribute("column_down_pos"));
		console.log("looking for: " +  "cell_"+ (parseInt(game_grid.getAttribute("column_left_pos"))+ ((counter*1000))+ ","+ col_down));
			 var startup_div = document.getElementById("cell_"+ (parseInt(game_grid.getAttribute("column_left_pos"))+ ((counter*1000))+ ","+ col_down));
			 
		  startup_div.id = "cell_"+ (parseInt(game_grid.getAttribute("column_left_pos"))+ ((counter*1000)))+ ","+ (col_up-1000);
		  startup_div.className = "game_cell";
		  
		  startup_div.style.width = "1000vw";
		  startup_div.style.height = "1000vh";
		  
		  startup_div.style.border = "5px solid black";
		  startup_div.style.backgroundColor = getRandomColor();


		  // Set the position
		  startup_div.style.position = "absolute";
      startup_div.style.left = (parseInt(game_grid.getAttribute("column_left_pos"))+ (counter*1000))+"%";
		  
		  startup_div.style.top = col_up-1000 + "%";
		  // Append the div to the game_grid container

		  console.log(startup_div.id);
		  gameGrid.appendChild(startup_div);
			
			counter+=1;
      }
    } else if(direction =="down"){
    var counter = 0;
		while(counter !=3){
		var col_up = parseInt(game_grid.getAttribute("column_up_pos"));
    var col_down = parseInt(game_grid.getAttribute("column_down_pos"));
		console.log("looking for: " +  "cell_"+ (parseInt(game_grid.getAttribute("column_left_pos"))+ ((counter*1000))+ ","+ col_up));
			 var startup_div = document.getElementById("cell_"+ (parseInt(game_grid.getAttribute("column_left_pos"))+ ((counter*1000))+ ","+ col_up));
			 
		  startup_div.id = "cell_"+ (parseInt(game_grid.getAttribute("column_left_pos"))+ ((counter*1000)))+ ","+ (col_down+1000);
		  startup_div.className = "game_cell";
		  
		  startup_div.style.width = "1000vw";
		  startup_div.style.height = "1000vh";
		  
		  startup_div.style.border = "5px solid black";
		  startup_div.style.backgroundColor = getRandomColor();


		  // Set the position
		  startup_div.style.position = "absolute";
      startup_div.style.left = (parseInt(game_grid.getAttribute("column_left_pos"))+ (counter*1000))+"%";
		  
		  startup_div.style.top = col_down+1000 + "%";
		  // Append the div to the game_grid container

		  console.log(startup_div.id);
		  gameGrid.appendChild(startup_div);
			
			counter+=1;
      }
	}
}


    


//game starts here

	
	
	function change_value(value, amount){ //function to adjust integers with consistent logic
		if(value < 0){
			if(amount < 0){
				return value + amount;
			} else{			
				return value + amount;
			}
		} else{
			if(amount < 0){
				return value + amount;
			} else{
				return value + amount;
			}
		
		}
	}
	
		
var test_var = 0;
	  function custom_map_pos(x_pos, y_pos, type){
	  
	  if(type == "player"){
		game_grid.setAttribute("x_pos",x_pos);
		game_grid.setAttribute("y_pos", y_pos);
	
			if(test_var == 0){
			    		generate_cell("startup");
			}
test_var+=1;
	      
		player_movement("UL"); 
		 game_grid.style.left = x_pos + "vw"; // Set final left position
        game_grid.style.top = y_pos + "vh"; // Set final top position
        
	  } else if(type != "player"){
	    
	    var player = document.getElementById(type);
	    player.setAttribute("x_value", parseInt(x_pos)*-1);
	    player.setAttribute("y_value", parseInt(y_pos)*-1);
	    
	    player.style.left = (parseInt(x_pos)*-1+50)+"vw";
	     player.style.top = (parseInt(y_pos)*-1+50)+"vh";
	  }

	  }
		
		

 
 
 
 

 function assign_default_values(){
	 var game_grid = document.getElementById("game_grid");
// All the controls processed here
		//controls for attacks - button 0
		game_grid.setAttribute("n_button_0", "button 0 5 for testing"); //n
		game_grid.setAttribute("dl_button_0", "no"); //dl

		game_grid.setAttribute("d_button_0", "null"); //d
		game_grid.setAttribute("dr_button_0", "null"); //dr

		game_grid.setAttribute("l_button_0", "null"); //l
		game_grid.setAttribute("r_button_0", "null"); //r

		game_grid.setAttribute("ul_button_0", "null"); //ul
		game_grid.setAttribute("u_button_0", "null"); //u

		game_grid.setAttribute("ur_button_0", "null"); //ur

		//controls for attacks - button 1
		game_grid.setAttribute("n_button_1", "null"); //n
		game_grid.setAttribute("dl_button_1", "null"); //dl

		game_grid.setAttribute("d_button_1", "null"); //d
		game_grid.setAttribute("dr_button_1", "null"); //dr

		game_grid.setAttribute("l_button_1", "null"); //l
		game_grid.setAttribute("r_button_1", "null"); //r

		game_grid.setAttribute("ul_button_1", "null"); //ul
		game_grid.setAttribute("u_button_1", "null"); //u

		game_grid.setAttribute("ur_button_1", "null"); //ur

		//controls for attacks - button 2
		game_grid.setAttribute("n_button_2", "null"); //n
		game_grid.setAttribute("dl_button_2", "null"); //dl

		game_grid.setAttribute("d_button_2", "null"); //d
		game_grid.setAttribute("dr_button_2", "null"); //dr

		game_grid.setAttribute("l_button_2", "null"); //l
		game_grid.setAttribute("r_button_2", "null"); //r

		game_grid.setAttribute("ul_button_2", "null"); //ul
		game_grid.setAttribute("u_button_2", "null"); //u

		game_grid.setAttribute("ur_button_2", "null"); //ur

		//controls for grabs
		//controls for grab attacks - button 0
		game_grid.setAttribute("grab_5_button_0", "null"); //n
		game_grid.setAttribute("grab_1_button_0", "null"); //dl

		game_grid.setAttribute("grab_2_button_0", "null"); //d
		game_grid.setAttribute("grab_3_button_0", "null"); //dr

		game_grid.setAttribute("grab_4_button_0", "null"); //l
		game_grid.setAttribute("grab_6_button_0", "null"); //r

		game_grid.setAttribute("grab_7_button_0", "null"); //ul
		game_grid.setAttribute("grab_8_button_0", "null"); //u

		game_grid.setAttribute("grab_9_button_0", "null"); //ur

		//controls for grab attacks - button 1
		game_grid.setAttribute("grab_5_button_1", "null"); //n
		game_grid.setAttribute("grab_1_button_1", "null"); //dl

		game_grid.setAttribute("grab_2_button_1", "null"); //d
		game_grid.setAttribute("grab_3_button_1", "null"); //dr

		game_grid.setAttribute("grab_4_button_1", "null"); //l
		game_grid.setAttribute("grab_6_button_1", "null"); //r

		game_grid.setAttribute("grab_7_button_1", "null"); //ul
		game_grid.setAttribute("grab_8_button_1", "null"); //u

		game_grid.setAttribute("grab_9_button_1", "null"); //ur

		//controls for grab attacks - button 2
		game_grid.setAttribute("grab_5_button_2", "null"); //n
		game_grid.setAttribute("grab_1_button_2", "null"); //dl

		game_grid.setAttribute("grab_2_button_2", "null"); //d
		game_grid.setAttribute("grab_3_button_2", "null"); //dr

		game_grid.setAttribute("grab_4_button_2", "null"); //l
		game_grid.setAttribute("grab_6_button_2", "null"); //r

		game_grid.setAttribute("grab_7_button_2", "null"); //ul
		game_grid.setAttribute("grab_8_button_2", "null"); //u

		game_grid.setAttribute("grab_9_button_2", "null"); //ur

		//controls for being hit
		game_grid.setAttribute("onhit_button_0", "null"); //defense tool 1
		game_grid.setAttribute("onhit_button_1", "null"); //defense tool 2

		game_grid.setAttribute("onhit_button_2", "null"); //defense tool 3
	 
	 game_grid.setAttribute("base_grab", 5); //5* 200ms base = 1s
	 game_grid.setAttribute("status_by", "user" + "," + "move_type" +"," + Date.now());
		        
 }