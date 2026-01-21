    <div id="page-wrapper">
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
                            <form role="form" method="post">
                                <input type="hidden" id="alwrow" value="1" />
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
                                    <textarea name="address" class="form-control">{$rowRec.address}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Phone No</label>
                                    <input type="text" name="phone_no" class="form-control" value="{$rowRec.phone_no}" required>
                                </div>
                                
                                <div class="form-group col-lg-4">
                                    <label>Subscription Date</label>
                                    <input type="text" name="subscription_date" class="form-control" value="{$rowRec.subscription_date}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Remarks</label>
                                    <textarea name="remarks" class="form-control">{$rowRec.remarks}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Payment Type</label>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="M" checked>Monthly
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label>    
                                            <input type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="Q">Quaterly
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="H">Half Yearly
                                        </label>
                                    </div>
                                    <div class="radio">
                                        <label>
                                            <input type="radio" onclick="monthlyCharges();" name="payment_type" id="payment_type" value="Y">Yearly
                                        </label>
                                    </div>
                                </div> 
                                <div class="form-group col-lg-4">
                                    <label>Amount</label>
                                    <input type="text" onkeyup="monthlyCharges();" name="amount" id="amount" class="form-control" value="{$rowRec.amount}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Monthly Charges</label>
                                    <input type="text" name="monthly_charges" id="monthly_charges" class="form-control" value="{$rowRec.monthly_charges}" required>
                                </div><br>
                                <div class="form-group col-lg-12">&nbsp;</div>
                                <div class="col-lg-12">
                                    <div class="form-group col-lg-1">
                                        <label>CT No.</label>
                                        <input type="text" name="ct_no" id="ct_no" class="form-control" value="{$rowRec.ct_no}" required>
                                    </div>
                                    <div class="form-group col-lg-2">
                                        <label>STB No.</label>
                                        <input type="text" name="ct_no" id="ct_no" class="form-control" value="{$rowRec.ct_no}" required>
                                    </div>
                                    <div class="form-group col-lg-2">
                                        <label>VC No.</label>
                                        <input type="text" name="ct_no" id="ct_no" class="form-control" value="{$rowRec.ct_no}" required>
                                    </div>
                                    <div class="form-group col-lg-2">
                                        <label>SAF No.</label>
                                        <input type="text" name="ct_no" id="ct_no" class="form-control" value="{$rowRec.ct_no}" required>
                                    </div>
                                    <div class="form-group col-lg-2">
                                        <label>UA/MAC No.</label>
                                        <input type="text" name="ct_no" id="ct_no" class="form-control" value="{$rowRec.ct_no}" required>
                                    </div>
                                    <div class="form-group col-lg-2">
                                        <label>Model</label>
                                        <input type="text" name="ct_no" id="ct_no" class="form-control" value="{$rowRec.ct_no}" required>
                                    </div>
                                    <div class="form-group col-lg-1">
                                        <label>&nbsp;</label>
                                        <a href="javascript:;" onclick="Addmore();" class="btn btn-primary" style="margin:0 0 0 -20px;" title="Add More">Add More</a>
                                    </div>
                                </div>
                                <div id="allownace-data"></div> 
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
                        <!-- /.table-responsive -->
                    </div>
                </div>
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
    {literal}
        <script>
        function Addmore(){
            var row = $("#alwrow").val();
            var newrow = parseInt(row)+1;
            $("#alwrow").val(newrow);    
            var data ='<div class="col-lg-12" id="row'+newrow+'"><div class="form-group col-lg-1"><label>CT No.</label><input type="text" name="ct_no" id="ct_no" class="form-control" value="" required></div><div class="form-group col-lg-2"><label>STB No.</label><input type="text" name="ct_no" id="ct_no" class="form-control" value="" required></div><div class="form-group col-lg-2"><label>VC No.</label><input type="text" name="ct_no" id="ct_no" class="form-control" value="" required></div><div class="form-group col-lg-2"><label>SAF No.</label><input type="text" name="ct_no" id="ct_no" class="form-control" value="" required></div><div class="form-group col-lg-2"><label>UA/MAC No.</label><input type="text" name="ct_no" id="ct_no" class="form-control" value="" required></div><div class="form-group col-lg-2"><label>Model</label><input type="text" name="ct_no" id="ct_no" class="form-control" value="" required></div><div class="form-group col-lg-1"><label>&nbsp;</label><a href="javascript:;" onclick="deleteRow('+newrow+');" style="margin:24px 0 0 -20px;" class="btn btn-default btn-small amt-moreone">Delete</a></div></div>';
            /*<div class="title-div" id="row'+newrow+'"><div class="title-field-group"></div><div class="title-field-group"></div><div class="title-field-group"><label for="name">Allowance type:</label><div class="field"><select onchange="compareval('+newrow+');"  class="title-fill required" id="allowance_id'+newrow+'" name="allowance_id[]"><option value="" selected="selected">-Please Select-</option>{/literal}{$allowanceTypeArrayExtra}{literal}</select></div></div><div class="title-field-group"><label for="name">Allowance (%age):</label><div class="field "><div style="float:left;"><input type="text" name="percentage[]" style="width:30px;" data-parsley-pattern="^[(0-9)(.)]+$" maxlength="4" id="alw_'+newrow+'" class="required alw-p" onblur="calculateAllowance(this.id,this.value)" /></div><div style="float:left;"><input type="text" name="amount[]" readonly="" style="width:50px;" placeholder="Amount" class="alw-amt amt-more" id="amt_'+newrow+'"/></div><div style="float:left;"><a href="javascript:;" onclick="deleteRow('+newrow+');" class="btn btn-red btn-small amt-moreone">Delete</a></div></div></div>';*/
        $("#allownace-data").append(data); 

        }

        function deleteRow(id){
            $("#row"+id).remove();
        }
        </script>
        <script>
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
    {/literal}