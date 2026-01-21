   <div id="page-wrapper">

        <link href="css/jquery.datepick.css" rel="stylesheet"/>

        {literal}

            <script type="text/javascript" src="js/jquery.plugin.js"></script> 

            <script src="js/jquery.datepick.js"></script>
            <script src="js/ajaxupload.3.5.js"></script>
        {/literal}

        <div class="row">

            <div class="col-lg-12 top-div">

                <h1 class="page-header">Franchise Master</h1>

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

                            <form role="form" method="post" enctype="multipart/form-data">

                                <div class="form-group col-lg-4">

                                    <label>Name</label>

                                    <input type="text" name="name" class="form-control" value="{$rowRec.name |stripslashes}" required>

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>HSN/Sac No for Franchise</label>

                                    <input type="text" name="hsn_sac" class="form-control" value="{$rowRec.hsn_sac}" required>

                                </div>

                                <div class="form-group col-lg-4">

                                    <label>Phone No</label>

                                    <input type="text" name="phone_no" class="form-control" value="{$rowRec.phone_no}" required>

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>Mobile No</label>

                                    <input type="text" name="mobile_no" class="form-control" value="{$rowRec.mobile_no}" >

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>Email</label>

                                    <input type="email" name="email" class="form-control" value="{$rowRec.email}" required>

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>Website</label>

                                    <input type="text" name="website" class="form-control" value="{$rowRec.website}" >

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>GSTIN</label>

                                    <input type="text" name="gstin" class="form-control" value="{$rowRec.gstin}" >

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>PAN</label>

                                    <input type="text" name="pan" class="form-control" value="{$rowRec.pan}" >

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>Service Tax No</label>

                                    <input type="text" name="service_tax_no" class="form-control" value="{$rowRec.service_tax_no}" >

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>Bank Name</label>

                                    <input type="text" name="bank_name" class="form-control" value="{$rowRec.bank_name}" >

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>Account No</label>

                                    <input type="text" name="account_no" class="form-control" value="{$rowRec.account_no}" >

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>Branch Name</label>

                                    <input type="text" name="branch_name" class="form-control" value="{$rowRec.branch_name}" >

                                </div>
                                <div class="form-group col-lg-4">

                                    <label>IFSC Code</label>

                                    <input type="text" name="ifsc_code" class="form-control" value="{$rowRec.ifsc_code}" ]>

                                </div>

                                <div class="form-group col-lg-4">

                                    <label>Address</label>

                                    <textarea name="address" class="form-control">{$rowRec.address}</textarea>

                                </div>
                                
                                <div class="form-group col-lg-4">
                                    <label>Left Side Logo</label>
                                    <span id="loaderId2" style="display:none;"><img src="images/loading.gif"> <strong>Loading..</strong></span>
                                    <input type="file" name="imgfile2" id="imgfile2" class="form-control">
                                    <div id="logo2Div">
                                    {if $rowRec.logo2 neq ''}
                                        <input type="hidden" id="logo2" name="logo2" value="{$rowRec.logo2}"/>
                                        <a href="uploads/{$rowRec.logo2}" target="_blank">Show Logo</a>
                                    {/if}
                                    </div>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Right Side Logo</label>
                                    <span id="loaderId1" style="display:none;"><img src="images/loading.gif"> <strong>Loading..</strong></span>
                                    <input type="file" name="imgfile1" id="imgfile1" class="form-control">
                                    
                                    <div id="logo1Div">
                                    {if $rowRec.logo1 neq ''}
                                        <input type="hidden" id="logo1" name="logo2" value="{$rowRec.logo1}"/>
                                        <a href="uploads/{$rowRec.logo1}" target="_blank">Show Logo</a>
                                    {/if}
                                    </div>
                                    
                                </div>
                                <div class="form-group col-lg-4">

                                    <label style="width:100%">&nbsp;</label>

                                    {if $group}

                                    <button type="submit" name="submit" class="btn btn-primary">Update</button>

                                    <a href="franchise-master.php" class="btn btn-default">Cancel</a>

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

                        Franchise Records

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

            <!-- /.row -->

        </div>

        <!-- /#page-wrapper -->



    </div>

    <!-- /#wrapper -->
{literal}
<script src="js/uploadLogo.js"></script>
{/literal}
   