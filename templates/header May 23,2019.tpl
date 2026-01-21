<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>ecableApp</title>

    <!-- Bootstrap Core CSS -->
    <link href="../bower_components/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">

    <!-- MetisMenu CSS -->
    <link href="../bower_components/metisMenu/dist/metisMenu.min.css" rel="stylesheet">

    <!-- Timeline CSS -->
    <link href="../dist/css/timeline.css" rel="stylesheet">

    <!-- Custom CSS -->
    <link href="../dist/css/sb-admin-2.css" rel="stylesheet">

    <!-- Morris Charts CSS -->
    <link href="../bower_components/morrisjs/morris.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="../bower_components/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css">

    <!-- DataTables CSS -->
    <link href="../bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css" rel="stylesheet">

    <!-- DataTables Responsive CSS -->
    <link href="../bower_components/datatables-responsive/css/dataTables.responsive.css" rel="stylesheet">
    
    <link href="/css/parsley.css" rel="stylesheet"/>
    <link href="/css/common.css" rel="stylesheet"/>
     <link href="/css/dropdown.css" rel="stylesheet"/>
    {literal}
    <script src="js/all.js"></script>
    <script type="text/javascript" src="../include/javascript/jquery-1.10.1.min.js"></script>
    <script  type="text/javascript" src="../include/javascript/functions.js"></script>
    <script  type="text/javascript" src="../include/javascript/paging_ajax.js"></script>
    <script type="text/javascript" src="../include/ajax/xajax_js/xajax.js"></script>
    <script src="js/parsley.js"></script>
    <!-- jQuery -->
    <script src="../bower_components/jquery/dist/jquery.min.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
    {/literal}
    {$init_ajax_js} 
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <div id="wrapper">

        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top top-bg-clr" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header" style="width:19%">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand logo-bar" href="index.html"><img src="images/logo.png"></a>
            </div>
            <!-- /.navbar-header -->
            <div style="width: 55%;float: left;color: #fff;font-size: 16px;padding: 10px;">Welcome to  {$smarty.session.HEADOFFICE_NAME}</div>
            <!--<div style="width: 15%;float: left;color: #fff;font-size: 16px;padding: 10px;">SMS Balance {$balSms}</div>-->
            <div style="width: 25%;float: right;color: #fff;font-size: 16px;padding: 10px 15px;text-align:right;">{$smarty.session.NAME}
                <a href="logout.php" style="text-decoration:none;color:#fff;"><i class="fa fa-sign-out fa-fw"></i> Logout</a>
            </div>
            

            
            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse sidebar-bg">
                    <ul class="nav" id="side-menu">
                        <!-- <li class="sidebar-search">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
                            <!-- /input-group 
                        </li> -->
                        {if $smarty.session.USER_TYPE eq 'SP'}
                        <li>
                            <a href="index.php"><img src="images/icon-dashboard.png"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href="headoffice.php"><img src="images/Head-office.png"> Head Office</span></a>
                        </li>
                        <li>
                            <a href="headoffice-collections.php"><img src="images/Head-office.png"> Collection Settings</span></a>
                        </li>
                        <li>
                            <a href="headoffice-recharge.php"><img src="images/Head-office.png"> Headoffice Recharge</span></a>
                        </li>
                        <li>
                            <a href="permissions-admin.php"><img src="images/Head-office.png"> Add Modules</span></a>
                        </li>
                        {/if}
                        {if $smarty.session.USER_TYPE eq 'A'}
                        <li>
                            <a href="index.php"><img src="images/icon-dashboard.png"></i> Dashboard</a>
                        </li>
                        
                        <li>
                             <a href="wingmaster.php"><img src="images/Area-Master.png">Area Master</span></a>
                        </li>
                        <li>
                             <a href="unitmaster.php"><img src="images/Sub-Area-Master.png"> Sub Area Master</span></a>
                        </li>
                        <li>
                             <a href="packagemaster.php"><img src="images/Package-Master.png"> Package Master</span></a>
                        </li>
                        <li>
                             <a href="employees.php"><img src="images/Employee-Master.png"> Employee Master</span></a>
                        </li>
                        <li>
                                 <a href="import-stb-otherway.php"><img src="images/import-settop-box.png">Import Settop Box</span></a>
                        </li>
                        <li>
                                 <a href="setup-boxes.php"><img src="images/setup-box.png"> Settop Box</span></a>
                        </li>
                        <li>
                             <a href="import-subscribers-otherway.php"><img src="images/import-subscribers.png">Import Subscribers</span></a>
                        </li>
                        <li>
                             <a href="subscribers-otherway.php"><img src="images/Subscriber-Master.png"> Subscriber Master</span></a>
                        </li>
                        {if $smarty.session.HEADOFFICE eq '7' OR $smarty.session.HEADOFFICE eq '13'}
                            
                        {else}
                            <!-- <li>
                                 <a href="setup-boxes.php"><img src="images/setup-box.png"> Settop Box</span></a>
                            </li>
                            <li>
                                     <a href="import-stb.php"><img src="images/setup-box.png">Import Settop Box</span></a>
                            </li>
                            <li>
                                 <a href="import-subscribers.php"><img src="images/Subscriber-Master.png">Import Subscribers</span></a>
                            </li>
                            <li>
                                 <a href="subscribers.php"><img src="images/Subscriber-Master.png"> Subscriber Master</span></a>
                            </li> -->
                        {/if}
                        <li>
                             <a href="monthly-utility.php"><img src="images/run-utility.png"> Run Utility</span></a>
                        </li>
                        <li>
                             <a href="monthly-collections.php"><img src="images/collection.png"> Collections</span></a>
                        </li>
                        <li>
                             <a href="pendingreport.php"><img src="images/pending-report.png"> Pending Report</span></a>
                        </li>
                        <li>
                             <a href="collection-report.php"><img src="images/collection-report.png"> Collection Report</span></a>
                        </li>
                        <li>
                             <a href="permission.php"><img src="images/permission.png"> Permissions</span></a>
                        </li>
                        <li>
                             <a href="sms-settings.php"><img src="images/sms-setting.png"> Sms Settings</span></a>
                        </li>
                        <li>
                             <a href="change-password.php"><img src="images/change-password.png"> Change Password</span></a>
                        </li>
                        <li>
                             <a href="profile.php"><img src="images/edit-profile.png"> Edit Profile</span></a>
                        </li>
                        {/if}
                        {if $smarty.session.USER_TYPE eq 'E'}
                            <li>
                                <a href="index.php"><img src="images/icon-dashboard.png"></i> Dashboard</a>
                            </li>
                            {if '1_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="wingmaster.php"><img src="images/Area-Master.png">Area Master</span></a>
                            </li>
                            {/if}
                            {if '2_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="unitmaster.php"><img src="images/Sub-Area-Master.png"> Sub Area Master</span></a>
                            </li>
                            {/if}
                            {if '3_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="packagemaster.php"><img src="images/Package-Master.png"> Package Master</span></a>
                            </li>
                            {/if}
                            {if '4_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="employees.php"><img src="images/Employee-Master.png"> Employee Master</span></a>
                            </li>
                            {/if}
                            {if '5_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="setup-boxes.php"><img src="images/setup-box.png"> Settop Box</span></a>
                            </li>
                            {/if}
                            {if '6_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="import-stb.php"><img src="images/import-settop-box.png">Import Settop Box</span></a>
                            </li>
                            {/if}
                            {if '7_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="import-subscribers.php"><img src="images/import-subscribers.png">Import Subscribers</span></a>
                            </li>
                            {/if}
                            {if '8_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="subscribers.php"><img src="images/Subscriber-Master.png"> Subscriber Master</span></a>
                            </li>
                            {/if}
                            {if '9_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="monthly-utility.php"><img src="images/run-utility.png"> Run Utility</span></a>
                            </li>
                            {/if}
                            {if '10_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="monthly-collections.php"><img src="images/collection.png"> Collections</span></a>
                            </li>
                            {/if}
                            {if '11_V'|in_array:$smarty.session.pass}
                            <li>
                                 <a href="pendingreport.php"><img src="images/pending-report.png"> Pending Report</span></a>
                            </li>
                            <li>
                                 <a href="collection-report.php"><img src="images/collection-report.png"> Collection Report</span></a>
                            </li>
                            {/if}
                            {if '12_V'|in_array:$smarty.session.pass} 
                            <li>
                                 <a href="permission.php"><img src="images/permission.png"> Permissions</span></a>
                            </li>
                            {/if}
                            <li>
                                 <a href="change-password.php"><img src="images/change-password.png"> Change Password</span></a>
                            </li>
                            <li>
                                 <a href="profile.php"><img src="images/edit-password.png"> Edit Profile</span></a>
                            </li>
                        {/if}
                        {if $smarty.session.USER_TYPE eq 'S'}
                        <li>
                            <a href="index.php"><img src="images/icon-dashboard.png"></i> Dashboard</a>
                        </li>
                        
                        <li>
                             <a href="change-password.php"><img src="images/change-password.png"> Change Password</span></a>
                        </li>
                        <li>
                             <a href="profile.php"><img src="images/edit-profile.png"> Edit Profile</span></a>
                        </li>
                        {else}
                        <!-- <li>
                            <a href="index.php"><img src="images/icon-dashboard.png"></i> Dashboard</a>
                        </li>
                        <li>
                             <a href="subscribers.php"><img src="images/Subscriber-Master.png"> Subscriber Master</span></a>
                        </li>
                        <li>
                             <a href="monthly-collections.php"><img src="images/collection.png"> Collections</span></a>
                        </li> -->
                        {/if}
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>
