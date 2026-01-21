    <div id="page-wrapper">
    <link href="../css/monthly-collections.css" rel="stylesheet">
    <link href="css/jquery.datepick.css" rel="stylesheet"/>
        <div class="row">
             <div class="col-lg-12 top-div">
                <h1 class="page-header">Collection Report</h1>
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
                    <div class="panel-heading" style="height: 35px;">
                        <span style="float:left;width:79%;margin:0;padding:0;">{$pageheading}</span>              
                        <span style="float:right;width:21%" id="head"></span>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post">
                                <div class="form-group col-lg-3">
                                    <label>From Date</label>
                                    <input type="text" name="from_date" id="from" class="form-control required" value="{$from_date}" >
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>To Date</label>
                                    <input type="text" name="to_date" id="to" class="form-control required" value="{$to_date}" >
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>Collection By</label>
                                    <select id="employee_id"  name="employee_id" class="form-control">
                                        <option value="">-All-</option>
                                        <option {if $searchArray.employee_id eq 'O'}selected="selected"{/if} value="O" >-Online-</option>
                                        <option {if $searchArray.employee_id eq $adminId}selected="selected"{/if} value="{$adminId}" >-Admin-</option>
                                        {$employeeArray}
                                    </select>
                                </div>
                                <!-- <div class="form-group col-lg-3">
                                    <label>Status</label>
                                    <select id="status"  name="status" class="form-control">
                                        <option {if $rowRec.status eq 'P'}selected="selected"{/if} value="P">-Pending-</option>
                                        <option {if $rowRec.status eq 'PC'}selected="selected"{/if} value="PC">-Partially Paid-</option>
                                        <option {if $rowRec.status eq 'C'}selected="selected"{/if} value="C">-Completly Collected-</option>
                                    </select>
                                </div> -->
                                <div class="form-group col-lg-3">
                                        <label>Areas/Sub Areas</label>
                                        <select class="form-control" id="unit_id" name="unit_id">
                                            <option value="">-Please Select-</option>
                                            {$unitArray}
                                        </select>
                                    </div>
                                <div class="form-group col-lg-3">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                                    <a href="/collection-report.php" class="btn btn-default">Reset</a>
                                </div>
                                <div class="form-group col-lg-3" style="font-size:14px;font-weight:900;color:#006600;">
                                    {if $totCol neq ''}<label>Total Collection &#8377; {$totCol}
                                    <br>No Of Reciepts {$totSubscribers}</label>
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
                        Collection Report
                        <span style="float:right;margin-top:-6px;"><a class="btn btn-success" href="export-collection-report.php?from_date={$from_date}&to_date={$to_date}&employee_id={$rowRec.employee_id}&status={$rowRec.status}&unit_id={$rowRec.unit_id}">Excel Report</a></span>
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
        </div>
        <!-- /#page-wrapper -->
        {literal}
        <script type="text/javascript" src="js/jquery.plugin.js"></script> 
        <script src="js/jquery.datepick.js"></script>
        <script type="text/javascript" language="javascript" class="init">
            $("#from").datepick();
            $("#to").datepick();
            function updateStatus(id) {
                 var status=$("#enumStatus"+id).val();
              //alert(enumStatus);
              var reason = prompt("Are you sure you want to do this task?", "No Reason");
              if (reason != null) {
                xajax_updateStatus(id,status,reason);
              }
            }
        </script>
        {/literal}
    </div>
    <!-- /#wrapper -->
