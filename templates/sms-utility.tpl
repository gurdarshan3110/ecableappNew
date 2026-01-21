{literal}
<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-3-typeahead/4.0.1/bootstrap3-typeahead.min.js"></script>
{/literal}
    <div id="page-wrapper">
        <link href="../css/subscribers.css" rel="stylesheet">
        <link href="css/jquery.datepick.css" rel="stylesheet"/>
        <div class="row">
             <div class="col-lg-12 top-div">
                <h1 class="page-header">Sms Utility</h1>
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
                    <div class="panel-heading" style="height: 35px;">
                        <span style="float:left;width:79%;margin:0;padding:0;">{$pageheading}</span>              
                        <span style="float:right;width:21%" id="head"></span>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                <input type="hidden" name="sms_type" id="sms_type" value="english">
                                <div class="form-group col-lg-4">
                                    <label>Franchise Name</label>
                                    <select class="form-control" id="franchise_id" name="franchise_id">
                                        <option value="">-Please Select-</option>
                                        {$franchiseArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Area</label>
                                    <select class="form-control" id="wing_id" name="wing_id" required>
                                        <option value="">-Please Select-</option>
                                        {$wingArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Sub Area</label>
                                    <select class="form-control" id="unit_id" name="unit_id">
                                        <option value="">-Please Select-</option>
                                        {$unitArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-12" id="subscriberTab" style="padding: 5px 39px;height: 200px;overflow-y: scroll;font-size: 11px;"></div>
                                <div class="form-group col-lg-12"></div>
                                <div id="subscriberDets"></div>
                                <div class="form-group col-lg-12">
                                    <label>Message </label>
                                    <textarea name="notification" rows="15" style="height:50px;" class="form-control" id="notification" onkeyup="countMessages(this.value);"></textarea>
                                </div>
                                <div class="form-group col-lg-12">
                                    <label>No of Messages :<span id="msgCount">0</span></label><br>
                                    <label>Hints (Use Abbreviations for Shortcuts)<br>
                                    <label>Pending Payment : PngAmt</label><br>
                                    <label>Subscriber Name : SubsName</label><br>
                                    <label>Headoffice Name : HeadOfc</label><br>
                                    <label>Franchise Name : FranOfc</label><br>
                                    <label>Subscriber Login Details : LoginCreds</label><br>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="submit" class="btn btn-primary"> Submit</button>
                                    <a href="/sms-utility.php" class="btn btn-default">Reset</a>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading" style="height: 35px;">
                        <span style="float:left;width:79%;margin:0;padding:0;">Search SMS Records</span>              
                        <span style="float:right;width:21%" id="head"></span>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                <div class="form-group col-lg-4">
                                    <label>Customer Code/MSO Id</label>
                                    <input type="text" name="customer_code" id="customer_code" class="form-control" value="{$searchArray.customer_code}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="search" class="btn btn-primary">Search</button>
                                    <a href="/sms-utility.php" class="btn btn-default">Reset</a>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    SMS Utility Records
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <form name="frmListing" id="frmListing" method="post" action="" onsubmit="return false;">
                            {$pagin_recs}
                            </form>
                        </table>
                    </div>
                </div>
            </div>
        </div> <!-- .grid --> 
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
    {literal}
        <script  type="text/javascript" src="js/typeahead.js"></script>
        <script type="text/javascript">
            function removeSub(id){
                $('#subscriber'+id).remove();
            }
            function countMessages(val){
                var NotText = val;
                var txtcount = val.length;
                var format = /[\u0600-\u06FF\u0900-\u097F]/;
                if(hasUnicode(val)==true){
                    type="unicode";
                    $("#sms_type").val('unicode');
                }else{
                    type="english";
                    $("#sms_type").val('english');
                }
                var totSms=0;
                switch(type){
                    case 'english':
                      if(txtcount<=160){
                        totSms=1;
                      }else{
                        totSms=txtcount/153;
                        totSms=Math.ceil(totSms);
                        //alert(NotText);
                      }
                    break;
                    case 'unicode':
                      if(txtcount<=70){
                        totSms=1;
                      }else{
                        totSms=txtcount/67;
                        totSms=Math.ceil(totSms);
                        //alert(NotText);
                      }
                    break;
                }
                $('#msgCount').html(totSms);
            }
            function hasUnicode (str) {
                for (var i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) > 127) return true;
                }
                return false;
            }
            function select_all(){
                if($('.allSelect').prop("checked") == true){
                    $('.allSelect').prop("checked", false);
                    $('#selectAll').prop("checked", false);
                }else{
                    $('.allSelect').prop("checked", true);
                    $('#selectAll').prop("checked", true);
                }

            }
            function not_paid(){
                if($('.unpaid').prop("checked") == true){
                    $('.unpaid').prop("checked", false);
                    $('#notPaid').prop("checked", false);
                }else{
                    $('.unpaid').prop("checked", true);
                    $('#notPaid').prop("checked", true);
                }

            }
            function deactivateSubs(){
                if($('.deactiveSubs').prop("checked") == true){
                    $('.deactiveSubs').prop("checked", false);
                    $('#deactive').prop("checked", false);
                }else{
                    $('.deactiveSubs').prop("checked", true);
                    $('#deactive').prop("checked", true);
                }

            }
        </script>
    {/literal}