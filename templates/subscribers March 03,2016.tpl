    <div id="page-wrapper">
    <link href="../css/subscribers.css" rel="stylesheet">
    <link href="css/jquery.datepick.css" rel="stylesheet"/>
    {literal}
        <script type="text/javascript" src="js/jquery.plugin.js"></script> 
        <script src="js/jquery.datepick.js"></script>
    {/literal}
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Subscribers Master</h1>
            </div>
            <!-- /.col-lg-12 -->
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
                                <input type="hidden" id="alwrow" value="1" />
                                <input type="hidden" id="alwRow" value="1" />
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
                                <div class="form-group col-lg-4">
                                    <label>Address</label>
                                    <textarea name="address" class="form-control" style="height: 35px;">{$rowRec.address}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Phone No</label>
                                    <input type="text" name="phone_no" class="form-control" value="{$rowRec.phone_no}" required>
                                </div>
                                
                                <div class="form-group col-lg-4">
                                    <label>Connection Date</label>
                                    <input type="text" name="connection_date" id="subscription_date" class="form-control" value="{$rowRec.connection_date}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Remarks</label>
                                    <textarea name="remarks" class="form-control" style="height: 35px;">{$rowRec.remarks}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Payment Method</label>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" onclick="PaymentMethod();" name="payment_method" id="payment_method" value="L" checked>Lum Sum
                                        </label>
                                    </div>
                                      <!-- <label>&nbsp;</label>-->
                                    <div class="radio">
                                        <label>
                                            <input type="radio" onclick="PaymentMethod();" name="payment_method" id="payment_method" value="P">Package
                                        </label>
                                    </div>
                                </div>
                                <div class="form-group col-lg-2">
                                    <label>Payment Type</label>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="M" checked>Monthly
                                        </label>
                                    </div>
                                     <!-- <label>&nbsp;</label>-->
                                    <div class="radio">
                                        <label>    
                                            <input type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="Q">Quaterly
                                        </label>
                                    </div>
                                </div>
                                
                                <div class="form-group col-lg-2">
                                <label>&nbsp;</label>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="Y">Yearly
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="H">Half Yearly
                                        </label>
                                    </div>
                                   <!-- <label>&nbsp;</label>-->
                                   
                                </div>
                               
                                <div class="form-group col-lg-12" id="payment_amt">
                                    <div class="form-group col-lg-4">
                                        <label>Amount</label>
                                        <input type="text" onkeyup="monthlyCharges();" name="actual_amount" id="amount" class="form-control" value="{$rowRec.amount}" >
                                    </div>
                                    <div class="form-group col-lg-4">
                                        <label>Monthly Charges</label>
                                        <input type="text" name="amount" id="monthly_charges" class="form-control" value="{$rowRec.monthly_charges}" >
                                    </div>
                                    <div class="form-group col-lg-12">&nbsp;</div>
                                        <div class="col-lg-12">
                                            
                                            <div class="form-group col-lg-2">
                                                <label>STB No.</label>
                                                <input type="text" name="stb_no[]" id="stb_no" class="form-control" value="{$rowRec.ct_no}" >
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>VC No.</label>
                                                <input type="text" name="vc_no[]" id="vc_no" class="form-control" value="{$rowRec.ct_no}" >
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>SAF No.</label>
                                                <input type="text" name="saf_no[]" id="saf_no" class="form-control" value="{$rowRec.ct_no}" >
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>UA/MAC No.</label>
                                                <input type="text" name="mac_no[]" id="mac_no" class="form-control" value="{$rowRec.ct_no}" >
                                            </div>
                                            <div class="form-group col-lg-2">
                                                <label>Model</label>
                                                <input type="text" name="model[]" id="model" class="form-control" value="{$rowRec.ct_no}" >
                                            </div>
                                            <div class="form-group col-lg-1">
                                                <label>&nbsp;</label>
                                                <a href="javascript:;" onclick="Addmore();" title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                                            </div>
                                        </div>
                                        <div id="allownace-data"></div>
                                </div>
                                    <div class="form-group col-lg-12">&nbsp;</div>
                                    <div class="col-lg-12" id="payment_mthd" style="display:none;">
                                        <div class="col-lg-12">
                                            
                                            <div class="table-data">
                                                <label>STB No.</label>
                                                <input type="text" name="stb_no[]" id="stb_no" class="form-control" value="{$rowRec.ct_no}">
                                            </div>
                                            <div class="table-data">
                                                <label>VC No.</label>
                                                <input type="text" name="vc_no[]" id="vc_no" class="form-control" value="{$rowRec.ct_no}">
                                            </div>
                                            <div class="table-data">
                                                <label>SAF No.</label>
                                                <input type="text" name="saf_no[]" id="saf_no" class="form-control" value="{$rowRec.ct_no}">
                                            </div>
                                            <div class="table-data">
                                                <label>UA/MAC No.</label>
                                                <input type="text" name="mac_no[]" id="mac_no" class="form-control" value="{$rowRec.ct_no}">
                                            </div>
                                            <div class="table-data">
                                                <label>Model</label>
                                                <input type="text" name="model[]" id="model" class="form-control" value="{$rowRec.ct_no}">
                                            </div>
                                            <div class="table-data">
                                                <label>Package</label>
                                                <select class="form-control" id="package_id1"  name="package_id[]">
                                                    <option value="">-Please Select-</option>
                                                    {$packageArray}
                                                </select>
                                            </div>
                                            <div class="table-data">
                                                <label>Type</label>
                                                <select class="form-control" id="package_type1" onchange="TotAmt(1);"  name="package_type[]">
                                                    <option value="">-Please Select-</option>
                                                    <option value="P">Parent</option>
                                                    <option value="C">Child</option>
                                                </select>
                                            </div>
                                            <div class="table-data">
                                                <label>Amount</label>
                                                <input type="text" name="amount1" id="amount1" class="form-control" value="{$rowRec.amount}">
                                            </div>
                                            <div class="table-data">
                                                <label>&nbsp;</label>
                                                <a href="javascript:;" onclick="AddMore();"  title="Add More"><img src="images/plus.png"  style="margin: 24px 0px 0px;"/></a>
                                            </div>
                                        </div>
                                        <div id="allow-data"></div>
                                        <div class="col-lg-12">
                                            <div class="table-data">&nbsp;</div>
                                            <div class="table-data">&nbsp;</div>
                                            <div class="table-data">&nbsp;</div>
                                            <div class="table-data">&nbsp;</div>
                                            <div class="table-data">&nbsp;</div>
                                            <div class="table-data">
                                                <label>Total Amount</label>
                                                <input type="text" disabled="" name="pactual_amount" id="totamount" class="form-control" value="">
                                            </div>
                                            <div class="table-data">
                                                <label>Discount</label>
                                                <input type="text" name="discount" id="discount" onkeyup="finalAmt();" class="form-control" value="">
                                            </div>
                                            <div class="table-data">
                                                <label>Final Amount</label>
                                                <input type="text" disabled="" name="final_amount" id="final_amount" class="form-control" value="">
                                            </div>
                                        </div>
                                    </div> 
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    {if $group}
                                    <button type="submit" name="submit" class="btn btn-primary">Update</button>
                                    <a href="employees.php" class="btn btn-default">Cancel</a>
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
                        Subscriber Records
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover">
                                {$classData}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
    {literal}
        <script>
        function PaymentMethod(){
            var radio=$("input[name='payment_method']:checked").val();
            if(radio=='L'){
                $("#payment_amt").show();
                $("#payment_mthd").hide();
            }else{
                $("#payment_mthd").show();
                $("#payment_amt").hide();
            }
        }
        function Addmore(){
            var row = $("#alwrow").val();
            var newrow = parseInt(row)+1;
            $("#alwrow").val(newrow);    
            var data ='<div class="col-lg-12" id="row'+newrow+'"><div class="form-group col-lg-2"><label>STB No.</label><input type="text" name="stb_no[]" id="stb_no" class="form-control" value="" ></div><div class="form-group col-lg-2"><label>VC No.</label><input type="text" name="vc_no[]" id="vc_no" class="form-control" value="" ></div><div class="form-group col-lg-2"><label>SAF No.</label><input type="text" name="saf_no[]" id="saf_no" class="form-control" value="" ></div><div class="form-group col-lg-2"><label>UA/MAC No.</label><input type="text" name="mac_no[]" id="mac_no" class="form-control" value="" ></div><div class="form-group col-lg-2"><label>Model</label><input type="text" name="model[]" id="model" class="form-control" value="" ></div><div class="form-group col-lg-1"><label>&nbsp;</label><a href="javascript:;" onclick="deleteRow('+newrow+');" class=""><img src="images/cross.png"  style="margin: 24px 0px 0px 4px;"/></a></div></div>';
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
            var data ='<div class="col-lg-12" id="Row'+newRow+'"><div class="table-data"><label>STB No.</label><input type="text" name="stb_no[]" id="stb_no" class="form-control" value=""></div><div class="table-data"><label>VC No.</label><input type="text" name="vc_no[]" id="vc_no" class="form-control" value=""></div><div class="table-data"><label>SAF No.</label><input type="text" name="saf_no[]" id="saf_no" class="form-control" value=""></div><div class="table-data"><label>UA/MAC No.</label><input type="text" name="mac_no[]" id="mac_no" class="form-control" value=""></div><div class="table-data"><label>Model</label><input type="text" name="model[]" id="model" class="form-control" value=""></div><div class="table-data"><label>Package</label><select class="form-control" id="package_id'+newRow+'"  name="package_id"><option value="">-Please Select-</option>'+packageArray+'</select></div><div class="table-data"><label>Type</label><select class="form-control" id="package_type'+newRow+'"  name="package_type[]" onchange="TotAmt('+newRow+');"><option value="">-Please Select-</option><option value="P">Parent</option><option value="C">Child</option></select></div><div class="table-data"><label>Amount</label><input type="text" name="amount1[]" id="amount'+newRow+'" class="form-control" value=""></div><div class="table-data"><label>&nbsp;</label><a href="javascript:;" onclick="DeleteRow('+newRow+');" class=""><img src="images/cross.png"  style="margin: 24px 0px 0 4px;"/></a></div></div>';
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
               var total=+totalAmt + +response;
               $("#totamount").val(total);
               $("#final_amount").val(total);
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
            var id=$("#unit_id").val();
            $.post("ajax/subscribers.php",{action:'fetchEmployee',unitId:id},
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
        </script>
        <script type="text/javascript" language="javascript" class="init">
            $("#subscription_date").datepick();
        </script>
    {/literal}