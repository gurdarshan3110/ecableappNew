jQuery(document).ready(function(){
   jQuery(".arrgruop").click(function(){
    var arr=this.id;
    var id=this.value;
    var val=id.split('-');
    var val1=arr.split('_');
    var pre=val[0];
    var mid=val[1];
    var num=document.getElementById('num'+val1[0]).value;
    var h=0;
      if(num==mid)
      {
        for(h=0;h<=mid;h++)
        { 
          if(jQuery('#'+arr).prop('checked')) 
            {
              jQuery('.'+pre+'arraygroup-'+h).prop('checked', true);
            }
          else
          {
              jQuery('.'+pre+'arraygroup-'+h).removeAttr('checked');
          }
        }
      }
      else
      {
        if(jQuery('#'+arr).prop('checked')) 
          {
           jQuery('.'+pre+'arraygroup-'+mid).prop('checked', true);
          }
          else
          {
           jQuery('.'+pre+'arraygroup-'+mid).removeAttr('checked'); 
          }
      } 
   });
});
function CheckValidation(){
  var teacher_id=$("#teacher_id").val();
  var designation_id=$("#designation_id").val();
  if(teacher_id=='' && designation_id==''){
     alert("Please choose Designation or Staff Member.");
     return false;
  }
}
function check_col(id,mid)
{
  var num=document.getElementById('num'+id).value;
  var pre=document.getElementById('k'+id).value;
    for(var l=0;l<num;l++)
    {
      if(jQuery('.'+pre+'arrgroup-'+mid+'0').prop('checked')) 
      {
        jQuery('.'+pre+'arrgroup-'+mid+l).prop('checked', true);
      } 
      else 
      {
      jQuery('.'+pre+'arrgroup-'+mid+l).removeAttr('checked');
      }
    }
}
function pagePermissions(teacher_id,designation_id)
{
if (teacher_id!=0 && teacher_id!='')
window.location.href='permission.php?id='+btoa(teacher_id);
else if(designation_id!=0 && designation_id!='')
window.location.href='permission.php?did='+btoa(designation_id);
else
window.location.href='permission.php';
}