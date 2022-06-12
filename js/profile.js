var jwt = localStorage.getItem("jwt");
var datosusuario = JSON.parse(localStorage.getItem("datosusuario"));
if (jwt == null) {
  window.location.href = './login.html'
}

function loadUser() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8081/api/usuarios/getUsuarioLogeado");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", jwt);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      const userdata = objects['dataset'][0];
      console.log(objects);
      if (objects["status"] === true) {
        document.getElementById("fname").innerHTML = userdata["nombre"];
        document.getElementById("fname2").innerHTML = userdata["nombre"];
        document.getElementById("emailrow").innerHTML = userdata["email"];
        document.getElementById("carnetrow").innerHTML = userdata["carnet"];
        document.getElementById("username").innerHTML = userdata["carnet"];
      }
    }
  };
}

loadUser();

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = './login.html'
}
