    <div id="page-wrapper">
        <link href="css/jquery.datepick.css" rel="stylesheet"/>
        {literal}
            <script type="text/javascript" src="js/jquery.plugin.js"></script> 
            <script src="js/jquery.datepick.js"></script>
            <script type="text/javascript" src="js/bootstrap-multiselect.js"></script>
        <link rel="stylesheet" href="css/bootstrap-multiselect.css" type="text/css"/>
        <style type="text/css">
            .btn-group {
                 width: 100%;
            }
            .multiselect.dropdown-toggle.btn.btn-default {
                width: 100%;
            }
        </style>
        {/literal}
        <div class="row">
            <div class="col-lg-12 top-div">
                <h1 class="page-header">Employees Master</h1>
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
                                <div class="form-group col-lg-4">
                                    <label>Areas/Sub Areas</label><br>
                                    <select class="form-control headoffice-div" id="unit_id"  name="unit_id[]" multiple="multiple" data-parsley-validate>
                                        {$unitArray}
                                    </select>
                                </div>
                                <!-- <div class="form-group col-lg-4">
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
                                    <select class="form-control" id="unit_id" name="unit_id" required>
                                        <option value="">-Please Select-</option>
                                        {if $group neq ''}
                                            {$unitArray}
                                        {/if}
                                    </select>
                                </div> -->
                                <div class="form-group col-lg-4">
                                    <label>Name</label>
                                    <input type="text" name="name" class="form-control" value="{$rowRec.name}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Phone No</label>
                                    <input type="text" name="phone_no" class="form-control" data-parsley-type="number" value="{$rowRec.phone_no}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Address</label>
                                    <textarea name="address" class="form-control">{$rowRec.address}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Joining Date</label>
                                    <input type="text" name="joining_date" id="joining_date" class="form-control" value="{$rowRec.joining_date}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Salary</label>
                                    <input type="text" name="basic_salary" class="form-control" value="{$rowRec.basic_salary}" required>
                                </div>
                                <!-- <div class="form-group col-lg-4">
                                    <label>IMEI</label>
                                    <input type="text" name="imei" class="form-control" value="{$rowRecUser.imei}">
                                </div> -->
                                <div class="form-group col-lg-4">
                                    <label>Remarks</label>
                                    <textarea name="remarks" class="form-control">{$rowRec.remarks}</textarea>
                                </div>
                                {if $group}
                                <div class="form-group col-lg-4">
                                    <label>Password</label>
                                    <input type="text" name="password" class="form-control" value="{$rowRecUser.password}">
                                </div>
                                {/if}
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
                        Employees Records
                    </div>
                    <div class="table-responsive">
                            <form name="frmListing" id="frmListing" method="post" action="" onsubmit="return false;">
                                <table class="table table-striped table-bordered table-hover">
                                    {$classData}
                                </table>
                            </form>
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
            $.post("ajax/employees.php",{action:'fetchWing',headofficeId:id},
           function(response){
               $("#wing_id").html(response);
            });
        }
        function unitFind(){
            var id=$("#wing_id").val();
            $.post("ajax/employees.php",{action:'fetchUnit',wingId:id},
           function(response){
               $("#unit_id").html(response);
            });
        }
        </script>
        <script type="text/javascript">
            $(document).ready(function() {
                $('#unit_id').multiselect({
                    enableClickableOptGroups: true
                });
            });
        </script>
        <script type="text/javascript" language="javascript" class="init">
            $("#joining_date").datepick();
        </script>
    {/literal}