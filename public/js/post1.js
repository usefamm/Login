let submit = document.getElementById("submit");
let ERR = $("#error");
let SUCC = $("#success");


//doing ajax stuffs for login...
submit.onsubmit=function (e) { 
  
  e.preventDefault();
  
  let userName=document.getElementById('user').value
  let passWord=document.getElementById('pass').value
  
  
  $(document).ready(function () {
      $.ajax({
        type: "POST",
        url: "/login",
        data: {
          username: `${userName}`,
          password: `${passWord}`,
        
        },
       
        dataType: "text",
        success: function (response) {
          SUCC.html(response);
          SUCC.fadeIn(800);
          ERR.fadeOut();
          //redirecting him to profile page...
          setTimeout(function(){window.location.href = "http://localhost:5001/profile"; }, 3000);
          
        },
        //handling errors...
        error: function (req, status, error) {
          if (error) {
            ERR.html("User With This Informations Has Not Found.");
          }
          ERR.fadeIn(800);
        SUCC.fadeOut();
  
        
        },
      });
    }
    );
  ;

  
      };
    
