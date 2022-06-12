var jwt = localStorage.getItem("jwt");
var datosusuario = JSON.parse(localStorage.getItem("datosusuario"));
if (jwt == null) {
  window.location.href = './login.html'
}

function loadUser() {
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8081/apis/MateriaController/getMaterias");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", jwt);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      const materias = objects['dataset'][0];
      console.log(objects);
      if (objects["status"] === true) {
        materias.forEach(materia => {
          const row = document.createElement("tr");
          for (let i = 0; i < 4; i++) {
            const column = document.createElement("td");
            if (i == 3){
              var element = document.createElement("input");
               element.type = "button";
               element.value = "Ver calificaciones";
               element.name = "getInfo";
               element.className ="btn btn-info";
               element.onclick = function() {cargarCalificaciones(materia[0])};;
               column.appendChild(element);
               row.appendChild(column);
               document.getElementById("bodymaterias").appendChild(row);
            } else {
              const textnode = document.createTextNode(materia[i]);
              column.appendChild(textnode);
              row.appendChild(column);
              document.getElementById("bodymaterias").appendChild(row);
            }
          }
        });

      }
    }
  };
}

function cargarCalificaciones(idmateria){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "http://localhost:8081/apis/ClaseController/getCalificacion?id="+idmateria);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.setRequestHeader("Authorization", jwt);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      const calificaciones = objects['dataset'][0];
      console.log(objects);
      if (objects["status"] === true) {
        console.log(calificaciones);
      }
    }
  };
}

loadUser();

function logout() {
  localStorage.removeItem("jwt");
  window.location.href = './login.html'
}
