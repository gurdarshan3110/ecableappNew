/*
* fetch Wings by headoffice id  ajax.
*/
$(document).ready(function(){
	alert("test");
    $("#headoffice_id").change(function(){
       var id=this.value;
       $.post("ajax/unitmaster.php",{action:'fetchWing',headofficeId:id},
       function(response){
	       $("#wing_id").html(response);
        }); 
    });
});

