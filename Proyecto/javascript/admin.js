window.addEventListener("load", function(){
    //Comprobaciones de sesión y logout
    if (this.localStorage.getItem("sesion") == null || this.localStorage.getItem("sesion") == false) {
        this.location.href = "inicio.html";
    }

    this.document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("sesion");
        location.href = "inicio.html"
    });
});