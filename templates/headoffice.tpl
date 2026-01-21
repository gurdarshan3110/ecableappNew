    <div id="page-wrapper">
        <div class="row">
             <div class="col-lg-12 top-div">
                <h1 class="page-header">Headoffice</h1>
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
                                    <label>Headoffice Name</label>
                                    <input type="text" name="name" class="form-control" value="{$rowRec.name}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Contact person</label>
                                    <input type="text" name="contact_person" class="form-control" value="{$rowRec.contact_person}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Address</label>
                                    <textarea name="address" class="form-control">{$rowRec.address}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Mobile No</label>
                                    <input type="text" name="mobile_no" class="form-control" data-parsley-type="number" data-parsley-trigger="keyup" data-parsley-minlength="10" data-parsley-maxlength="10" value="{$rowRec.mobile_no}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>GSTIN No</label>
                                    <input type="text" name="gstin" class="form-control" value="{$rowRec.name}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Description</label>
                                    <textarea name="description" class="form-control">{$rowRec.description}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    {if $group}
                                    <button type="submit" name="submit" class="btn btn-primary">Update</button>
                                    <a href="headoffice.php" class="btn btn-default">Cancel</a>
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
                        Search Headoffice
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                <div class="form-group col-lg-4">
                                    <label>Headoffice Name</label>
                                    <input type="text" name="name" class="form-control" value="{$search.name}" >
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Contact person</label>
                                    <input type="text" name="contact_person" class="form-control" value="{$search.contact_person}" >
                                </div>
                                
                                <div class="form-group col-lg-4">
                                    <label>Mobile No</label>
                                    <input type="text" name="mobile_no" class="form-control" data-parsley-type="number" data-parsley-trigger="keyup" data-parsley-minlength="10" data-parsley-maxlength="10" value="{$search.mobile_no}" >
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
                        Headoffice Records
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