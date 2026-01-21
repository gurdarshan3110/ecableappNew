    <div id="page-wrapper">
        <link href="../css/subscribers.css" rel="stylesheet">
        <link href="css/jquery.datepick.css" rel="stylesheet"/>
        <div class="row">
             <div class="col-lg-12 top-div">
                <h1 class="page-header">Monthly Utility</h1>
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
                                <div class="form-group col-lg-4">
                                    <label>Utility Date</label>
                                    <input type="text" name="month_date" id="utility_date" class="form-control" value="" required>
                                </div>
                                <!-- <div class="form-group col-lg-4">
                                    <label>Headoffice Name</label>
                                    <select class="form-control" id="headoffice_id" onchange="wingFind();" name="headoffice_id" required>
                                        <option value="">-Please Select-</option>
                                        {$headofficeArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Area</label>
                                    <select class="form-control" id="wing_id" onchange="unitFind();" name="wing_id">
                                        <option value="">-Please Select-</option>
                                        {$wingArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Sub Area</label>
                                    <select class="form-control" id="unit_id" onchange="fetchUnitSubscribers();" name="unit_id">
                                        <option value="">-Please Select-</option>
                                        {if $group neq ''}
                                            {$unitArray}
                                        {/if}
                                    </select>
                                </div> -->
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="submit" class="btn btn-primary">Run Utility</button>
                                    <a href="/monthly-utility.php" class="btn btn-default">Reset</a>
                                </div>
                            </form> 
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading" style="height: 35px;">
                        <span style="float:left;width:79%;margin:0;padding:0;">Search Utility Records</span>              
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
                    Monthly Utility Records
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
        <script type="text/javascript" src="js/jquery.plugin.js"></script> 
        <script src="js/jquery.datepick.js"></script>
        <script type="text/javascript" language="javascript" class="init">
            $("#utility_date").datepick({minDate:'{/literal}{$startMonth}{literal}' });
        </script>
        <script>
        function wingFind(){
            var id=$("#headoffice_id").val();
            $.post("ajax/monthly-utility.php",{action:'fetchWing',headofficeId:id},
            function(response){
               $("#wing_id").html(response);
            });
            $.post("ajax/monthly-utility.php",{action:'fetchSubscribers',headofficeId:id},
            function(response){
               $("#head").html(response);
            });
        }
        function unitFind(){
            var id=$("#wing_id").val();
            $.post("ajax/monthly-utility.php",{action:'fetchUnit',wingId:id},
            function(response){
               $("#unit_id").html(response);
            });
            $.post("ajax/monthly-utility.php",{action:'fetchWingSubscribers',wingId:id},
            function(response){
               $("#head").html(response);
            });
        }
        function fetchUnitSubscribers(){
            var id=$("#unit_id").val();
            $.post("ajax/monthly-utility.php",{action:'fetchUnitSubscribers',unitId:id},
            function(response){
               $("#head").html(response);
            });
        }
        function editInv(id){
            $("#invoiceNo"+id).hide();
            $("#editInvoice"+id).hide();
            $("#invoice_no"+id).show();
            $("#saveInvoice"+id).show();

        }
        function saveInv(id){
            var invoiceNo=$("#invoice_no"+id).val();
            $.post("ajax/monthly-utility.php",{action:'EditInvoice',invoiceNo:invoiceNo,id:id},
            function(response){
                $("#invoiceNo"+id).show();
                $("#invoiceNo"+id).html(response);
                $("#invoiceNo"+id).css('color', 'green');
                $("#editInvoice"+id).show();
                $("#invoice_no"+id).hide();
                $("#saveInvoice"+id).hide();

            });
        }
        </script>
    {/literal}