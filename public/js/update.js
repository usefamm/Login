function update(element) {
  let parent = element.parentElement;

  parent.innerHTML = `<input type='text' placeholder=${parent.innerText}> <input class="btn btn-primary update" type="button" value="Save" onclick="save(this)"></li>`;
}

function save(element) {
  let data = {};
  //getting inputs values and keys...
  let prevSibling = element.previousElementSibling;
  let placeholder = prevSibling.placeholder;

  placeholder = placeholder.match(/\w+/g);

  let value = prevSibling.value;
  data[placeholder] = value;
  //updating our profile
  let parent = element.parentElement;
  $.ajax({
    type: "PUT",
    url: "/profile",
    data,

    dataType: "text",
    success: function (response) {
      parent.innerHTML = `${placeholder}:  ${value} <input class="btn btn-primary update" type="button" value="Update" onclick="update(this)"></li>`;
    
    
      if (response === "Partial Content") {
        alert("You Will Be Redirected To Login Page!");
        setTimeout(function () {
            //redirecting to login page
          window.location.href = "http://localhost:5001/";
        }, 2000);
      }
    },
    error: function(err){
      alert("Same Username...Try Another One!")
    }
  });
//making our profile look new..
}