    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12 top-div">
                <h1 class="page-header">Settop Box Master</h1>
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
                                <div class="form-group col-lg-4">
                                    <label>CT No.</label>
                                    <input type="text" name="carton_no" id="carton_no" class="form-control" value="{$rowRec.carton_no}">
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>STB No.</label>
                                    <input type="text" name="stb_no" id="stb_no" class="form-control" value="{$rowRec.stb_no}">
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Vc No.</label>
                                    <input type="text" name="vc_no" id="vc_no" class="form-control" value="{$rowRec.vc_no}" >
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>SAF No.</label>
                                    <input type="text" name="saf_no" id="saf_no" class="form-control" value="{$rowRec.saf_no}" >
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>UA/MAC No.</label>
                                    <input type="text" name="mac_no" id="mac_no" class="form-control" value="{$rowRec.mac_no}" >
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Model</label>
                                    <input type="text" name="model" id="model" class="form-control" value="{$rowRec.model}" >
                                </div> 
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    {if $group}
                                    <button type="submit" name="submit" class="btn btn-primary">Update</button>
                                    <a href="setup-boxes.php" class="btn btn-default">Cancel</a>
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
                        Search Settop Box
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                <div class="form-group col-lg-4">
                                    <label>Search For</label>
                                    <input type="text" name="search_keyword" id="search_keyword" class="form-control" value="{$rowRec.search_keyword}">
                                </div>
                                <div class="form-group col-lg-4" >
                                        <label>
                                            <input {if $rowRec.status eq 'AV'}checked="checked"{/if} type="radio" name="status" id="status" value="AV"> Available
                                        </label>
                                        <label>
                                            <input {if $rowRec.status eq 'B'}checked="checked"{/if} type="radio" name="status" id="status" value="B"> Booked
                                        </label>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="search" class="btn btn-primary">Search</button>
                                    <a href="setup-boxes.php" class="btn btn-default">Cancel</a>
                                    
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Setup Box Records
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

    </div>
    <!-- /#wrapper -->
