function move(amount) {
    var elem = document.getElementById("myBar");
    var width = 0;
    var id = setInterval(frame, 10);
    function frame() {
        if (width >= amount) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}