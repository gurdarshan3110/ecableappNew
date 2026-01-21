    <div id="page-wrapper">
   
        <div class="row">
            <div class="col-lg-12 top-div">
                <h1 class="page-header">Change Password</h1>
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
                        Change Password
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>

                            

                            <div class="form-group col-sm-3">

                                <label>Old Password</label>
                                <input type="password" name="old_password" class="form-control" required>
                            </div>

                            

                            <div class="form-group col-sm-3">

                                <label>New Password</label>

                                <input type="password" class="form-control" name="password" data-parsley-trigger="keyup" data-parsley-minlength="8" id="password" required/>

                            </div>
                            <div class="form-group col-sm-3">

                                <label>Confirm Password</label>

                                <input type="password" class="form-control" name="confirm_password" data-parsley-minlength="8" data-parsley-equalto="#password" id="confirm_password" required/>

                            </div>


                            <div class="form-group col-sm-3">

                                <label>&nbsp;</label><br>

                                <input type="submit" name="update" value="Update" class="btn btn-success">

                                <a href="change-password.php" class="btn btn-default">Cancel</a>

                            </div>

                        </form>



                    </div>

                </div>

            </div>

        </div>

        

    </div>

    <!-- END PAGE CONTENT WRAPPER -->                                

</div>            

<!-- END PAGE CONTENT -->

