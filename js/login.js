var jwt = localStorage.getItem("jwt");
if (jwt != null) {
  window.location.href = './profile.html'
}

function login() {
  const username = document.getElementById("carnet").value;
  const password = document.getElementById("password").value;

  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:8081/api/login");
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xhttp.send(JSON.stringify({
    "carnet": username,
    "contrasena": password
  }));
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4) {
      const objects = JSON.parse(this.responseText);
      console.log(objects);
      console.log(objects['dataset'][0]);
      if (objects['status'] === true) {
        localStorage.setItem("jwt", objects['token']);
        localStorage.setItem("datosusuario", JSON.stringify(objects['dataset'][0]));
        Swal.fire({
          text: objects['message'],
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = './profile.html';
          }
        });
      } else {
        Swal.fire({
          text: objects['message'],
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };
  return false;
}
