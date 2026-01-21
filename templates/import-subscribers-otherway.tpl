{literal}
<script src="js/ajaxupload.3.5.js"></script>
{/literal}
    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12 top-div">
                <h1 class="page-header">Import Subscribers</h1>
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
                        <b style="float:left;width:82%">Import Subscribers</b>
                        <b style="text-align:right;"><a href="uploads/import-subscribers-otherway.csv" target="_blank" class="btn btn-info btn-small">Download Sample File</a></b>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <form role="form" method="post" data-parsley-validate>
                                <div class="form-group col-lg-4">
                                    <label>Franchise</label>
                                    <select class="form-control" id="franchise_id" name="franchise_id" required>
                                        <option value="">-Please Select-</option>
                                        {$franchiseArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                   <label for="name">Upload File :</label> 
                                    <span id="loaderId" style="display:none;"><img src="images/loading.gif"> <strong>Loading..</strong></span>
                                    <button type="button" class="btn btn-primary upbtn" id="uploadcsvfile">Upload File</button>
                                    <div style="top:-12px;" id="fileplace">
                                    </div>
                                   
                               	</div> <!-- .field-group -->
                                
                                
                       	         <div class="form-group col-lg-4">
                                    <label>&nbsp;</label>					      
                                    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                                    <a href="import-subscribers-otherway.php" class="btn btn-default">Cancel</a>
                         		</div> <!-- .actions -->
            			    </form>
		            </div> <!-- .widget-content -->		
	                </div> <!-- .widget --><!-- .widget -->	
                </div> <!-- .grid -->			
	        </div> <!-- .box -->
         </div>
    </div>
{literal}
<script src="js/import.js"></script>
{/literal}
		