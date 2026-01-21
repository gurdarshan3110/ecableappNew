<div class="container">
<link href="css/add-book_issues.css" rel="stylesheet"/>
<link href="css/library-book-issue.css" rel="stylesheet"/>
<script src="javascripts/book_issue.js"></script>
<body id="emsg" onload="msgShow({$emsg});">
<div id="msg1">
{if $smarty.session.msg1 neq ''}
      {$smarty.session.msg1}
{/if}
{if $smarty.session.errormsg1 neq ''}
    {$smarty.session.errormsg1}
{/if}
{php}
unset($_SESSION['msg1']);
unset($_SESSION['errormsg1']);
{/php}
</div>
<div id="msg">
{if $msg neq ''}
    <div class="notify notify-success">
      <a class="close" href="javascript:;"><img src="images/close.png" /></a>
      <h3>{$msg}</h3>
   </div>
{/if}
{if $errormsg neq ''}
    <div class="notify notify-error">
      <a class="close" href="javascript:;"><img src="images/close.png" /></a>
      <h3>{$errormsg}</h3>
   </div>
{/if}

</div>
<div class="box plain">
{include file='hr-library.tpl'}

<div class="grid-24">
{if $add neq ''}
    <div class="widget spl">
        <div class="widget-header">
        <span class="icon-article"></span>
        <h3>{$pageheading}</h3>
        </div> <!-- .widget-header -->
        <div class="widget-content">
        {include file='library-add-book-issue.tpl'}
        </div>
    </div> <!-- .widget -->
{/if}
</div> <!-- .grid -->

<div class="grid-24">
    <div id="txtResult">
        <table class="table table-striped table-bordered" id="tableRecords">
            <form name="frmListing" id="frmListing" method="post" action="" onsubmit="return false;">
            {$classData}
            </form>
        </table>
    </div>
</div>
</div> <!-- .box -->
</div>
{literal}
  <script src="javascripts/library-book-issue.js"></script> 
  <script type="text/javascript">
  function ClearData(){
    $("#table-data").empty();
    $('#accession_no').val('');
    $('#user').val('');
    $('#userEmp').val('');
  }
  </script>
{/literal}
</div>		