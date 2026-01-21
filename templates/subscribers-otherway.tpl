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
                </div>
            </div>
            <!-- /.col-lg-6 -->
        </div>
        <div class="row">
            <div class="col-lg-12" id="msg">
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
                                     <input type="hidden" id="alwrow" value="{$totSubBoxes}"/>
                                    <input type="hidden" id="alwRow" value="{$totSubBoxes}" />
                                    <div class="form-group col-lg-4">
                                        <label>Franchise</label>
                                        <select class="form-control" id="franchise_id" name="franchise_id" required>
                                            <option value="">-Please Select-</option>
                                            {$franchiseArray}
                                        </select>
                                    </div>
                                    <div class="form-group col-lg-12"></div>
                                    <div class="form-group col-lg-4">
                                        <label>Customer ID</label>
                                        <input type="text" name="customer_id" class="form-control" value="{$customerId}" required>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>MSO ID/Customer Code</label>
                                        <input type="text" name="mso_id" class="form-control" value="{$msoId}" required>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Serial No</label>
                                        <input type="text" name="serial_no" class="form-control" value="{$rowRec.serial_no}" >
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Subscriber GSTIN</label>
                                        <input type="text" name="subscriber_gst" class="form-control" value="{$rowRec.subscriber_gst}" >
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Areas/Sub Areas</label>
                                        <select class="form-control" id="unit_id" name="unit_id" required>
                                            <option value="">-Please Select-</option>
                                            {$unitArray}
                                        </select>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Name</label>
                                        <input type="text" name="name" class="form-control" value="{$rowRec.name}" required>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>D.O.B</label>
                                        <input type="text" name="dob" id="dob" class="form-control" value="{if $rowRec.dob eq '0000-00-00'}{else}{ $rowRec.dob |date_format:'%d/%m/%y'}{/if}" required>
                                    </div>
                                    <!-- <div class="form-group col-lg-4">
                                        <label>Identity Name</label>
                                        <input type="text" name="identity_name" class="form-control" value="{$rowRec.identity_name}">
                                    </div>
                                    <div class="form-group col-lg-4" >
                                            <label>
                                                <input {if $rowRec.relation eq 'S/O'}checked="checked"{/if} type="radio" name="relation" id="relation" value="S/O" checked> S/o
                                            </label>
                                            <label>
                                                <input {if $rowRec.relation eq 'W/O'}checked="checked"{/if} type="radio" name="relation" id="relation" value="W/O"> W/o
                                            </label>
                                            <label>
                                                <input {if $rowRec.relation eq 'D/O'}checked="checked"{/if} type="radio" name="relation" id="relation" value="D/O" {if !$group}checked{/if}> D/o
                                            </label>
                                        <input type="text" name="relative" class="form-control" value="{$rowRec.relative}">
                                    </div> -->
                                    <div class="form-group col-lg-4">
                                        <label>Mobile</label>
                                        <input type="text" name="phone_no" data-parsley-type="number" data-parsley-trigger="keyup" data-parsley-minlength="10" data-parsley-maxlength="10" class="form-control" value="{$rowRec.phone_no}" required>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Mobile2 </label>
                                        <input type="text" name="mobile_no" data-parsley-type="number" data-parsley-trigger="keyup" data-parsley-minlength="10" data-parsley-maxlength="10" class="form-control" value="{$rowRec.mobile_no}">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Email </label>
                                        <input type="text" name="email" class="form-control" value="{$rowRec.email}">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Address</label>
                                        <textarea name="address" class="form-control">{$rowRec.address}</textarea>
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Joining Date</label>
                                        <input type="text" name="connection_date" id="connection_date" class="form-control" value="{$rowRec.connection_date |date_format:%d/%m/%y}">
                                    </div>
                                    
                                    <div class="form-group col-lg-8">
                                        <label>Remarks</label>
                                        <textarea name="remarks" class="form-control" >{$rowRec.remarks}</textarea>
                                    </div>
                                    
                                    <!-- <div class="form-group col-lg-4">
                                        <label>Id Type </label>
                                        <input type="text" name="id_type" class="form-control" value="{$rowRec.id_type}">
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Id No </label>
                                        <input type="text" name="id_no" class="form-control" value="{$rowRec.id_no}">
                                    </div> -->
                                    {if $group eq ''}
                                    <div class="form-group col-lg-4">
                                        <label>Opening Balance </label>
                                        <input type="text" name="opening_balance" class="form-control" value="0">
                                    </div>
                                    {/if}
                                    <!-- <div class="form-group col-lg-4">
                                        <label>Installed By </label>
                                        <input type="text" name="installed_by" class="form-control" value="{$rowRec.installed_by}">
                                    </div> -->
                                        
                                    <div class="col-lg-12" id="payment_mthd" style="display:block;">
                                        {if $group}
                                            {$subscriberBoxes}
                                        {else}
                                        <div class="col-lg-12">
                                            
                                            <div class="col-sm-3">
                                                <label>Stb NO</label>
                                                <input type="text" name="subscription[]" onkeyup="KeyedUp1(1);" id="subscription_id11" autocomplete="off" class="form-control"/>
                                                <input type="hidden" name="subscription_id[]" id="subscription11" autocomplete="off" class="form-control"/>
                                                <div id="display11" class="display"></div>
                                            </div>
                                            <div class="col-sm-2">
                                                <label>Package</label>
                                                <select id="package_id1" onchange="TotAmt(1);"  name="package_id[]" class="form-control" required>
                                                    <option value="">-Please Select-</option>
                                                    {$packageArray}
                                                </select>
                                            </div>
                                            <div class="col-sm-2">
                                                <label style="float:left;width:100%;">A La Carte</label>
                                                <input type="text" name="la_carte_name[]" id="la_carte_name1" class="form-control" style="float:left;width:48%" placeholder="Name">&nbsp;
                                                <input type="text" name="la_carte_amount[]" id="la_carte_amount1" class="form-control" onkeyup="TotAmt(1);" style="float:left;width:48%" placeholder="Price">
                                            </div>
                                            <div class="col-sm-2">
                                                <label>Box Charges</label>
                                                <input type="text" name="box_charges[]" id="box_charges1" class="form-control" value="{$rowRec.box_charges}">
                                            </div>
                                            <div class="col-sm-2">
                                                <label>Amount</label>
                                                <input type="text" name="amount1[]" id="amount1" class="form-control" value="{$rowRec.amount}">
                                            </div>
                                            <div class="col-sm-1">
                                                <label>&nbsp;</label>
                                                <a href="javascript:;" onclick="AddMore();"  title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Identity Name</label>
                                                <input type="text" name="identity_name[]" id="identity_name1" class="form-control" value="{$rowRec.identity_name}">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Installation Date</label>
                                                <input type="text" name="installation_date[]" id="installation_date1" class="form-control" value="{php}echo date('d/m/Y');{/php}">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Id Type </label>
                                                <input type="text" name="type_id[]" id="type_id1" class="form-control" value="{$rowRec.id_type}">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Id No </label>
                                                <input type="text" name="id_no[]" id="id_no1" class="form-control" value="{$rowRec.id_no}">
                                            </div>
                                            <div class="form-group col-lg-2" >
                                                    <label>
                                                        <input {if $rowRec.relation eq 'S/O'}checked="checked"{/if} type="radio" name="relation[]" id="relation1" value="S/O" checked> S/o
                                                    </label>
                                                    <label>
                                                        <input {if $rowRec.relation eq 'W/O'}checked="checked"{/if} type="radio" name="relation[]" id="relation1" value="W/O"> W/o
                                                    </label>
                                                    <label>
                                                        <input {if $rowRec.relation eq 'D/O'}checked="checked"{/if} type="radio" name="relation[]" id="relation1" value="D/O" {if !$group}checked{/if}> D/o
                                                    </label>
                                                <input type="text" name="relative[]" id="relative1" class="form-control" value="{$rowRec.relative}">
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Installed By </label>
                                                <input type="text" name="installed_by[]" name="installed_by1" class="form-control" value="{$rowRec.installed_by}">
                                            </div>
                                        </div>
                                        {/if}
                                        <div id="allow-data"></div>
                                        <div class="col-lg-12">
                                            <div class="col-sm-3">&nbsp;</div>
                                            {if $group}
                                            <div class="col-sm-6">
                                                <label>Update Utility for Current Month Also</label><br>
                                                <input type="checkbox" name="current_utility" value="Y">
                                            </div>
                                            {else}
                                            <div class="col-sm-3">&nbsp;</div>
                                            <div class="col-sm-3">&nbsp;</div>
                                            {/if}
                                            <div class="col-sm-2">
                                                <label>Total Amount</label>
                                                <input type="text" name="pactual_amount" id="totamount" class="form-control" readonly value="{$totalAmt}">
                                            </div>
                                            <div class="col-sm-3">&nbsp;</div>
                                            <div class="col-sm-3">&nbsp;</div>
                                            <div class="col-sm-3">&nbsp;</div>
                                            <!-- <div class="col-sm-3">
                                                <label>Discount</label>
                                                <input type="text" name="discount" id="discount" onkeyup="finalAmt();" class="form-control" value="">
                                            </div> -->
                                            <div class="col-sm-2">
                                                <label>Final Amount</label>
                                                <input type="text" name="final_amount" id="final_amount" class="form-control" readonly value="{$totalAmt}">

                                            </div>

                                        </div>
                                    </div> 
                                    <div class="form-group col-lg-4">
                                        <label style="width:100%">&nbsp;</label>
                                        {if $group}
                                        <button type="submit" name="submit" class="btn btn-primary">Update</button>
                                        <a href="subscribers-otherway.php" class="btn btn-default">Cancel</a>
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
            
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Search Subscribers
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                <div class="form-group col-lg-3">
                                    <label>Customer ID</label>
                                    <input type="text" name="customer_id" class="form-control" value="{$searchArray.customer_id}" >
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>MSO ID/Customer Code</label>
                                    <input type="text" name="mso_id" class="form-control" value="{$searchArray.mso_id}" >
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>Serial No</label>
                                    <input type="text" name="serial_no" class="form-control" value="{$searchArray.serial_no}" >
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>Areas/Sub Areas</label>
                                    <select class="form-control" id="unit_id" name="unit_id" >
                                        <option value="">-Please Select-</option>
                                        {$unitArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>Name</label>
                                    <input type="text" name="name" class="form-control" value="{$searchArray.name}" >
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>Phone No</label>
                                    <input type="text" name="phone_no" class="form-control" value="{$searchArray.phone_no}" >
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>STB No</label>
                                    <input type="text" name="stb_no" class="form-control" value="{$searchArray.stb_no}" >
                                </div>
                                <div class="form-group col-lg-3">
                                    <label style="width:100%">&nbsp;</label><br>
                                    <button type="submit" name="search" class="btn btn-primary">Search</button>
                                    <a href="subscribers-otherway.php" class="btn btn-default">Cancel</a>
                                </div>
                                <div class="col-lg-12"></div>
                                <div class="form-group col-lg-3" style="font-size:14px;font-weight:900;color:red;">
                                    {if $totSubscribers neq ''}<label>Total Subscribers</label> <br>
                                        {$totSubscribers}
                                    {else}
                                    &nbsp;
                                    {/if}
                                </div>
                                <div class="form-group col-lg-3" style="font-size:14px;font-weight:900;color:red;">
                                    {if $totSubscribersBoxesActive neq ''}<label>Total Active Boxes</label> <br>
                                        {$totSubscribersBoxesActive}
                                    {else}
                                    &nbsp;
                                    {/if}
                                </div>
                                <div class="form-group col-lg-3" style="font-size:14px;font-weight:900;color:red;">
                                    {if $totBoxesDeactive neq ''}<label>Total Deactive Boxes</label> <br>
                                        {$totBoxesDeactive}
                                    {else}
                                    &nbsp;
                                    {/if}
                                </div>
                                <div class="form-group col-lg-3" style="font-size:14px;font-weight:900;color:red;">
                                    {if $totBoxesAvailable neq ''}<label>Available Boxes</label> <br>
                                        {$totBoxesAvailable}
                                    {else}
                                    &nbsp;
                                    {/if}
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Subscriber Records
                        <span style="float:right;margin-top:-6px;"><a class="btn btn-success" href="export-subscribers-data.php" target="_blank">Subscribers Excel Report</a></span>
                    </div>
                    <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover">
                                <form name="frmListing" id="frmListing" method="post" action="" onsubmit="return false;">
                                {$classData}
                                </form>
                            </table>
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
            $("#connection_date").datepick();
            $("#dob").datepick();
            $(".reaDat").datepick();
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
        function deleteRow(id){
            $("#row"+id).remove();
        }
        function AddMore(){
            var Row = $("#alwRow").val();
            var newRow = parseInt(Row)+1;
            var fullDate = new Date()
            var twoDigitMonth = ((fullDate.getMonth().length+1) === 1)? (fullDate.getMonth()+1) : '0' + (fullDate.getMonth()+1);
            var newDate = fullDate.getDate() + "/" + twoDigitMonth + "/" + fullDate.getFullYear();

            $("#alwRow").val(newRow);    
            var packageArray="{/literal}{$packageArray}{literal}";
            var laCarteArray="{/literal}{$laCarteArray}{literal}";
            var data ='<div class="col-lg-12" id="Row'+newRow+'"><div class="col-sm-3"><label>Stb NO</label><input type="text" name="subscription[]" onkeyup="KeyedUp1('+newRow+');" id="subscription_id1'+newRow+'" autocomplete="off" class="form-control"/><input required type="hidden" name="subscription_id[]" id="subscription1'+newRow+'" autocomplete="off" class="form-control" value=""/><div id="display1'+newRow+'" class="display"></div></div><div class="col-sm-2"><label>Package</label><select class="form-control" id="package_id'+newRow+'" onchange="TotAmt('+newRow+')" name="package_id[]"><option value="">-Please Select-</option>'+packageArray+'</select></div><div class="col-sm-2"><label style="float:left;width:100%;">A La Carte</label><input type="text" name="la_carte_name[]" id="la_carte_name'+newRow+'" class="form-control" style="float:left;width:44%" placeholder="Name">&nbsp;<input type="text" name="la_carte_amount[]" id="la_carte_amount'+newRow+'" class="form-control" onkeyup="TotAmt('+newRow+');" style="float:left;width:44%" placeholder="Price"></div><div class="col-sm-2"><label>Box Charges</label><input type="text" name="box_charges[]" id="box_charges'+newRow+'" class="form-control" value=""></div><div class="col-sm-2"><label>Amount</label><input type="text" name="amount1[]" id="amount'+newRow+'" class="form-control" value=""></div><div class="col-sm-1"><label>&nbsp;</label><a href="javascript:;" onclick="DeleteRow('+newRow+');" class=""><img src="images/cross.png"  style="margin: 24px 0px 0 4px;"/></a></div><div class="form-group col-lg-2"><label>Identity Name</label><input type="text" name="identity_name[]" id="identity_name'+newRow+'" class="form-control" value=""></div><div class="form-group col-lg-2"><label>Identity Name</label><input type="text" name="installation_date[]" id="installation_date'+newRow+'" class="form-control" value="'+newDate+'"></div><div class="form-group col-lg-2"><label>Id Type </label><input type="text" name="type_id[]" id="type_id'+newRow+'" class="form-control" value=""></div><div class="form-group col-lg-2"><label>Id No </label><input type="text" name="id_no[]" id="id_no'+newRow+'" class="form-control" value=""></div><div class="form-group col-lg-2" ><label><input checked="checked" type="radio" name="relation[]" id="relation'+newRow+'" value="S/O" checked> S/o</label><label><input type="radio" name="relation[]" id="relation'+newRow+'" value="W/O"> W/o</label><label><input type="radio" name="relation[]" id="relation'+newRow+'" value="D/O"> D/o</label><input type="text" name="relative[]" id="relative'+newRow+'" class="form-control" value=""></div><div class="form-group col-lg-2"><label>Installed By </label><input type="text" name="installed_by[]" id="installed_by'+newRow+'" class="form-control" value=""></div></div>';
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
        function deleteThisRow(id){
            var conf=confirm("You are going to delete this record ?");
            if(conf){
                xajax_delSubscriber(id);
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
        function updateStatus(id) {
          var status=$("#enumStatus"+id).val();
          var CurDate="{/literal}{$curDate}{literal}";
          //alert(enumStatus);
          if(status=='A'){
            var data='<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">Are you sure you want to do this task?</h4></div><div class="modal-body" id="modalData"><select class="form-control" id="reason'+id+'"><option value="Non Payment">Non Payment</option><option value="Box is Faulty.">Box is Faulty.</option><option value="Connection Transfered">Connection Transfered</option><option value="Permanent Disconnection">Permanent Disconnection</option><option value="Others">Others</option><option value="Box Returned">Box Returned</option></select></div><div class="modal-body" id="modalData"><input type="text" class="form-control reaDat" id="reason_date'+id+'" value="'+CurDate+'"></div><div class="modal-footer"><button type="button" class="btn btn-success" data-dismiss="modal" onclick="update_status('+id+');">Ok</button><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div>';
            $("#myModal").html(data);
          }else{
            var data='<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">Are you sure you want to do this task?</h4></div><div class="modal-body" id="modalData"><select class="form-control" id="reason'+id+'"><option value="Connection Restored.">Connection Restored.</option><option value="Others">Others</option></select></div><div class="modal-body" id="modalData"><input type="text" class="form-control reaDat" id="reason_date'+id+'" value="'+CurDate+'"></div><div class="modal-footer"><a class="btn btn-success" data-dismiss="modal" onclick="update_status('+id+');">Ok</a><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button></div></div></div>';
            $("#myModal").html(data);
          }
          // if (reason != null) {
          //   xajax_updateStatus(id,status,reason);
          // }
        }
        function update_status(id){
            var status=$("#enumStatus"+id).val();
            var reason=$("#reason"+id).val();
            var reasonDate=$("#reason_date"+id).val();
            if (reason != null) {
                xajax_updateStatus(id,status,reason,reasonDate);
            }
        }
        function TotAmt(newRow){
            var package_id=$("#package_id"+newRow).val();
            var laCartePrice=$("#la_carte_amount"+newRow).val();
            //var package_type=$("#package_type"+newRow).val();
            var totalAmt=$("#totamount").val();
            $.post("ajax/subscribers.php",{action:'fetchPackageAmt',package_id:package_id,package_type:'P'},
            function(response){
                var newAmt=response;
                if(laCartePrice!=''){
                    newAmt=+newAmt + +laCartePrice;
                }
               $("#amount"+newRow).val(newAmt);
               var conveniancecount=$("#alwRow").val();
               var totAmount=0;
               for (var j = 1; j<=conveniancecount; j++) {
                
                if($("#amount"+j).val()!=undefined){
                    var tempAmt=$("#amount"+j).val();
                    ///if(tempAmt !=undefined){
                    totAmount=+totAmount + +tempAmt;
                }
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
        function changeSubStatA(id){
            var reason = prompt("Are you sure you want to do this task?", "No Reason");
            if (reason != null) {
               $.post("ajax/subscribers.php",{action:'updateStatus',reason:reason,id:id,status:'D'},
               function(response){
                 $("#status"+id).html(response);
                });  
            }
        }
        function changeSubStatD(id){
            var reason = prompt("Are you sure you want to do this task?", "No Reason");
            if (reason != null) {
               $.post("ajax/subscribers.php",{action:'updateStatus',reason:reason,id:id,status:'A'},
               function(response){
                 $("#status"+id).html(response);
                });  
            }
        }
        </script>
    {/literal}