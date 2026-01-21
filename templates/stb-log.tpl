    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12 top-div">
                <h1 class="page-header">STB No : {$stbNo} Comment Log</h1>
            </div>
            <!-- /.col-lg-12 -->
        </div>
        <div class="row">
            <div class="col-lg-12">
                <!-- Modal -->
                <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">    
                    <!-- /.modal-dialog -->
                </div>
            </div>
        </div>
        
            <!-- /.row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Comment Records
                    </div>
                    <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover">
                                <form name="frmListing" id="frmListing" method="post" action="" onsubmit="return false;">
                                {$classData}
                                </form>
                            </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- /#page-wrapper -->

    </div>
