<div id="page-wrapper">
    <div class="row">
         <div class="col-lg-12 top-div">
            <h1 class="page-header">{$pageMainHeading}</h1>
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
    <div class="row">
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading" style="height: 35px;">
                    <span style="float:left;width:79%;margin:0;padding:0;">{$pageheading}</span>              
                    <span style="float:right;width:21%" id="head"></span>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <form class="form-material m-t-40" id="myForm" enctype="multipart/form-data" method="post" data-parsley-validate>
                            <input type="hidden" name="category_id" value="{$group}">
                            <div class="form-group col-sm-4 required">
                                <label>Name</label>
                                <input type="text" name="name" class="form-control form-control-line required" value="{$rowRec.name}" >
                            </div>
                            <div class="form-group col-sm-4">
                                <label>Logo</label>
                                <input type="hidden" name="imageseq" id="imageseq" value="1" />
                                <input type="file" name="file" id="albumImage"  class="form-control form-control-line" style="padding:0 12px;"/>
                                <span id="loaderId" style="display:none;" ><img src="images/loading.gif"> <strong>Processing Please Wait....</strong></span>
                            </div>
                            <div class="form-group col-sm-4">
                                <label>Price</label>
                                <input type="text" name="price" class="form-control form-control-line required" data-parsley-type="number" data-parsley-trigger="keyup" data-parsley-minlength="2" value="{$rowRec.price}">
                            </div>
                            <div class="form-group col-sm-12">
                                <label>Description</label>
                                <textarea name="description" class="form-control form-control-line">{$rowRec.description}</textarea>
                            </div>
                            <div class="form-group col-sm-2">
                                <label>Sequence No</label>
                                <input type="text" name="sequence" class="form-control form-control-line" value="{$rowRec.sequence}">
                            </div>
                            <div class="form-group col-sm-2">
                                <label>Make it Mandatory</label>
                                <input type="checkbox" name="default_value" class="form-control form-control-line" {if $rowRec.default_value eq 'D'}checked="checked"{/if} value="D">
                            </div>
                            
                            {if $group eq ''}
                            <div class="form-group col-sm-4">
                                <label>&nbsp;</label><br>
                                <button type="submit" name="submit" class="btn waves-effect waves-light btn-primary">Submit</button>
                                <button type="reset" class="btn waves-effect waves-light btn-outline-secondary">Clear</button>
                            </div>
                            {else}
                            <div class="form-group col-sm-4">
                                <label>&nbsp;</label><br>
                                <button type="submit" name="submit" class="btn waves-effect waves-light btn-primary">Update</button>
                                <a href="channel-category-master.php" class="btn waves-effect waves-light btn-outline-secondary">Cancel</a>
                            </div>
                            {/if}
                            <div class="form-group col-sm-4" id="imgPreview">
                                {if $rowRec.path neq ''}
                                <a href="{$rowRec.path}" class="btn btn-info" target="_blank">Preview</a>
                                <input type="hidden" name="logo" value="{$rowRec.path}">
                                {/if}
                            </div>
                        </form>
                    </div> <!-- .widget-content -->
                </div>
            </div>
        </div> <!-- .widget-content -->
        <div class="col-lg-12">
            <div class="panel panel-default">
                <div class="panel-heading">
                    Channel Records
                </div>
                <div class="panel-body">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered">
                            <form name="frmListing" id="frmListing" method="post" action="" onsubmit="return false;">
                            {$pagin_recs}
                            </form>
                        </table>
                    </div>   
                </div> <!-- .widget --><!-- .widget --> 
            </div> <!-- .grid -->   
        </div> <!-- .box -->
    </div> 
</div>
{literal}
<script src="javascripts/ajaxupload.3.5.js"></script>
<script type="text/javascript" src="javascripts/item-images.js"></script>
{/literal}