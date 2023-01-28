var form = document.getElementById("myform");
var fname = document.getElementById("first");
var lname = document.getElementById("last");
var contact = document.getElementById("number");
var table = document.querySelector("table");
var search = document.getElementById("search-name");
var users = [];
form.addEventListener("submit", function (event) {
  event.preventDefault();
  var username = fname.value + " " + lname.value;
  let usernameexist = 0,
    contactexist = 0;
  //checking for dupliates
  for (let i = 0; i < users.length; i++) {
    if (username === users[i][1]) {
      usernameexist = 1;
    }
    if (contact.value === users[i][2]) {
      contactexist = 1;
    }
  }
  if (usernameexist) {
    alert("username already exist ! Try another username");
  } else if (contactexist) {
    alert("contact already exist ! Try with different contact");
  } else {
    var user = [users.length + 1, username, contact.value, "x"];
    users.push(user);
    fname.value = "";
    lname.value = "";
    contact.value = "";
    var row = table.insertRow(user[0]);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.textContent = user[0];
    cell2.innerHTML = user[1];
    cell3.innerHTML = user[2];
    cell4.innerHTML = user[3];
    cell4.setAttribute("onclick", "deleterow(this)");
  }
});
//display users
const display = (users) => {
  for (let i = 0; i < users.length; i++) {
    table.deleteRow(1);
  }
  let x = 1;
  users.map((user) => {
    var row = table.insertRow(x);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.textContent = x;
    cell2.innerHTML = user[1];
    cell3.innerHTML = user[2];
    cell4.innerHTML = user[3];
    cell4.setAttribute("onclick", "deleterow(this)");
    x += 1;
  });
};
//sort by name
const sortbyname = () => {
  users.sort((a, b) => {
    if (a[1] < b[1]) {
      return -1;
    }
    if (a[1] > b[1]) {
      return 1;
    }
    return 0;
  });

  display(users);
};
//delete functionlity
function deleterow(x) {
  if (confirm("Are you sure to delete user")) {
    var tr = x.parentNode; // the row to be removed
    let index = tr.cells[0].innerText;
    users.splice(index - 1, 1);
    for (let i = index - 1; i < users.length; i++) {
      users[i][0] = i + 1;
    }
    tr.parentNode.removeChild(tr);
    display(users);
  }
}
//implementing search by name
const searchbyname = () => {
  var searchedname = search.value;
  search.value = "";
  let found = [],
    notfound = [];
  if (users.length === 0) {
    alert("No user found!!!");
  } else {
    for (let i = 0; i < users.length; i++) {
      const [fname, lname] = users[i][1].split(" ");
      if (
        searchedname === fname ||
        (lname.length > 0 && searchedname === lname)
      ) {
        found.push(users[i]);
      } else {
        notfound.push(users[i]);
      }
    }
    if (found.length > 0) {
      for (let i = 0; i < notfound.length; i++) {
        found.push(notfound[i]);
      }
      display(found);
    } else {
      alert("No user found");
    }
  }
};
