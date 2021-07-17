//calling Add function by enter key  
var input = document.getElementById("myinput");
input.addEventListener("keypress", function(event) {
  if (event.key === 'Enter') {
   event.preventDefault();
   document.getElementById("addbtn").click();
  }
});

//or we can call like this by using key code  (enter key code is 13 )

// var input = document.getElementById("myinput");
// input.addEventListener("keyup", function(event) {
//   if (event.keyCode === 13) {
//    event.preventDefault();
//    document.getElementById("addbtn").click();
//   }
// });

function Add() {
    var myinput = document.getElementById('myinput').value;
  
    if (myinput === "") {
        // alert("Please write something");
        swal("Input Can't  empty", "Please write something", "warning", {
            button: "Ok",
          });
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
        swal("Good Job !", "task added to list", "success", {
            button: "Ok",
          });
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