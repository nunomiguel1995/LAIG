/* Functions to Prolog server */

MyGameboard.prototype.getPrologRequest = function(requestString, onSuccess, onError, port){
  var requestPort = port || 8081
	var request = new XMLHttpRequest();
  var gameboard = this;
	request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

	request.onload = onSuccess ||
  function(data){
    console.log("Request successful. Reply: " + data.target.response);
    var response = data.target.response;
    var cmd = requestString.substring(0,7);

    if(response == 'quit'){
      gameboard.scene.setPickEnabled(false);
      gameboard.initBoardMatrix();
      gameboard.history = [];
      gameboard.scene.movie = [];
      gameboard.scene.playing = false;
    }else if(response == 'player1lost'){
      //Show Winner
      console.log("Player 2 is the Winner");
      gameboard.scene.playing = false;
      gameboard.scene.player2won = true;
      gameboard.scene.setPickEnabled(false);
    }else if (response == 'player2lost') {
      //Show Winner
      console.log("Player 1 is the Winner");
      gameboard.scene.playing = false;
      gameboard.scene.player1won = true;
      gameboard.scene.setPickEnabled(false);
    }else if(response != 'Bad Request'){
        var subrequest = requestString.substring(0,7);
        //console.log(subrequest);
        if(requestString == 'startgame'){
          var newBoardMatrix = gameboard.translateProlgBoard(data.target.response);
          gameboard.updateBoardMatrix(newBoardMatrix);
          gameboard.history.push(gameboard.matrix);
          gameboard.scene.movie.push(gameboard.matrix);
          gameboard.scene.playing = true;
          gameboard.scene.player1Turn = true;
          gameboard.scene.player1won = false;
          gameboard.scene.player2won = false;
        }else if(subrequest == 'playBot' && response == 'noMove') {
          if(!gameboard.scene.player1Turn)
            gameboard.scene.botplay1 = false;
          else
            gameboard.scene.botplay2 = false;
        }else if(response != 'player1continues' && response != 'player2continues'){
          if(response != 'noMove'){
            gameboard.updateBoardMatrix(gameboard.translateProlgBoard(data.target.response));
            gameboard.history.push(gameboard.matrix);
            gameboard.scene.movie.push(gameboard.matrix);
            if(!gameboard.scene.player1Turn && gameboard.scene.bot1)
              gameboard.scene.botplay1 = false;
            else if(gameboard.scene.player1Turn && gameboard.scene.bot2)
              gameboard.scene.botplay2 = false;
            gameboard.scene.player1Turn = !gameboard.scene.player1Turn;
          }
        }
    }
  };

	request.onerror = onError || function(){console.log("Error waiting for response");};

	request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
	request.send();
}

MyGameboard.prototype.requestToPl = function(request){
  request = typeof request !== 'undefined' ? request : false;
  console.log('REQUEST : ' + request);
	if (!request)
		swal('Developer Error', "Please make a valid request.", "error")

	this.getPrologRequest(request);

}
