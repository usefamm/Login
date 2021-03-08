let submit = document.getElementById("submit");
let ERR = $("#error");
let SUCC = $("#success");


//doing ajax stuff for signUp page...
submit.onsubmit=function (e) { 
  
  e.preventDefault();
  
  let userName=document.getElementById('userN').value
  let passWord=document.getElementById('pwd').value
  let email=document.getElementById('email').value
  let gender=document.getElementById('gender').value
  
  
  $(document).ready(function () {
      $.ajax({
        type: "POST",
        url: "/signUp",
        data: {
          username: `${userName}`,
          password: `${passWord}`,
          email:`${email}`,
          gender:`${gender}`
        },
       
        dataType: "text",
        success: function (response) {
          SUCC.html(response);
          SUCC.fadeIn(800);
          ERR.fadeOut();
          //redirecting him to login page...
          setTimeout(function(){window.location.href = "http://localhost:5001/"; }, 3000);
          
        },
        error: function (req, status, error) {
          if (error) {
            ERR.html("This User Name Has Been Picked! Try Another One.");
          }
          ERR.fadeIn(800);
        SUCC.fadeOut();
  
        
        },
      });
    }
    );
  ;

  
      };
    
