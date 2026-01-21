    <div id="page-wrapper">
    <link href="../css/monthly-collections.css" rel="stylesheet">
        <div class="row">
             <div class="col-lg-12 top-div">
                <h1 class="page-header">Monthly Collections</h1>
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
                            <form role="form" method="post" onsubmit="return checkVal();" data-parsley-validate>
                                <input type="hidden" name="sno" value="{$sno}">
                                <div class="form-group col-lg-12" >
                                        <br>
                                        <label>
                                            <input checked="checked" type="radio" name="typo" value="B"> Bill
                                            <input type="radio" name="typo" value="C"> Comment
                                        </label>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Subscriber</label>
                                    <input required type="text" name="subscriber" onkeyup="KeyedUp();" placeholder="Type Name,Phone No Or Customer ID" id="subscriber" autocomplete="off" class="form-control"/>
                                    <input required type="hidden" name="subscriber_id" id="subscriber_id" autocomplete="off" class="form-control"/>
                                    <div id="display"></div>
                                </div>
                                <div class="form-group col-lg-4" id="recieptDiv">
                                    <label>Receipt No</label>
                                    <input type="text" class="form-control" id="receipt" readonly value="{$receipt_no}" name="receipt" required>
                                </div>
                                <div class="form-group col-lg-4" id="mrecieptDiv">
                                    <label>Manual Receipt No</label>
                                    <input type="text" class="form-control" id="manual" value="{$manual_receipt_no}" name="manual">
                                </div>
                                <div class="col-lg-12" id="subscriberData">
                                </div>
                                <div class="form-group col-lg-4" id="totAmtDiv">
                                    <label>Total Amount</label>
                                    <input type="text" class="form-control" id="total_amount" onkeyup="receipt_amt();" name="total_amount" required>
                                </div>
                                <div class="form-group col-lg-4" id="discountDiv">
                                    <label>Discount</label>
                                    <input type="text" class="form-control" id="discount" name="discount" onkeyup="discountedAmt();" value="0">
                                </div> 
                               
                                <div class="form-group col-lg-4" id="recAmtDiv">
                                    <label>Receipt Amount</label>
                                    <input type="text" class="form-control" id="amount" name="amount" onkeyup="countedAmt();" required>
                                </div>
                                <div class="form-group col-lg-4" id="balanceDiv">
                                    <label>Balance</label>
                                    <input type="text" readonly value="0" class="form-control" id="balance" name="balance" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Remarks</label>
                                    <textarea class="form-control" id="remarks" name="remarks"></textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="submit" class="btn btn-primary">Save</button>
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
                        Collection Records
                    </div>
                    <div class="panel-body">
                            <div class="table-responsive">
                                <table class="table table-striped table-bordered table-hover">
                                    {$collectionListing}
                                </table>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
    {literal}
        <script>
            $('input[type=radio][name=typo]').click(function(){
                var radVal=$("input[name='typo']:checked").val();
                if(radVal=='C'){
                    $("#mrecieptDiv"). hide();
                    $("#recieptDiv"). hide();
                    $("#balanceDiv"). hide();
                    $("#discountDiv"). hide();
                    $("#totAmtDiv"). hide();
                    $("#recAmtDiv"). hide();
                }else{
                    $("#mrecieptDiv"). show();
                    $("#recieptDiv"). show();
                    $("#balanceDiv"). show();
                    $("#discountDiv"). show();
                    $("#totAmtDiv"). show();
                    $("#recAmtDiv"). show();
                }
            });
            
            function updateStatus(id) {
                 var status=$("#enumStatus"+id).val();
              //alert(enumStatus);
              var reason = prompt("Are you sure you want to do this task?", "No Reason");
              if (reason != null) {
                xajax_updateStatus(id,status,reason);
              }
            }

            //Funtion to fill values from suggestion drop down into (Issue To) Form Field
            function fill(Value)
                  {
                  $('#subscriber').val(Value);
                  $('#display').hide();
                  }
            function fillUser(Value)
                  {
                  $('#subscriber_id').val(Value);
                  }
            //Funtion to get values from suggestion drop down for (Issue To) Form Field
            function KeyedUp(){
                  $("#display").css("display", "block");
                  $(document).mouseup(function (e)
                    {
                      var container = $("#subscriber");
                      var container1 = $("#display");
                      if (!container.is(e.target) && !container1.is(e.target)
                          && container1.has(e.target).length === 0) // ... nor a descendant of the container
                      {
                          $("#display").hide();
                      }


                    });
                  var name = $('#subscriber').val();
                  if(name=="")
                    {
                    $("#display").html("");
                    }
                  else
                    {
                      $.post("ajax/monthly-collections.php",{action:'AutoFill',name:name},
                       function(response){
                         $("#display").html(response);
                        });
                    }
            }
            function fetchbill(){
                var id=$("#subscriber_id").val();
                $.post("ajax/monthly-collections.php",{action:'fetchbill',subscriberId:id},
                function(response){
                   $("#total_amount").val(response);
                   $("#amount").val(response);
                });
            }
            function getSubscriberData(){
                var id=$("#subscriber_id").val();
                $.post("ajax/monthly-collections.php",{action:'fetchData',subscriberId:id},
                function(response){
                   $("#subscriberData").html(response);
                });
            }
            function discountedAmt(){
                var discount=$("#discount").val();
                var total_amount=$("#total_amount").val();
                var balance=$("#balance").val();
                var amount=total_amount-discount;
                var bal_left=total_amount-discount-amount;
                $("#amount").val(amount);
                $("#balance").val(bal_left);
            }
            function countedAmt(){
                var discount=$("#discount").val();
                var amount=$("#amount").val();
                var total_amount=$("#total_amount").val();
                var bal_left=total_amount-discount-amount;
                $("#amount").val(amount);
                $("#balance").val(bal_left);
            }
            function checkVal(){
                var id=$("#subscriber_id").val();
                if (id=='') {
                    $("#msg").html('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>Please select subscriber.</div>');
                    return false;
                }
            }
            function receipt_amt(){
                var total_amount=$("#total_amount").val();
                var service_tax=$("#service_tax").val();
                var swatchh_bharat_cess=$("#swatchh_bharat_cess").val();
                var krishi_cess=$("#krishi_cess").val();
                var swatchh_bharat_amt=(total_amount*swatchh_bharat_cess)/100;
                var service_tax_amt=(total_amount*service_tax)/100;
                var krishi_cess_amt=(total_amount*krishi_cess)/100;
                var receipt_amt=+total_amount+ +service_tax_amt+ +swatchh_bharat_amt+ +krishi_cess_amt;
                receipt_amt=Math.ceil(receipt_amt);
                $('#amount').val(receipt_amt);
            }
        </script>
    {/literal}