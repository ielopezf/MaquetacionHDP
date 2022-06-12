window.addEventListener('DOMContentLoaded', event => {

    const datatablesSimple = document.getElementById('datatablesSimple');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }

    document.querySelectorAll('.datatablesSimple--element').forEach(element => {
        new simpleDatatables.DataTable(element);
    });
});
