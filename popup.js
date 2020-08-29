let submit = document.getElementById("submitUsername");
let usernameInput = document.getElementById("usernameInput");

window.onload = function () {
  submit = document.getElementById("submitUsername");
  usernameInput = document.getElementById("usernameInput");
  chrome.storage.sync.get("username", function (data) {
    usernameInput.value = data.username;
  });
  submit.onclick = function () {
    let value = usernameInput.value;
    chrome.storage.sync.set({ username: value }, function () {});
    ping(value);
  };
};

function ping(value) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(
      tabs[0].id,
      { command: "init", username: value },
      function (response) {
        console.log(response.result);
      }
    );
  });
}
