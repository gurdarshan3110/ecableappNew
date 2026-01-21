var showHideStatus = 'n';

function showHide(id)
{

	if(showHideStatus == 'n')
	{
		document.getElementById(id).style.display = 'block';
		showHideStatus = 'y';
	}
	else if(showHideStatus == 'y')
	{
		document.getElementById(id).style.display = 'none';
		showHideStatus = 'n';
	}		
	
}

function hide(did)
{
	document.getElementById(did).style.display='none'; 
	showHideStatus = 'n'; 
}

function showHideDiv(id)
{

	if(document.getElementById(id).style.display == 'none')
		document.getElementById(id).style.display = '';
	else 
		document.getElementById(id).style.display = 'none';
}

function display_hide(id,tot)
{
	for (i=1;i<=tot;i++)
	{	
		if (i==id) {	
			document.getElementById(i+'1').className= 'black-link';
			document.getElementById(i).style.display='';
		} else {
			document.getElementById(i+'1').className = 'white-link';
			document.getElementById(i).style.display='none';
		}		
	}
}

function showhide_module(id,tot){
	for (i=1;i<=tot;i++)
	{	
		if (i==id)
		{	
			document.getElementById('Lnk'+i).className = 'links1';	
			document.getElementById(i).style.display='';
		}
		else
		{
			document.getElementById('Lnk'+i).className = 'links';	
			document.getElementById(i).style.display='none';
		}
	}
}

function changecolor(id,tot)
{
	for (i=1;i<=tot;i++)
	{	
		if (i==id) {	
			document.getElementById(i).className= 'links1';
		} else {
			document.getElementById(i).className = 'links';
		}		
	}
}
/*function changecolorsort(id)
{
	if (id==1) 
		{	
			document.getElementById('sort1').className='body-links1';
			document.getElementById('sort2').className ='body-links';
			
		}
		 else
		  {
		  	document.getElementById('sort1').className ='body-links';
			document.getElementById('sort2').className='body-links1';
		}
	
}*/