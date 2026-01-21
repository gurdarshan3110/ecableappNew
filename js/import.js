$(function(){

		var upload = $('#uploadcsvfile');

		new AjaxUpload(upload, {

			action: 'uploadPhoto.php',

			name: 'uploadfile',

			onSubmit: function(file, ext){

				 if (! (ext && /^(csv|xls)$/.test(ext))){ 

                    // extension is not allowed 

					   alert('Only csv files are allowed');

					return false;

				}

                jQuery("#uploadcsvfile").css('display','none');

                jQuery("#loaderId").css('display','');

                

			},

			onComplete: function(file, response){

             var result=response.split('_M2i_');

			console.log(result);

				if(result[0]==="success"){

					$('#fileplace').html('<label>File uploaded successfully. Click on submit to import record.</label><input type="hidden" id="importFile" name="attachment" value="'+result[1]+'"/>');

                     jQuery("#loaderId").css('display','none');

                     jQuery("#uploadcsvfile").css('display','');

                                    

				} else{

                     jQuery("#loaderId").css('display','none');

                     jQuery("#uploadcsvfile").css('display','');

				}

			}

		});

	});