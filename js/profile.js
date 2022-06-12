var jwt = localStorage.getItem("jwt");
var datosusuario = JSON.parse(localStorage.getItem("datosusuario"));
if (jwt == null) {
  window.location.href = './login.html'
}

function loadUser() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8081/api/usuarios/getUsuario?id=1");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", jwt);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      if (objects["status"] === true) {
        const user = objects["user"]
        document.getElementById("fname").innerHTML = datosusuario["carnet"];
        document.getElementById("avatar").src = datosusuario["carnet"];
        document.getElementById("username").innerHTML = datosusuario["carnet"];
      }
    }
  };
}

loadUser();

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = './login.html'
}
