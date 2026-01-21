    <div id="page-wrapper">
    <link href="../css/monthly-collections.css" rel="stylesheet">
        <div class="row">
             <div class="col-lg-12 top-div">
                <h1 class="page-header">Sms Settings</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <div class="row">
            <div class="col-lg-12" id="msg">
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
                            <form role="form" method="post" data-parsley-validate>
                                <input type="hidden" name="sno" value="{$sno}">
                                <div class="form-group col-lg-4" >
                                        <label>Send Sms</label><br>
                                        <label>
                                            <input {if $send_sms eq 'Y'}checked="checked"{/if} type="radio" name="send_sms" value="Y"> Yes
                                            <input {if $send_sms eq 'N'}checked="checked"{/if} type="radio" name="send_sms" value="N"> No
                                        </label>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="submit" class="btn btn-primary">Update</button>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
