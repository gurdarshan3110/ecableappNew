    <div id="page-wrapper">
    <link href="../css/monthly-collections.css" rel="stylesheet">
    <link href="css/jquery.datepick.css" rel="stylesheet"/>
        <div class="row">
             <div class="col-lg-12 top-div">
                <h1 class="page-header">Pending Report</h1>
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
                                <!-- <div class="form-group col-lg-3">
                                    <label>From Date</label>
                                    <input type="text" name="from_date" id="from" class="form-control" value="{$from_date}" >
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>To Date</label>
                                    <input type="text" name="to_date" id="to" class="form-control" value="{$to_date}" >
                                </div>  -->
                                <div class="form-group col-lg-3">
                                    <label>Payment Status</label>
                                    <select id="status"  name="status" class="form-control">
                                        <option value="All">-All-</option>
                                        <option {if $rowRec.status eq 'PP'}selected="selected"{/if} value="PP">-Partially Paid-</option>
                                        <option {if $rowRec.status eq 'UP'}selected="selected"{/if} value="UP">-Unpaid-</option>
                                    </select>
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>Employee</label>
                                    <select id="employee_id"  name="employee_id" class="form-control">
                                        <option value="">-All-</option>
                                        {$employeeArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-3">
                                    <label>Subscibers</label><br>
                                    <input type="radio" name="subscriber_status" {if $rowRec.subscriber_status ''} checked="checked"{/if} value="">&nbsp;All
                                    <input type="radio" name="subscriber_status" {if $rowRec.subscriber_status 'A'} checked="checked"{/if} value="A">&nbsp;Active
                                    <input type="radio" name="subscriber_status" {if $rowRec.subscriber_status 'D'} checked="checked"{/if} value="D">&nbsp;Deactive
                                </div>
                                <div class="form-group col-lg-3">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                                    <button type="reset" class="btn btn-default">Reset</button>
                                </div>
                                <div class="form-group col-lg-3" style="font-size:14px;font-weight:900;color:red;">
                                    {if $totBal neq ''}<label>Total Balance (Total Subscribers)</label> <br>
                                    &#8377; {$totBal} ({$totSubscribers})
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
                        Pending Report
                        <span style="float:right;margin-top:-6px;"><a class="btn btn-success" href="export-pending-report.php?employee_id={$rowRec.employee_id}&status={$rowRec.status}">Excel Report</a></span>
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
        </script>
        {/literal}
    </div>
    <!-- /#wrapper -->
