/*
* fetch Groups by class id  ajax.
*/
//Funtion to fill values from suggestion drop down into (Issue To) Form Field
  function fill(Value)
      {
      $('#user').val(Value);
      $('#display').hide();
      }
  function fillEmp(Value)
      {
      $('#userEmp').val(Value);
      $('#display').hide();
      }
  function fillUser(Value)
      {
      $('#user').val(Value);
      $('#display').hide();
      }
//Funtion to fill values from suggestion drop down into (Accession No) Form Field
  function fillAccessions(Value)
      {
      $('#accession_no').val(Value);
      $('#displayAccess').hide();
      }

//Funtion to get values from suggestion drop down for (Accession No) Form Field
  function KeyedUpAccess(){
        $("#displayAccess").css("display", "block");
        $(document).mouseup(function (e)
          {
            var container = $("#accession_no");
            var container1 = $("#displayAccess");
            if (!container.is(e.target) && !container1.is(e.target)
                && container1.has(e.target).length === 0) // ... nor a descendant of the container
            {
                $("#displayAccess").hide();
            }


          });
        var name = $('#accession_no').val();
        if(name=="")
          {
          $("#displayAccess").html("");
          }
        else
          {
            $.post("ajax/book_issue.php",{action:'AutoFillAccession',name:name},
             function(response){
               $("#displayAccess").html(response);
              });
          }
  }
//Funtion to get values from suggestion drop down for (Issue To) Form Field
function KeyedUp(id){
      $("#display").css("display", "block");
      $(document).mouseup(function (e)
        {
          var container = $("#subscription_id"+id);
          var container1 = $("#display"+id);
          if (!container.is(e.target) && !container1.is(e.target)
              && container1.has(e.target).length === 0) // ... nor a descendant of the container
          {
              $("#display"+id).hide();
          }


        });
      var name = $('#subscription_id'+id).val();
      if(name=="")
        {
        $("#display"+id).html("");
        }
      else
        {
          $.post("ajax/subscriptions.php",{action:'AutoFill',name:name,type:type},
           function(response){
             $("#display"+id).html(response);
            });
        }
}
function KeyedUpEmp(){
      $("#display").css("display", "block");
      $(document).mouseup(function (e)
        {
          var container = $("#user");
          var container1 = $("#display");
          if (!container.is(e.target) && !container1.is(e.target)
              && container1.has(e.target).length === 0) // ... nor a descendant of the container
          {
              $("#display").hide();
          }


        });
      var name = $('#userEmp').val();
      var type = $("input[id=user_type]:checked").val();
      if(name=="")
        {
        $("#display").html("");
        }
      else
        {
          $.post("ajax/book_issue.php",{action:'AutoFill',name:name,type:type},
           function(response){
             $("#display").html(response);
            });
        }
}
// Function to issue new books
function IssueBooks(){
  $("#loaderId").show();
  $("#issueBtn").hide();
  var type = $("input[id=user_type]:checked").val();
  var InsertType = $("#InsertType").val();
  var user          = $("#user").val();
  var accession_no  = $("#accession_no").val();
  $.post("ajax/book_issue.php",{action:'Fourth',type:type,user:user},
    function(response){
      if(response==1){
        var reason = confirm("Are you sure you want to issue book beacuse limit for maximum no of books issued has been reached ?");       
            if(reason!=false){
               xajax_IssueBooks(user,type,accession_no);
               $("#loaderId").hide();
               $("#issueBtn").show();
            }
            else{
              $("#loaderId").hide();
              $("#issueBtn").show();
            }
          }
          else if(response==2){
            xajax_IssueBooks(user,type,accession_no);
            $("#loaderId").hide();
            $("#issueBtn").show();
          }
    });
}
//funtion is not in use
function bookIssues(){
  var type = $("input[id=user_type]:checked").val();
  var user = $("#user").val();
  var InsertType = $("#InsertType").val();
  var accession_no = $("#accession_no").val();
  if(user_type!='' && user!=''){
    xajax_bookIssues(user,type,InsertType,accession_no); 
  }
  else{
    return false;
  }
}
// Function to remove issued books
function removeIssued(id){
  var result=confirm("Are you sure you want to remove this record?");
  if(result){
    var InsertType = $("#InsertType").val();
    //alert(id);
    xajax_removeIssued(id,InsertType);
  }
  return false;
}

$(document).ready(function(){
  // Function to change User Type
    $("#radio").change(function(){
       var user_type=$("input[id=user_type]:checked").val();
       $.post("ajax/book_issue.php",{action:'First',user_type:user_type},
       function(response){
	       $("#response1").html(response);
        });
    });
});
//Function to Get Records For User During book Return
$(document).ready(function(){
    $("#Returnaccession_no").change(function(){
       var accession_no=$("#Returnaccession_no").val();
       $.post("ajax/book_issue.php",{action:'Second',accession_no:accession_no},
       function(response){
	      if(response==1){
           $("#msg").html('<div class="notify notify-error"><a class="close" href="javascript:;"><img src="images/close.png" /></a><h3>This Accession Number Is invalid or This book is Not issued.</h3></div>');
           $("#msg").show();
           setTimeout(function() {
              $('#msg').fadeOut('fast');
          }, 5000);
        }
        else{
         $("#response2").html(response);
        }
        });
    });
  });
//To Stop Auto Submit During Book Return (When Accession No is Filled By Gun)
function StopSubmitDuringReturn(){
  input.addEventListener("keypress", function(event){
    if (event.which == '10' || event.which == '13') {
        event.preventDefault();
    }
}, false);}
