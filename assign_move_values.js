

function requested_move_validation(other_player, data_array){

	other_player.setAttribute("moves_validated", "yes");
	
}


function send_move_validation(other_player){
	try{
	other_player.conn.send("moves_to_validate" +"," + game_grid.getAttribute("5_button_0"));
	}catch(error){
		
	}
	/*+game_grid.getAttribute("1_button_0")+game_grid.getAttribute("2_button_0")
	+game_grid.getAttribute("3_button_0")+game_grid.getAttribute("4_button_0")+game_grid.getAttribute("6_button_0")+game_grid.getAttribute("7_button_0")
	+game_grid.getAttribute("8_button_0")+game_grid.getAttribute("9_button_0")
	+game_grid.getAttribute("5_button_1")+game_grid.getAttribute("1_button_1")+game_grid.getAttribute("2_button_1")+game_grid.getAttribute("3_button_1")
	+game_grid.getAttribute("4_button_1")+game_grid.getAttribute("6_button_1")+game_grid.getAttribute("7_button_1")+game_grid.getAttribute("8_button_1")
	+game_grid.getAttribute("9_button_1") 
	+game_grid.getAttribute("5_button_2")+game_grid.getAttribute("1_button_2")+game_grid.getAttribute("2_button_2")+game_grid.getAttribute("3_button_2")
	+game_grid.getAttribute("4_button_2")+game_grid.getAttribute("6_button_2")+game_grid.getAttribute("7_button_2")+game_grid.getAttribute("8_button_2")
	+game_grid.getAttribute("9_button_2")
	
	+game_grid.getAttribute("grab_5_button_0")+game_grid.getAttribute("grab_1_button_0")+game_grid.getAttribute("grab_2_button_0")
	+game_grid.getAttribute("grab_3_button_0")+game_grid.getAttribute("grab_4_button_0")+game_grid.getAttribute("grab_6_button_0")+game_grid.getAttribute("grab_7_button_0")
	+game_grid.getAttribute("grab_8_button_0")+game_grid.getAttribute("grab_9_button_0")
	+game_grid.getAttribute("grab_5_button_1")+game_grid.getAttribute("grab_1_button_1")+game_grid.getAttribute("grab_2_button_1")+game_grid.getAttribute("grab_3_button_1")
	+game_grid.getAttribute("grab_4_button_1")+game_grid.getAttribute("grab_6_button_1")+game_grid.getAttribute("grab_7_button_1")+game_grid.getAttribute("grab_8_button_1")
	+game_grid.getAttribute("grab_9_button_1") 
	+game_grid.getAttribute("grab_5_button_2")+game_grid.getAttribute("grab_1_button_2")+game_grid.getAttribute("grab_2_button_2")+game_grid.getAttribute("grab_3_button_2")
	+game_grid.getAttribute("grab_4_button_2")+game_grid.getAttribute("grab_6_button_2")+game_grid.getAttribute("grab_7_button_2")+game_grid.getAttribute("grab_8_button_2")
	+game_grid.getAttribute("grab_9_button_2")
	
		+game_grid.getAttribute("onhit_button_0")+game_grid.getAttribute("onhit_button_1")+game_grid.getAttribute("onhit_button_2"));*/

}
