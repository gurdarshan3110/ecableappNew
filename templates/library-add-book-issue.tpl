<form class="form" method="post" action=""   id="book_issue" data-parsley-validate>
    <input type="hidden" name="BOOK_ISSUE_ID" value="{$book_issue_id}" />
    <input type="hidden" name="InsertType" id="InsertType" value="0" />
    
    <div class="title-div">
        <div class="title-field-group">
        	<label for="name">Library Account Type:</label>
        	<div class="field" id="radio">
        		<input type="radio" id="user_type" name="user_type" {if $rowRec.user_type eq 'S'}checked{/if}{if !$rowRec.user_type}checked{/if} id="user_type" value="S"/>Student	
        	    <input type="radio" id="user_type" name="user_type" {if $rowRec.user_type eq 'E'}checked{/if} id="user_type" value="E"/>Employee
            </div>
        </div>
        <div class="title-field-group">
                <label for="name">Issue To (User ID):</label>
    			<div class="field" id="response1">
                    {if $rowRec.user_type eq 'E'}
                    <select class="title-fill" name="user" id="user">
                        {$empArray}
                    </select>
                    {else}
                    <input required type="text" name="user" onkeyup="KeyedUp();" id="user" autocomplete="off" class="size3"/>
                    <div id="display"></div>
                    {/if}
                </div>
		</div> <!-- .field-group -->
        <div class="title-field-group">
            <label for="name">Accession Number:</label>
            <div class="field">
                <input type="text" required name="accession_no" id="accession_no" value="{$rowRec.accession_no|stripslashes}" autocomplete="off" id="fname" onkeyup="KeyedUpAccess();" class="size3" required>
                <div id="displayAccess"></div>
            </div>
        </div> <!-- .field-group -->  
        <div class="title-field-group">
            <label>&nbsp;</label>
            <a href="javascript:;" onclick="IssueBooks();" title="Issue" id="issueBtn" class="btn btn-primary">Issue</a>
            <span id="loaderId" style="display:none;float:right;"><img src="images/loading.gif"> <strong>Processing..</strong></span>   
            <a href="javascript:;" onclick="ClearData();" title="Clear" class="btn btn-grey">Clear</a>
        </div> 
    </div>
    <div class="title-div">
        <div class="title-field-group"></div>
        <div style="width:50%; float: left;">
            <table class="table table-bordered table-striped" id="table-data"></table>
        </div>
        <div class="title-field-group"></div>
    </div> 
    <!--<div class="title-div"> 
        <div class="title-field-group"></div> 
        <div class="title-field-group"></div> 
        <div class="title-field-group"></div> 
        <div class="title-field-group">	
            <label>&nbsp;</label>		
           <a href="javascript:;" class="btn btn-green" title="Submit" onclick="return bookIssues();"  name="submit" style="margin-right: 4px;">Submit</a>
            <a href="library-book-issue.php" class="btn btn-grey"  title="Clear">Clear</a>
        </div>  
    </div>-->
</form>				