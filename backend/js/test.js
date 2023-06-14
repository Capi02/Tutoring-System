
function openTest(e, test) {

    let i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");

    

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

   
    document.getElementById(test).style.display = "block";
    e.currentTarget.className += " active";

    
    console.log(tablinks[0].classList);
    
}