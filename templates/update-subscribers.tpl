    <div id="page-wrapper">
    <link href="../css/subscribers.css" rel="stylesheet">
    <link href="css/jquery.datepick.css" rel="stylesheet"/>
        <div class="row">
            <div class="col-lg-12 top-div">
                <h1 class="page-header">Subscribers Master</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <div class="row">
            <div class="col-lg-12">
                <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">    
                    <!-- /.modal-dialog -->
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12">
                {if $msg neq ''}
                <div class="alert alert-success alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        {$msg} 
                </div>
                {/if}
                {if $errormsg neq ''}
                <div class="alert alert-danger alert-dismissable">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        {$errormsg}
                </div>
                {/if}
            </div>
        </div>
            <!-- /.row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        {$pageheading}
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                
                                <input type="hidden" name="id" value="{$rowRec.subscriber_id}" />
                                <div class="form-group col-lg-4">
                                    <label>Customer ID</label>
                                    <input type="text" name="customer_id" class="form-control" value="{$customerId}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>MSO ID</label>
                                    <input type="text" name="mso_id" class="form-control" value="{$msoId}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Headoffice Name</label>
                                    <select class="form-control" id="headoffice_id" onchange="wingFind();" name="headoffice_id" required>
                                        <option value="">-Please Select-</option>
                                        {$headofficeArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Area</label>
                                    <select class="form-control" id="wing_id" onchange="unitFind();" name="wing_id" required>
                                        <option value="">-Please Select-</option>
                                        {if $group neq ''}
                                            {$wingArray}
                                        {/if}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Sub Area</label>
                                    <select class="form-control" onchange="emplyeeFind();" id="unit_id" name="unit_id" required>
                                        <option value="">-Please Select-</option>
                                        {if $group neq ''}
                                            {$unitArray}
                                        {/if}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Employee Name</label>
                                    <select class="form-control" id="employee_id" name="employee_id" required>
                                        <option value="">-Please Select-</option>
                                        {if $group neq ''}
                                            {$employeeArray}
                                        {/if}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Name</label>
                                    <input type="text" name="name" class="form-control" value="{$rowRec.name}" required>
                                </div>
                                <div class="form-group col-lg-1">
                                    <label class="relation">Relation</label>
                                    <div class="radio radio-div">
                                        <label>
                                            <input {if $rowRec.relation eq 'S/O'}checked="checked"{/if} type="radio" name="relation" id="relation" value="S/O" checked>S/o
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group col-lg-1">
                                    <label>&nbsp;</label>
                                    <div class="radio margin-none">
                                        <label>
                                            <input {if $rowRec.relation eq 'W/O'}checked="checked"{/if} type="radio" name="relation" id="relation" value="W/O">W/o
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group col-lg-2">
                                    <label>&nbsp;</label>
                                    <div class="radio margin-none">
                                        <label>
                                            <input {if $rowRec.relation eq 'D/O'}checked="checked"{/if} type="radio" name="relation" id="relation" value="D/O" {if !$group}checked{/if}>D/o
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Relative</label>
                                    <input type="text" name="relative" class="form-control" value="{$rowRec.relative}">
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Address</label>
                                    <textarea name="address" class="form-control">{$rowRec.address}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Phone No</label>
                                    <input type="text" name="phone_no" class="form-control" value="{$rowRec.phone_no}" required>
                                </div>
                                
                                <div class="form-group col-lg-4">
                                    <label>Joining Date</label>
                                    <input type="text" name="connection_date" id="subscription_date" class="form-control" value="{$rowRec.connection_date|date_format:'%d/%m/%Y'}">
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Opening Balance</label>
                                    <input type="text" name="opening_balance" id="opening_balance" class="form-control" value="{$rowRec.opening_balance}">
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Remarks</label>
                                    <textarea name="remarks" class="form-control" >{$rowRec.remarks}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label class="relation">Payment Method</label>
                                    <div class="radio  radio-div">
                                        <label>
                                            <input {if $rowRec.payment_method eq 'L'}checked="checked"{/if} type="radio" onclick="PaymentMethod();" name="payment_method" id="payment_method" value="L" checked>Lum Sum
                                        </label>
                                    </div>
                                      <!-- <label>&nbsp;</label>-->
                                    <div class="radio  radio-div">
                                        <label>
                                            <input {if $rowRec.payment_method eq 'P'}checked="checked"{/if} type="radio" onclick="PaymentMethod();" name="payment_method" id="payment_method" value="P">Package
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group col-lg-12"></div>
                                <div class="form-group col-lg-2">
                                    <label>Payment Type</label>
                                    <div class="radio">
                                        <label>
                                            <input {if $rowRec.payment_type eq 'M'}checked="checked"{/if} type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="M" {if !$group}checked{/if}>Monthly
                                        </label>
                                    </div>
                                     <!-- <label>&nbsp;</label>-->
                                    <div class="radio">
                                        <label>    
                                            <input {if $rowRec.payment_type eq 'Q'}checked="checked"{/if} type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="Q">Quaterly
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group col-lg-2">
                                        <label>&nbsp;</label>
                                            <div class="radio">
                                                <label>
                                                    <input {if $rowRec.payment_type eq 'Y'}checked="checked"{/if} type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="Y">Yearly
                                                </label>
                                            </div>
                                            <div class="radio">
                                                <label>
                                                    <input {if $rowRec.payment_type eq 'H'}checked="checked"{/if} type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="H">Half Yearly
                                                </label>
                                            </div>
                                           <!-- <label>&nbsp;</label>-->
                                           
                                 </div>
                                {$addData}
                                    
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    {if $group}
                                    <button type="submit" name="submit" class="btn btn-primary">Update</button>
                                    <a href="subscribers.php" class="btn btn-default">Cancel</a>
                                    {else}
                                    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                                    <button type="reset" class="btn btn-default">Reset</button>
                                    {/if}
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
     {if $group}
    <body onload="PaymentMethod();">
    {/if}
    <!-- /#wrapper -->
    {literal}
        <script type="text/javascript" src="js/jquery.plugin.js"></script> 
        <script src="js/jquery.datepick.js"></script>
        <script type="text/javascript" language="javascript" class="init">
            $("#subscription_date").datepick();
            // popover demo
            $("[data-toggle=popover]")
            .popover()
        </script>
        <script>
        function viewSubscriber(id){
            $.post("ajax/subscribers.php",{action:'viewSubscriber',Id:id},
            function(response){
                $("#myModal").html(response);
            });
        }
        </script>
        <script>
        $("#stb_no").prop('required',true);
        $("#stb_no1").prop('required',false);
        function PaymentMethod(){
            var radio=$("input[name='payment_method']:checked").val();
            if(radio=='L'){
                $("#payment_amt").show();
                $("#paymentAmt").show();
                $("#payment_mthd").hide();
                $("#stb_no").prop('required',true);
                $("#stb_no1").prop('required',false);
            }else{
                $("#payment_mthd").show();
                $("#payment_amt").hide();
                $("#paymentAmt").hide();
                $("#stb_no1").prop('required',true);
                $("#stb_no").prop('required',false);
                $("#subscription_id1").prop('required',false);
            }
        }
        function Addmore(){
            var row = $("#alwrow").val();
            var newrow = parseInt(row)+1;
            $("#alwrow").val(newrow);  
            var stbArray="{/literal}{$stbArray}{literal}";  
            var data ='<div class="col-lg-12" id="row'+newrow+'"><div class="table-data"><label>Stb NO</label><input required type="text" name="subscription[]" onkeyup="KeyedUp('+newrow+');" id="subscription_id'+newrow+'" autocomplete="off" class="form-control"/><input required type="hidden" name="subscription_id[]" id="subscription'+newrow+'" value="" autocomplete="off" class="form-control"/><div id="display'+newrow+'" class="display"></div></div><div class="table-data"><label>Id Type</label><input type="text" name="id_type[]" id="installation" class="form-control" value=""></div><div class="table-data"><label>Id</label><input type="text" name="id_no[]" id="id_no" class="form-control" value=""></div><div class="table-data"><label>Security</label><input type="text" name="security[]" id="security" class="form-control" value=""></div><div class="table-data"><label>Installation</label><input type="text" name="installation[]" id="installation" class="form-control" value=""></div><div class="form-group col-lg-1"><label>&nbsp;</label><a href="javascript:;" onclick="deleteRow('+newrow+');" class=""><img src="images/cross.png"  style="margin: 24px 0px 0px 4px;"/></a></div></div>';
        $("#allownace-data").append(data); 

        }

        function deleteRow(id){
            $("#row"+id).remove();
        }
        function AddMore(){
            var Row = $("#alwRow").val();
            var newRow = parseInt(Row)+1;
            $("#alwRow").val(newRow);    
            var packageArray="{/literal}{$packageArray}{literal}";
            var stbArray="{/literal}{$stbArray}{literal}";
            var data ='<div class="col-lg-12" id="Row'+newRow+'"><div class="table-data"><label>Stb NO</label><input required type="text" name="subscription[]" onkeyup="KeyedUp1('+newRow+');" id="subscription_id1'+newRow+'" autocomplete="off" class="form-control"/><input required type="hidden" name="subscription_id[]" id="subscription1'+newRow+'" autocomplete="off" class="form-control" value=""/><div id="display1'+newRow+'" class="display"></div></div><div class="table-data"><label>Id Type</label><input type="text" name="id_type[]" id="id_type" class="form-control" value=""></div><div class="table-data"><label>Id</label><input type="text" name="id_no[]" id="id_no" class="form-control" value=""></div><div class="table-data"><label>Security</label><input type="text" name="security[]" id="security" class="form-control" value=""></div><div class="table-data"><label>Installation</label><input type="text" name="installation[]" id="installation" class="form-control" value=""></div><div class="table-data"><label>Package</label><select class="form-control" id="package_id'+newRow+'"  name="package_id[]"><option value="">-Please Select-</option>'+packageArray+'</select></div><div class="table-data"><label>Type</label><select class="form-control" id="package_type'+newRow+'"  name="package_type[]" onchange="TotAmt('+newRow+');"><option value="">-Please Select-</option><option value="P">Parent</option><option value="C">Child</option></select></div><div class="table-data"><label>Amount</label><input type="text" name="amount1[]" id="amount'+newRow+'" class="form-control" value=""></div><div class="table-data"><label>&nbsp;</label><a href="javascript:;" onclick="DeleteRow('+newRow+');" class=""><img src="images/cross.png"  style="margin: 24px 0px 0 4px;"/></a></div></div>';
        $("#allow-data").append(data); 

        }
        function DeleteRow(id){
            var totalAmt=$("#totamount").val();
            var response=$("#amount"+id).val();
            var total=totalAmt-response;
            $("#totamount").val(total);
            $("#final_amount").val(total);
            $("#Row"+id).remove();
            var idFinal=$("#alwRow").val();
            idFinal=idFinal-1;
            $("#alwRow").val(idFinal);
        }
        //Funtion to fill values from suggestion drop down into (Issue To) Form Field
        function fill(Value,id)
              {
              $('#subscription_id'+id).val(Value);
              $('#display').hide();
              }
        function fillUser(Value,id)
              {
              $('#subscription'+id).val(Value);
              }
        //Funtion to get values from suggestion drop down for (Issue To) Form Field
        function KeyedUp(id){
              $("#display"+id).css("display", "block");
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
                  $.post("ajax/subscribers.php",{action:'AutoFill',name:name,id:id},
                   function(response){
                     $("#display"+id).html(response);
                    });
                }
        }
        //Funtion to fill values from suggestion drop down into (Issue To) Form Field
        function fill1(Value,id)
              {
              $('#subscription_id1'+id).val(Value);
              $('#display1').hide();
              }
        function fillUser1(Value,id)
              {
              $('#subscription1'+id).val(Value);
              }
        //Funtion to get values from suggestion drop down for (Issue To) Form Field
        function KeyedUp1(id){
              $("#display1"+id).css("display", "block");
              $(document).mouseup(function (e)
                {
                  var container = $("#subscription_id1"+id);
                  var container1 = $("#display1"+id);
                  if (!container.is(e.target) && !container1.is(e.target)
                      && container1.has(e.target).length === 0) // ... nor a descendant of the container
                  {
                      $("#display1"+id).hide();
                  }


                });
              var name = $('#subscription_id1'+id).val();
              if(name=="")
                {
                $("#display1"+id).html("");
                }
              else
                {
                  $.post("ajax/subscribers.php",{action:'AutoFill1',name:name,id:id},
                   function(response){
                     $("#display1"+id).html(response);
                    });
                }
        }
        </script>
        <script>
        function TotAmt(newRow){
            var package_id=$("#package_id"+newRow).val();
            var package_type=$("#package_type"+newRow).val();
            var totalAmt=$("#totamount").val();
            $.post("ajax/subscribers.php",{action:'fetchPackageAmt',package_id:package_id,package_type:package_type},
            function(response){
               var payment_type=$("input[name='payment_type']:checked").val();
               if(payment_type=='Q'){
                    response=response*3;
               }else if(payment_type=='H'){
                    response=response*6;
               }else if(payment_type=='Y'){
                    response=response*12;
               }else{
                    response=response;
               }
               $("#amount"+newRow).val(response);
               var conveniancecount=$("#alwRow").val();
               var totAmount=0;
               for (var j = 1; j<=conveniancecount; j++) {
                    totAmount=+totAmount + +$("#amount"+j).val();
               }
               $("#totamount").val('');
               $("#final_amount").val('');
               $("#totamount").val(totAmount);
               $("#final_amount").val(totAmount);
            });
        }
        function finalAmt(){
            var totalAmt=$("#totamount").val();
            var discount=$("#discount").val();
            total=totalAmt-discount;
            $("#final_amount").val(total);
        }
        function wingFind(){
            var id=$("#headoffice_id").val();
            $.post("ajax/subscribers.php",{action:'fetchWing',headofficeId:id},
            function(response){
               $("#wing_id").html(response);
            });
        }
        function unitFind(){
            var id=$("#wing_id").val();
            $.post("ajax/subscribers.php",{action:'fetchUnit',wingId:id},
            function(response){
               $("#unit_id").html(response);
            });
        }
        function emplyeeFind(){
            var id=$("#headoffice_id").val();
            $.post("ajax/subscribers.php",{action:'fetchEmployee',headofficeId:id},
            function(response){
               $("#employee_id").html(response);
            });
        }
        function monthlyCharges(){
            var amount=$("#amount").val();
            var payment_type=$("input[name='payment_type']:checked").val();
            var monthlyCharges='';
            if(payment_type=='M'){
                monthlyCharges=amount;
            }else if(payment_type=='Q'){
                monthlyCharges=amount/3;
            }else if(payment_type=='H'){
                monthlyCharges=amount/6;
            }else{
                monthlyCharges=amount/12;
            }
            $("#monthly_charges").val(monthlyCharges);
        }
        $(document).ready(function () {
            /*var mySelect = $('#first-disabled2');

            $('#special').on('click', function () {
              mySelect.find('option:selected').prop('disabled', true);
              mySelect.selectpicker('refresh');
            });

            $('#special2').on('click', function () {
              mySelect.find('option:disabled').prop('disabled', false);
              mySelect.selectpicker('refresh');
            });*/

            $('.subscription_id').selectpicker({
              liveSearch: true,
              maxOptions: 1
            });
          });
        </script>
    {/literal}