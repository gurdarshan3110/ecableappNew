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
                                <!-- <div class="form-group col-lg-4">
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
                                </div> -->
                                <!-- <div class="form-group col-lg-4">
                                    <label>Amount</label>
                                    <input type="text" onkeyup="monthlyCharges();" name="amount" id="amount" class="form-control" value="{$rowRec.amount}" required>
                                </div> -->
                                <div class="form-group col-lg-4">
                                    <label>Monthly Charges</label>
                                    <input type="text" name="monthly_charges" id="monthly_charges" class="form-control" value="{$rowRec.monthly_charges}" required>
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