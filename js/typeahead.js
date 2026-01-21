/* Function for Student performance detail Typeahead Dropdown 
    $('input.typeahead').typeahead({
      items: 15,
      highlighter: function (item) {
                      var parts = item.split('#'),
                          html = '<div class="typeahead">';
                          html += '<div class="pull-left margin-small">';
                          html += '<div class="text-left"><strong '+((parts[1]=='D')?'style="color:red;"':'')+'>' + parts[0] + '</strong></div>';
                          html += '</div>';
                          html += '<div class="clearfix"></div>';
                          html += '</div>';
                      return html;
                  },
      source:  function (query, process) {
          var len=query.length;
          if(len>=1){
              var franchiseId=$('#franchise_id').val();
              var wingId=$('#wing_id').val();
              var unitId=$('#unit_id').val();
              return $.get("ajax/sms-utility.php",{action:'typeahead',name:query,franchiseId:franchiseId,wingId:wingId,unitId:unitId}, function (data) {
                      data = $.parseJSON(data);
                      return process(data);
                  });
          }
      },
      afterSelect: function(obj){
         $('.typeahead.dropdown-menu').hide();
         $('.typeahead').val('');
         $('#subscriberDets').append('<div class="col-sm-4" ><span class="col-sm-12" style="border: 1px solid #ccccd8;border-radius: 12px;margin-top:5px;" id="subscriber'+obj.id+'">'+obj.oname+'<input type="hidden" name="subscriber_id[]" value="'+obj.id+'"><input type="hidden" name="phone_no[]" value="'+obj.phone_no+'">&nbsp;&nbsp;<a href="javascript:;" onclick="removeSub('+obj.id+')"><img src="images/delete.jpeg"></a></span></div>');
      }
  });
/* End script */
$(document).ready(function(){

  $("#franchise_id").change(function(){

    var id=this.value;

    $.post("ajax/sms-utility.php",{action:'fetchWing',franchiseId:id},

    function(response){

      $("#wing_id").html(response);

    }); 

  });
  $("#wing_id").change(function(){

    var id=this.value;
    var franchiseId=$("#franchise_id").val();
    $.post("ajax/sms-utility.php",{action:'fetchUnit',wingId:id,franchiseId:franchiseId},

    function(response){

      $("#unit_id").html(response);

    }); 

  });
  $("#unit_id").change(function(){

    var id=this.value;
    var franchiseId=$("#franchise_id").val();
    $.post("ajax/sms-utility.php",{action:'fetchSubscribers',unitId:id,franchiseId:franchiseId},

    function(response){

      $("#subscriberTab").html(response);

    }); 

  });

});
