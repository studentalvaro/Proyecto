window.addEventListener("load", function(){
    //Comprobaciones de sesión
    if (this.localStorage.getItem("sesion") == null || this.localStorage.getItem("sesion") == false) {
        this.location.href = "inicio.html";
    }
});