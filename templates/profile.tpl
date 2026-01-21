    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12 top-div">
                <h1 class="page-header">Edit Profile</h1>
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
                                
                                {if $smarty.session.USER_TYPE eq 'A'}
                                <div class="form-group col-lg-4">
                                    <label>Name</label>
                                    <input type="text" name="name" class="form-control" value="{$resRow.name}" required>
                                </div>
                                
                                <div class="form-group col-lg-4">
                                    <label>Address</label>
                                    <input type="text" name="address" class="form-control" value="{$resRow.address}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Phone No(Comma Separated)</label>
                                    <input type="text" name="phone_no" class="form-control" value="{$resRow.mobile_no}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>GSTIN</label>
                                    <input type="text" name="gstin" class="form-control" value="{$resRow.gstin}" required>
                                </div>
                                {else}
                                <div class="form-group col-lg-4">
                                    <label>Name</label>
                                    <input type="text" name="name" class="form-control" readonly value="{$resRow.name}" required>
                                </div>
                                
                                <div class="form-group col-lg-4">
                                    <label>Address</label>
                                    <input type="text" name="address" class="form-control" readonly value="{$resRow.address}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Mobile No</label>
                                    <input type="text" name="phone_no" class="form-control" value="{$resRow.phone_no}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Email</label>
                                    <input type="text" name="email" class="form-control" value="{$resRow.email}" required>
                                </div>
                                {/if}
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="submit" class="btn btn-primary">Update</button>
                                    <a href="profile.php" class="btn btn-default">Cancel</a>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            <!-- /.row -->
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->