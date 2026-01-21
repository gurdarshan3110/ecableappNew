<?php
/**
 * Smarty plugin
 * @package Smarty
 * @subpackage plugins
 */


/**
 * Smarty {skdetect} function plugin
 *
 * Type:     function<br>
 * Name:     skdetect<br>
 * Date:     2.10.2004<br>
 * Purpose:  Detect IE browser<br>
 * Input:<br>
 *
 * Example:
 *  {skdetect}
 *  {if $ie}
 *  <link rel="stylesheet" type="text/css" href="only-ie.css" />
 *  {else}
 *  <link rel="stylesheet" type="text/css" href="not-ie.css" />
 *  {/if}
 * @link http://smartbee.sourceforge.net/
 * @author   Martin Konicek <martin_konicek@centrum.cz>
 * @version  1.0
 * @param null
 * @param Smarty
 * @return boolen
 */
function smarty_function_skdetect($params, &$smarty)
{
	$ie = strpos($_SERVER["HTTP_USER_AGENT"], 'MSIE') ? true : false;
	$ie = strpos($_SERVER["HTTP_USER_AGENT"], 'Opera') ? false : $ie;
	if($ie){
		$smarty->assign('my_browser', '1');
	} else {
		$smarty->assign('my_browser', '0');
	}
}

/* vim: set expandtab: */

?>