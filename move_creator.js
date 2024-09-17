


//for db, array is = name, starting damage
//total value for any move = 


function grab_creator(grab_frames, b1o, b2o, b3o){ //frames, button_1 option, button_1 damage, b2o, b2d, b3o, b3d

var move_database = document.getElementById("move_database");


	var validation = false;
	var grab_points = 1000;
	
	if(grab_frames >=2 && grab_frames<=20){ //min frames, max frames. Min == 400ms or 2 actions ->  4000ms or 20 actions
		grab_points-= (grab_frames/2)*100; //max frames causes you to only have moves with 0 grab_points
		validation = true; //valid amounts up to this point
	}
	
	
	if(validation == true){ //if grab_points was properly validated
		validation = false; //disable validation
		alert(move_database.getAttribute("move_grab_" + b1o));	
	}
}








function move_creator_menu_icon(){
     const bigSquare2 = document.createElement('div');
		bigSquare2.id = "move_creator_menu";
		bigSquare2.style.position = 'absolute';
  
		bigSquare2.style.width = 5 + "vw";
		bigSquare2.style.height = 5 + "vh";
  
		bigSquare2.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
		bigSquare2.style.border = '2px solid black';
  
		bigSquare2.style.left = 92.5 + "vw";
		bigSquare2.style.top = 2.5 + "vh";
  
		bigSquare2.style.zIndex = '5000';
  bigSquare2.setAttribute("status", "closed");
  
  bigSquare2.addEventListener('click', function() {
    if(bigSquare2.getAttribute("status") == "closed"){
     move_creator_menu_opened(bigSquare2);

    }
        });
    document.body.append(bigSquare2);
}
  

function move_creator_menu_opened(move_creator_menu){
        move_creator_menu.setAttribute("status", "opened");
      
            move_creator_menu.style.width = 95 + "vw";
		 move_creator_menu.style.height = 95 + "vh";
		 
			move_creator_menu.style.left = 2.5 + "vw"; //adjust position for new size
			move_creator_menu.style.backgroundColor = "rgba(250, 250, 250, 1)";
  
  
       const bigSquare2 = document.createElement('div');
		bigSquare2.id = "move_menu_closer";
		bigSquare2.style.position = 'absolute';
  
		bigSquare2.style.width = 5 + "vw";
		bigSquare2.style.height = 5 + "vh";
  
		bigSquare2.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
		bigSquare2.style.border = '2px solid black';
  
		bigSquare2.style.left = 92.5 + "vw";
		bigSquare2.style.top = 2.5 + "vh";
  
		bigSquare2.style.zIndex = '5002';
  bigSquare2.setAttribute("status", "closed");
  
  bigSquare2.addEventListener('click', function() {
    if(bigSquare2.getAttribute("status") == "closed"){
      move_creator_menu_closed(move_creator_menu,bigSquare2);

    }
        });
    document.body.append(bigSquare2);
 populate_move_menu(move_creator_menu);
}
  
  function move_creator_menu_closed(bigSquare2, closer){
    closer.remove();
    bigSquare2.setAttribute("status", "closed");
    bigSquare2.innerHTML = "";
  
    
    bigSquare2.style.width = 5 + "vw";
		bigSquare2.style.height = 5 + "vh";
    
    bigSquare2.style.left = 92.5 + "vw";
		bigSquare2.style.top = 2.5 + "vh";
  
  bigSquare2.style.backgroundColor = "rgba(128, 128, 128, 0.5)";
  }


  function populate_move_menu(move_menu){
    
    var option_div = document.createElement('div');
    option_div.setAttribute("id", "option_div");
    
    var option_list = document.createElement('select');
    option_list.setAttribute("id", "option_list");
    
    option_div.appendChild(option_list);
    move_menu.appendChild(option_div);
    
    option_div.style.width = '100%';
    option_div.style.height = "20%";
    
    option_div.style.position ="relative";
    
    option_list.style.width = '100%';
    option_list.style.height = "100%";
    
    option_list.style.position ="relative";
    
    
    
    var div_list = document.createElement('div');
    div_list.setAttribute("id", "div_list");
    
    move_menu.appendChild(div_list);
    div_list.style.position = "relative";

    
    
    div_list.style.width = "100%";
    div_list.style.height="80%";
   
    
    
    
    option_list.addEventListener('change', function() {
      div_list.innerHTML = "";
      if(option_list.value == 0){
          create_move_menu(move_menu);
		  create_menu_players(div_list);
      }
    });
    
select_list_options(option_list, 0, "Create Move");
    select_list_options(option_list, 1,"Assign Moves");
 create_move_menu(move_menu); //since starts at 0
 create_menu_players(div_list);
  }

function select_list_options(list, value, text){
    var temp_var = document.createElement('option');
    temp_var.textContent = text;
    temp_var.value = value;
    
    list.appendChild(temp_var);
  }

function create_move_menu(option_div){
    var move_type_list = document.createElement('select');
move_type_list.setAttribute("id", "move_type_list");
    
    option_div.appendChild(move_type_list);
    move_type_list.style.position = "absolute";
    
    move_type_list.style.height = "10vh";
    move_type_list.style.width = "25vw";
    
    move_type_list.style.top ="25vh";
    move_type_list.style.left="5vw";
	
	
	
	var move_base_list = document.createElement('select');
	move_base_list.setAttribute("id", "move_base_list");
	
	option_div.appendChild(move_base_list);
	move_base_list.style.position = "absolute";
	
	move_base_list.style.height = "10vh";
	move_base_list.style.width = "25vw";
	
	move_base_list.style.top = "25vh";
	move_base_list.style.left = "35vw";
    
        
    select_list_options(move_type_list, 0, "Neutral Attacks");
    select_list_options(move_type_list, 1, "Grab Attacks");
    
    select_list_options(move_type_list, 2, "Utility Attacks");
    select_list_options(move_type_list, 3, "Defense Attacks");
	
	

	move_type_list.addEventListener('change', function() {
		var move_database = document.getElementById("move_database");
		if(move_type_list.value == 1){
			  select_list_options(move_base_list, 0, move_database.getAttribute("move_grab_" + 0));
	    }
	});


}


function create_menu_players(move_menu){
	var m_player_1 = document.createElement('div');
	m_player_1.setAttribute("id", "menu_player_1");
	
	var m_player_2 = document.createElement('div');
	m_player_2.setAttribute("id", "menu_player_2");
	
	 move_menu.appendChild(m_player_1);	 	
	 move_menu.appendChild(m_player_2);
	
	m_player_1.style.width = 5 + "vw";//removed custom for now
		
		m_player_1.style.height = 10 + "vh";
		m_player_1.style.position = 'absolute';
		
		m_player_1.style.backgroundColor = 'gray'; //temporary
		
		
	m_player_2.style.width = 5 + "vw";//removed custom for now
		
		m_player_2.style.height = 10 + "vh";
		m_player_2.style.position = 'absolute';
		
		m_player_2.style.backgroundColor = 'gray'; //temporary
	
	
	m_player_1.style.zIndex = "5007";
	m_player_2.style.zIndex = "5007";
	
	m_player_1.style.top = "30vh";
	m_player_1.style.left = "5vw";
	
	m_player_2.style.top = "30vh";
	m_player_2.style.left = "85vw";
}

move_creator_menu_icon(); //creates move creator menu