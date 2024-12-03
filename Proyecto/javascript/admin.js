window.addEventListener("load", function(){
    this.document.getElementById("logout").addEventListener("click", function(){
        localStorage.removeItem("sesion");
        location.href = "inicio.html"
    });
});