      <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12 top-div">
                    <h1 class="page-header">Dashboard</h1>
                </div>
            </div>
            {if $smarty.session.USER_TYPE eq 'S'}
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            Ledger Records
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
            {else}
            <div class="row">
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-green">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-rupee fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="medium">{$totCollection}</div>
                                    <div><br>Collections</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-red">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-rupee fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="medium">{$totPending}</div>
                                    <div><br>Pending</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-primary">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-rupee fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="medium">{$totAdvance}</div>
                                    <div><br>Advance</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-3 col-md-6">
                    <div class="panel panel-yellow">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-3">
                                    <i class="fa fa-rupee fa-5x"></i>
                                </div>
                                <div class="col-xs-9 text-right">
                                    <div class="medium">{$totDiscount}</div>
                                    <div><br>Discount</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-12 ">
                                    <div class="huge"><b style="font-size:37px;"><i class="fa fa-rupee fa-1x"></i>{$pendingAmount}</b></div>
                                    <div>Wallet Amount</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-12 ">
                                    <div class="huge"><b style="font-size:37px;">{$billsGenerated}</b></div>
                                    <div>Bills Generated</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6">
                    <div class="panel panel-info">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-xs-12 ">
                                    <div class="huge"><b style="font-size:37px;">{$smsSent}</b></div>
                                    <div>Sms Sent</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <i class="fa fa-bar-chart-o fa-fw"></i> Monthly Collections
                        </div>
                        <!-- /.panel-heading -->
                        <div class="panel-body">
                            <div id="morris-area-chart"></div>
                        </div>
                        <!-- /.panel-body -->
                    </div>
                </div>
            </div>
            {/if}
    </div>
    <!-- /#wrapper -->