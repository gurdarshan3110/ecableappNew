    <div id="page-wrapper">
        {literal}
        <script src="js/permission.js"></script>
        {/literal}
        <div class="row">
            <div class="col-lg-12 top-div">
                <h1 class="page-header">Manage Permissions</h1>
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
                                <h4 class="modal-title" id="myModalLabel">Permissions</h4>
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
                            <form class="form validateForm" method="post" action="" onsubmit="CheckValidation();">
                                <div style="float:left; width:100%">    
                                    <div class="title-div">
                                        <div class="form-group col-lg-4">
                                            <label for="name">Employee:</label>
                                                <select class="form-control" id="employee_id" name="employee_id" onchange="pagePermissions(this.value,'');" >
                                                    <option value="">-Please Select-</option>
                                                    {$staffArray}
                                                </select> 
                                        </div> <!-- .field-group -->
                                    </div>
                                    <div class="form-group col-lg-12">
                                        <table width="100%">
                                        <tr>
                                        <td width="30%"><strong>Module Name</strong></td>
                                        <td width="10%"><strong>View</strong></td>
                                        <td width="10%"><strong>Add</strong></td>
                                        <td width="10%"><strong>Edit</strong></td>
                                        <td width="20%"><strong>Delete</strong></td>
                                        <td width="10%"><strong>Activate/Deactivate</strong></td>
                                        </tr>
                                        {$permission_recs}
                                        </table>
                                    </div>
                                </div>
                                <div style="clear:both;"></div>
                                <!--{if $smarty.session.CURRENT_SCHOOL_YEAR eq 1}--><!--{/if}-->
                                <div class="form-group col-lg-12">                      
                                {if $group neq ''}
                                <button type="submit" class="btn btn-primary"  name="submit">Update</button>
                                {else}
                                <button type="submit" class="btn btn-primary"  name="submit">Submit</button>
                                {/if}
                                </div> <!-- .actions -->
                                
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-wrapper -->
    </div>
