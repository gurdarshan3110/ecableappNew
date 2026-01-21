    <div id="page-wrapper">
    <link href="../css/subscribers.css" rel="stylesheet">
    <link href="css/jquery.datepick.css" rel="stylesheet"/>
        <div class="row">
            <div class="col-lg-12 top-div">
                <h1 class="page-header">Module Master</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <div class="row">
            <div class="col-lg-12">
                <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                                <h4 class="modal-title" id="myModalLabel">Modules</h4>
                            </div>
                            <div class="modal-body" id="modalData">
                                
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>
                <!-- /.modal -->
            </div>
            <!-- /.col-lg-6 -->
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
                            <form class="form validateForm" method="post" action=""  id="register" data-parsley-validate>
                                <input type="hidden" name="ID" value="" />
                                <div class="form-group col-lg-4">
                                    <label for="name">Module Name:</label>
                                    <input type="text"  name="name" value="{$rowRec.name}" id="fname"  class="form-control" required />    
                                </div> <!-- .field-group -->
                                 
                                
                                <div class="form-group col-lg-8"">
                                    <label for="name">Permission:</label>
                                    <div class="field" id="radio">
                                        <input type="checkbox" name="permission[]" {if 'V'|in_array:$arr}checked {/if} id="permission" value="V"/>View  
                                        <input type="checkbox" name="permission[]" {if 'A'|in_array:$arr}checked {/if} id="permission" value="A"/>Add
                                        <input type="checkbox" name="permission[]" {if 'E'|in_array:$arr}checked {/if} id="permission" value="E"/>Edit 
                                        <input type="checkbox" name="permission[]" {if 'D'|in_array:$arr}checked {/if} id="permission" value="D"/>Delete</br>
                                        <input type="checkbox" name="permission[]" {if 'AD'|in_array:$arr}checked {/if} id="permission" value="AD"/>Activate/Deactivate
                                    </div>
                                </div> <!-- .field-group -->
                                <div class="form-group col-lg-4""> 
                                    <label for="">&nbsp;</label>            
                                    {if $group neq ''}
                                    <button type="submit" class="btn btn-success" title="Update"  name="submit">Update</button>
                                    <a href="permissions-admin.php?page={$page}" class="btn btn-default"  title="Cancel">Cancel</a>
                                    {else}
                                    <button type="submit" class="btn btn-success" title="Submit"  name="submit">Submit</button>
                                    <a href="permissions-admin.php?page={$page}" class="btn btn-default"  title="Clear">Clear</a>
                                    <!--<button type="reset" name="reset" class="btn btn-primary"  title="Clear">Clear</button>-->
                                    {/if}
                                </div> <!-- .actions -->    
                                   
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Module Records
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
            