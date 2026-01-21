    <link href="css/jquery.datepick.css" rel="stylesheet"/>
    <div id="page-wrapper">
        <div class="row">
             <div class="col-lg-12 top-div">
                <h1 class="page-header">Headoffice Recharge</h1>
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
                        New Recharge
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                <div class="form-group col-lg-4">
                                    <label>Headoffice</label>
                                    <select class="form-control" id="headoffice_id" name="headoffice_id" required>
                                        <option value="">-Please Select-</option>
                                            {$headofficeArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4" id="Rate">
                                    <label>Amount </label>
                                    <input type="text" name="amount" class="form-control" value="{$rowRec.amount}">
                                </div>
                                <div class="form-group col-lg-4" id="Amount">
                                    <label>Description</label>
                                    <textarea name="description" id="description" class="form-control">{$rowRec.description}</textarea>
                                </div>
                                
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    {if $group}
                                    <button type="submit" name="submit" class="btn btn-primary">Update</button>
                                    <a href="headoffice-recharge.php" class="btn btn-default">Cancel</a>
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
                        Search Headoffice Recharge Log
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                <div class="form-group col-lg-4">
                                    <label>Headoffice</label>
                                    <select class="form-control" id="headoffice_id" name="headoffice_id" required>
                                        <option value="">-Please Select-</option>
                                            {$searchArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="search" class="btn btn-primary">Search</button>
                                    <button type="reset" class="btn btn-default">Reset</button>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Recharge Log
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <form name="frmListing" id="frmListing" method="post" action="" onsubmit="return false;">
                                <table class="table table-striped table-bordered table-hover">
                                    {$classData}
                                </table>
                            </form>
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