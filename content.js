palestrinhaName = "";

$(document).ready(function () {
  $(".l4V7wb.Fxmcue").on("click", function () {
    $('.GDhqjd[data-sender-name="' + username + '"]').addClass(
      "palestrinha-message"
    );
  });
});

function addObserverIfDesiredNodeAvailable() {
  let targetNode = $(".z38b6.CnDs7d.hPqowe").get(0);
  if (!targetNode) {
    window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
    return;
  }
  const config = { attributes: true, childList: true, subtree: true };
  const callback = function (mutationsList, observer) {
    mutationsList.forEach(function (mutation) {
      for (var i = 0; i < mutation.addedNodes.length; i++) {
        let messageSender = mutation.addedNodes[i].dataset.senderName;
        if (messageSender == palestrinhaName) {
          mutation.addedNodes[i].classList.add("palestrinha-message");
        }
      }
    });
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

addObserverIfDesiredNodeAvailable();

var removePalestrinha = function (username) {
  $('.GDhqjd[data-sender-name="' + username + '"]').addClass(
    "palestrinha-message"
  );
};

var addListeners = function (username) {
  $(
    "<style> .palestrinha-message { display:none !important; } </style>"
  ).appendTo("head");
  removePalestrinha(username);

  $(window).scroll(function () {
    removePalestrinha(username);
  });
};

var removeListeners = function () {
  $(window).unbind("scroll");
};

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(function (request, sender, sendResponse) {});
});
//message listener for background
// chrome.runtime.onMessage.addListener;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  chrome.storage.sync.get("username", function (data) {
    if (data.username != "" && request.command === "init") {
      palestrinhaName = data.username;
      addListeners(data.username);
    }
  });
  sendResponse({ result: "success" });
});

//on init perform based on chrome stroage value
window.onload = function () {
  chrome.storage.sync.get("username", function (data) {
    if (data.username != "") {
      addListeners(data.username);
    }
  });
};
