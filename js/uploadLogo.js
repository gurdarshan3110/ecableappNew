$(function(){

		var upload = $('#imgfile1');

		new AjaxUpload(upload, {

			action: 'uploadLogo.php',

			name: 'uploadfile',

			onSubmit: function(file, ext){

				 if (! (ext && /^(jpg|JPEG|png|PNG)$/.test(ext))){ 

                    // extension is not allowed 

					   alert('Only jpg|JPEG|png|PNG files are allowed');

					return false;

				}

                jQuery("#imgfile1").css('display','none');

                jQuery("#loaderId1").css('display','');

                

			},

			onComplete: function(file, response){

             var result=response.split('_M2i_');

			console.log(result);

				if(result[0]==="success"){

					$('#logo1Div').html('<input type="hidden" id="logo1" name="logo1" value="'+result[1]+'"/><a href="uploads/'+result[1]+'" target="_blank">Logo On Right</a>');

                     jQuery("#loaderId1").css('display','none');

                     jQuery("#imgfile1").css('display','');

                                    

				} else{

                     jQuery("#loaderId1").css('display','none');

                     jQuery("#imgfile1").css('display','');

				}

			}

		});

	});
$(function(){

		var upload = $('#imgfile2');

		new AjaxUpload(upload, {

			action: 'uploadLogo.php',

			name: 'uploadfile',

			onSubmit: function(file, ext){

				 if (! (ext && /^(jpg|JPEG|png|PNG)$/.test(ext))){ 

                    // extension is not allowed 

					   alert('Only jpg|JPEG|png|PNG files are allowed');

					return false;

				}

                jQuery("#imgfile2").css('display','none');

                jQuery("#loaderId2").css('display','');

                

			},

			onComplete: function(file, response){

             var result=response.split('_M2i_');

			console.log(result);

				if(result[0]==="success"){

					$('#logo2Div').html('<input type="hidden" id="logo2" name="logo2" value="'+result[1]+'"/><a href="uploads/'+result[1]+'" target="_blank">Logo On Left</a>');

                     jQuery("#loaderId2").css('display','none');

                     jQuery("#imgfile2").css('display','');

                                    

				} else{

                     jQuery("#loaderId2").css('display','none');

                     jQuery("#imgfile2").css('display','');

				}

			}

		});

	});
