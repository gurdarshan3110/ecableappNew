$(function(){
        var btnId = $("#albumImage");
        var sequence = $("#imageseq").val();
        var newseq = sequence++;
        $("#imageseq").val(newseq);
        
        new AjaxUpload(btnId, {
            action: 'uploadItemImages.php',
            name: 'uploadfile',
            onSubmit: function(file, ext){
                 if (! (ext && /^(jpg|png|jpeg)$/.test(ext))){ 
                       alert('Only JPG and PNG files are allowed');
                    return false;
                }
                jQuery("#loaderId").css('display','');
                
            },
            onComplete: function(file,response){
              //alert(response);
              if(response=='error'){
                   alert("Server Error Please Try Again");
                   jQuery("#loaderId").css('display','none');
              } else{
                var result=response.split('_M2i_');
                //var conveniancecount = $("div[id*='image_row']").length;
                var conveniancecount = $("#alwrow").val();
                 var rowval=parseInt(conveniancecount)+1;
                 if(result[0]==="success"){
                  jQuery("#loaderId").css('display','none');
                  $("#imgPreview").html('<a href="'+result[1]+'" class="btn btn-info" target="_blank">Preview</a><input type="hidden" name="path" value="'+result[1]+'">');           
                }
              }
            }
        });
    });
function removeAlbumImage(rowval){
    $("#image_row"+rowval).remove();
}
