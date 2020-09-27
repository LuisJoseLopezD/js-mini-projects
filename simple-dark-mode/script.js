function darkMode(){
    var a = document.getElementsByTagName("body");
    a[0].style.backgroundColor = "black";
    a[0].style.color = "white";
}

function normalMode() {
    var a = document.getElementsByTagName("body");
    a[0].style.backgroundColor = null;
    a[0].style.color = null;
}