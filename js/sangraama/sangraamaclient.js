  var D = true;
  var TAG = 'SangraamaClient : ';

  var p; // Player Object
  var aoihandler;
  var screenSize;

  // connection handling
  var primaryCon = 0; // player only send updates to the primary server
  var prevPrimarycon = 0; // previous primary connection, for recovering purpose
  var nextPrimaryCon = 0; // To store next primary connection, until it's
  // stablish
  var scale = 100; // 1 unit in server => 100 pixels in canvas

  var player = {
    type: 1,
    userID: 1,
    x: 0, // have to move x,y like w & h in order to optimize. Otherwise we are sending them all the time. #gihan
    y: 0,
    v_x: 0,
    v_y: 0,
    a: 0, //actual angle
    da: 0, // delta angle
    s: 0
  };

  // Setup client side
  window.onload = function() {
    screenSize = viewport();

    // Create player location (this will be given by the login server)
    player.userID = Math.floor(Math.random() * 101);
    // player.x = Math.floor(Math.random() * 900);
    player.x = Math.floor(Math.random() * 49 + 2250); //create at edge
    // player.x = 50;
    // player.y = 50;
    player.y = Math.floor(Math.random() * 100) + 100
    // drawRotatedImage(ship, player);
    pHandler = new playerhandler();
    pHandler.init(player.userID);
    
    // Initialize AIO handler
    aoihandler = new aoihandler();
    aoihandler.init();
    aoihandler.setAOI(screenSize.width, screenSize.height);
    console.log(TAG + ' initialized window onloads ... ');
  };

  function updateServer() {
    // only allow primary connection to update server
    // if (D)
    // console.log('current primary connection ' + primaryCon);
    //console.log('Send update to server ' + primaryCon + ' ' + wsList[primaryCon].getWS().getHostAddress();
    wsList[primaryCon].send(JSON.stringify(player));
  }

  //-->