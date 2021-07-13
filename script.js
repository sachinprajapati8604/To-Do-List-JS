function Add() {
    var myinput = document.getElementById('myinput').value;
    if (myinput === "") {
        alert("Please write something");
    } else {
        
        var outputbox = document.getElementById('outputbox');
        var ul = document.getElementById('list');
        var li = document.createElement('li');

        li.innerHTML = `${myinput}`;
        var i = document.createElement('i');
        i.className = 'far fa-trash-alt mytrash';
        i.onclick=function(){
            removeItem();
        }
        li.append(i);
        ul.append(li);
        outputbox.append(ul);

        document.getElementById('myinput').value = "";
    }
}

function removeItem(){
    var trash=document.getElementsByClassName('mytrash');
    for(var i=0;i<trash.length;i++){
        trash[i].onclick=function(){
            var div=this.parentElement;
            div.style.display="none";
        }
    }
}