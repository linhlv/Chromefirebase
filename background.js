console.log('hello wolrd');


function registerCallback(registrationId) {
  if (chrome.runtime.lastError) {
    // When the registration fails, handle the error and retry the
    // registration later.
    return;
  }

  // Send the registration token to your application server.
  sendRegistrationId(registrationId, function(succeed) {
    // Once the registration token is received by your server,
    // set the flag such that register will not be invoked
    // next time when the app starts up.
    if (succeed){
      chrome.gcm.onMessage.addListener(function(message){
          console.log(message);
      });
      chrome.storage.local.set({registered: true});
      console.log('stored');
    }      
  });
}


function sendRegistrationId(registrationId, callback) {
    console.log('id:' + registrationId);
  // Send the registration token to your application server
  // in a secure way.
  var sended = true;
  //ajax to server
  if(sended){
    callback(sended);
  }  
}

function unregisterCallback() {
  if (chrome.runtime.lastError) {
    // When the unregistration fails, handle the error and retry
    // the unregistration later.
    return;
  }
}

chrome.storage.local.get("registered", function(result) {
    // If already registered, bail out.
    if (result["registered"])
        return;

    // Up to 100 senders are allowed.
    var senderIds = ["97716443873"];
    
    chrome.gcm.register(senderIds, registerCallback);
});

/*
chrome.runtime.onStartup.addListener(function() {
    chrome.storage.local.get("registered", function(result) {
        // If already registered, bail out.
        if (result["registered"])
        return;

        // Up to 100 senders are allowed.
        var senderIds = ["97716443873"];
        
        chrome.gcm.register(senderIds, registerCallback);
    });
});

*/