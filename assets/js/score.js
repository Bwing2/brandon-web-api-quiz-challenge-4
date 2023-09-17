var clearBtn = document.querySelector("#clearBtn");

// References local storage, and if there is not any savedInfo, it creates a new array.
//Otherwise it stores submitted data into an object.
var savedInfo = localStorage.getItem("savedInfo");
if (savedInfo) {
  savedInfo = JSON.parse(savedInfo);
} else {
  savedInfo = [];
}

// for loop that saves local storage info and displays them in a descending table on scores.html
for (var i = 0; i < savedInfo.length; i++) {
  var currentScore = savedInfo[i];
  var scoreRow = document.createElement("tr");
  scoreRow.innerHTML =
    "<td>" + currentScore.name + "</td> <td>" + currentScore.score + "</td>";
  document.querySelector("#scoreList").appendChild(scoreRow);
}

// Clears local storage, and reloads the page.
clearBtn.addEventListener("click", function (event) {
  event.preventDefault;
  localStorage.clear();
  location.reload();
});
