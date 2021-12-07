

//post programatic :) habar nu am daca am pacalit cors sau e best practice aici. 
document.getElementById("sendProj").onclick = (()=> {
    const nameProj = document.getElementById("numeProj");
    const idAdmin = document.getElementById("idAdmin");
    //TODO:validatori!
    const http = new XMLHttpRequest(); //echivalent mai fancy axios :) https://www.youtube.com/watch?v=YLq6JOsTok8
    const url = 'http://localhost:7000/app/projects';
    http.open("POST", url);
    http.setRequestHeader('Content-Type', 'application/json'); //habar nu am de ce imi crapa la cors, but whatever.
    http.send(JSON.stringify({
        name: nameProj.value,
        id_admin: idAdmin.value
    }));
    http.onreadystatechange=function(){ //cod copiat horror :( almost sure se face cu fetch mai elegant
        if(this.readyState==4 && this.status==200){
            console.log(http.responseText)
        }
    }
})