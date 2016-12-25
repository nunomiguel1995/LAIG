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

    if(response == 'play'){
      return;
    } else if(response == 'quit'){
      gameboard.initBoardMatrix();
    }else if(response == 'win'){
      //Show Winner
    }else if(response != 'Bad Request'){
      var subrequest = requestString.substring(0,7);
    //console.log(subrequest);
        if(requestString == 'startgame'){
          var newBoardMatrix = gameboard.translateProlgBoard(data.target.response);
          gameboard.updateBoardMatrix(newBoardMatrix);
        }else if(subrequest == 'playBot' && response == 'noMove') {
          gameboard.scene.botplay = false;
        }else{
          if(response != 'noMove'){
            gameboard.updateBoardMatrix(gameboard.translateProlgBoard(data.target.response));
            if(!gameboard.scene.player1Turn && gameboard.scene.bot)
              gameboard.scene.botplay = false;
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
