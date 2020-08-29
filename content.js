let palestrinhaName = "";
let palestrinhaMessage;

$(document).ready(function () {
  $("body").on("click", ".l4V7wb.Fxmcue", function () {
    removePalestrinhaMessages();
  });
});

var removePalestrinhaMessages = function () {
  palestrinhaMessage = $('.GDhqjd[data-sender-name="' + palestrinhaName + '"]');
  if (!palestrinhaMessage.length) {
    window.setTimeout(removePalestrinhaMessages, 100);
    return;
  }
  palestrinhaMessage.addClass("palestrinha-message");
};

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

var addListeners = function () {
  $(
    "<style> .palestrinha-message { display:none !important; } </style>"
  ).appendTo("head");
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
      addListeners();
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
