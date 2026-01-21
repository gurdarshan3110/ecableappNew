    <div id="page-wrapper">
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-header">Sub Area Master</h1>
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
                            <form role="form" method="post">
                                <div class="form-group col-lg-4">
                                    <label>Headoffice Name</label>
                                    <select class="form-control" id="headoffice_id" onchange="wingFind();" name="headoffice_id" required>
                                        <option value="">-Please Select-</option>
                                        {$headofficeArray}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Area</label>
                                    <select class="form-control" id="wing_id" name="wing_id" required>
                                        <option value="">-Please Select-</option>
                                        {if $group neq ''}
                                            {$wingArray}
                                        {/if}
                                    </select>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Sub Area</label>
                                    <input type="text" name="name" class="form-control" value="{$rowRec.name}" required>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label>Description</label>
                                    <textarea name="description" class="form-control">{$rowRec.description}</textarea>
                                </div>
                                <div class="form-group col-lg-4">
                                    <label style="width:100%">&nbsp;</label>
                                    <button type="submit" name="submit" class="btn btn-primary">Submit</button>
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
                        Sub Area Records
                    </div>
                    <div class="panel-body">
                        <div class="table-responsive">
                            <table class="table table-striped table-bordered table-hover">
                                {$classData}
                            </table>
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
        <script>
        function wingFind(){
            var id=$("#headoffice_id").val();
            $.post("ajax/unitmaster.php",{action:'fetchWing',headofficeId:id},
           function(response){
               $("#wing_id").html(response);
            });
        }
        </script>
    {/literal}