    <link href="css/jquery.datepick.css" rel="stylesheet"/>
    <div id="page-wrapper">
        <div class="row">
             <div class="col-lg-12 top-div">
                <h1 class="page-header">Headoffice Collections</h1>
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
                        Headoffice Collections
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                <div class="form-group col-lg-3">
                                    <label>Headoffice</label>
                                    <select class="form-control" id="headoffice_id" name="headoffice_id" required>
                                        <option value="">-Please Select-</option>
                                            {$headofficeArray}
                                    </select>
                                </div>
                                <!-- <div class="form-group col-lg-8" >
                                    <br>
                                    <label>
                                        <input {if $rowRec.type eq 'L'}checked="checked"{/if} type="radio" name="type" id="type" value="L" checked> Lum Sum
                                    </label>
                                    <label>
                                        <input {if $rowRec.type eq 'B'}checked="checked"{/if} type="radio" name="type" id="type" value="B"> Billing
                                    </label>
                                </div> -->
                                <div class="form-group col-lg-3">
                                    <label>Rate/Sms </label>
                                    <input type="text" name="rate_sms" class="form-control" value="{$rowRec.rate_sms}">
                                    <input type="hidden" name="type" class="form-control" value="{$rowRec.rate_sms}">
                                </div>
                                <div class="form-group col-lg-3" id="Rate">
                                    <label>Rate/Bill </label>
                                    <input type="text" name="rate" class="form-control" value="{$rowRec.rate}">
                                </div>
                                <div class="form-group col-lg-3" id="Rate">
                                    <label>Credit Amount </label>
                                    <input type="text" name="credit_amount" class="form-control" value="{$rowRec.credit_amount}">
                                </div>
                                <!--<div class="form-group col-lg-3" id="Amount">
                                    <label>Amount</label>
                                    <input type="text" name="amount" id="amount" class="form-control" value="{$rowRec.amount}">
                                </div>
                                 <div class="form-group col-lg-4" id="ExpiryDate">
                                    <label>Expiry Date</label>
                                    <input type="text" name="expiry_date" id="datepicker" class="form-control" value="">
                                </div> -->
                                
                                <div class="form-group col-lg-3">
                                    <label style="width:100%">&nbsp;</label>
                                    {if $group}
                                    <button type="submit" name="submit" class="btn btn-primary">Update</button>
                                    <a href="headoffice-collections.php" class="btn btn-default">Cancel</a>
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
                        Search Headoffice Collections
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
    {literal}
    <script type="text/javascript" src="js/jquery.plugin.js"></script> 
    <script src="js/jquery.datepick.js"></script>
    <script type="text/javascript">
        $("#datepicker").datepick();
        // $(function(){
        //     var type="{/literal}{$rowRec.type}{literal}";
        //     if(type=='L' || type==''){
        //         $("#collectionAgent").css('display','none');
        //         $("#Rate").css('display','none');
        //         $("#Amount").css('display','block');
        //         $("#ExpiryDate").css('display','block');
        //     }else{
        //         $("#collectionAgent").css('display','block');
        //         $("#Rate").css('display','block');
        //         $("#Amount").css('display','block');
        //         $("#ExpiryDate").css('display','none');
        //     }
        // });
        // $("input[name='type']").change(function(){
        //     if ($(this).val() === 'L') {
        //         $("#collectionAgent").css('display','none');
        //         $("#Rate").css('display','none');
        //         $("#Amount").css('display','block');
        //         $("#ExpiryDate").css('display','block');
        //     }else{
        //         $("#collectionAgent").css('display','block');
        //         $("#Rate").css('display','block');
        //         $("#Amount").css('display','block');
        //         $("#ExpiryDate").css('display','none');
        //     }
        // });

    </script>
    {/literal}