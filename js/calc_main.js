$(document).ready(function(){	
			function round_zero_decimal_digits(num1){
				return Math.round(parseFloat(num1)) ;
			}
			function round_2_digits(num1){
				return Math.round( parseFloat(num1) * 100 ) / 100;
			}
			function numberWithCommas(x) {
				return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
			}
			let font = "";
			function printPDF_proposal() {
				printJS({
			  	printable: 'editor',
			    	type: 'html',
			    	style: "@import url('https://upgradeny.github.io/Contract-Proposal/fonts/Montserrat-VariableFont_wght.ttf')",
			    	font: 'Montserrat'
			  })
			}
	
			jQuery.validator.addMethod("phonenu", function (value, element) {
				if ( /^[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{3}[\(\)\.\- ]{0,}[0-9]{4}[\(\)\.\- ]{0,}$/.test(value)) {
					return true;
				} else {
					return false;
				};
			}, "Invalid phone number");
	

			$("#priceCalcForm").validate({
			  rules: {
				// simple rule, converted to {required:true}
				c_price: {
					required: true,
					number: true,
					min: 1,
					max: 9999999
				},
				main_date: {
					required: true,
				},
				delivery_contact: {
					budget: true,
				}
				
			  }
			});
			
			function appliances_rowHTML(num){
					
			var rowHTML = `
							<div class="flex_col basis_42 appliance_items_row">
								<div class="flex_row_inp">
									<div class="col-sm-2">
										<input type="number" id="appliance_items_qty_${num}" class="number_req form-control appliance_items_qty" name="" value=""/>
									</div>
									<div class="col-sm-2">
										<input type="text" id="appliance_items_size_${num}" list="list_appliance_items_size" class="number_req form-control appliance_items_size" name="appliance_items_size" value=""/>
										<datalist id="list_appliance_items_size">
											<option>12"</option>
											<option>15"</option>
											<option>18"</option>
											<option>24"</option>
											<option>27"</option>
											<option>30"</option>
											<option>36"</option>
											<option>42"</option>
											<option>48"</option>
											<option>60"</option>
										</datalist>
									</div>
									<div class="col-sm-7">
										<input type="text" id="appliance_items_list_${num}" list="list_appliance_items_list" class="number_req form-control appliance_items_list" name="appliance_items_list" value=""/>
										<datalist id="list_appliance_items_list">
											<option>Refrigerator/Freezer</option>
											<option>Refrigerator</option>
											<option>Refrigerator - Panel Ready</option>
											<option>Freezer</option>
											<option>Freezer - Panel Ready</option>
											<option>Single Wall Oven</option>
											<option>Double Wall Oven</option>
											<option>Gas Range</option>
											<option>Microwave - Undercounter</option>
											<option>Microwave - OTR</option>
											<option>Dishwasher</option>
											<option>Dishwasher - Panel Ready</option>
											<option>Cooktop - Electric</option>
											<option>Cooktop - Induction</option>
											<option>Cooktop - Gas</option>
											<option>Warming Drawer - Panel Ready</option>
											<option>Warming Drawer</option>
											<option>Ice Maker</option>
											<option>Gas</option>
											<option>Beverage Fridge</option>
											<option>Beverage Fridge - Panel Ready</option>
											<option>Wine Cooler</option>
											<option>Coffee Machine</option>
										</datalist>
									</div>
									<div class="col-md-1"><button type="button" class="btn_minus appliances_item_minus">-</button></div>
								</div>
							</div>
						`;
						
						return rowHTML;
			}

	
		var appliances_num1 = 0;
		jQuery( ".appliances_item_plus" ).click(function( event ){
			event.preventDefault();
			if (appliances_num1 <= 50){
				appliances_num1 = appliances_num1 + 1;
				newfield_appliances = appliances_rowHTML(appliances_num1);
				$(this).parent().parent().parent().parent().append(newfield_appliances);
			}
		});
			
		jQuery("#priceCalcForm").on("click",".appliances_item_minus", function(){
			jQuery(this).parent().parent().parent().remove();
			appliances_num1 = appliances_num1 - 1;
		});
	
	
			var designer_info = {
					
					faigy : {
						email : "faigy@upgradeny.com" , 
						phone : "845-426-1400-202"
					} , 
					rivka : {
						email : "rivka@upgradeny.com" , 
						phone : "845-426-1400-204"
					} ,
					rachel : {
						email : "rachel@upgradeny.com" , 
						phone : "845-426-1400-203"
					} ,
					aliza : {
						email : "aliza@upgradeny.com" , 
						phone : "845-426-1400-205"
					} , 
					lazer : {
						email : "lazer@upgradesny.com" , 
						phone : "845-426-1400-202"
					}
					

				}
				
				
			jQuery( "#price_calc_btn" ).click(function( event ){

				event.preventDefault();
				
				var validator = $( "#priceCalcForm" ).validate();
					if( ! validator.form() ){
						$('html, body').animate({
							scrollTop: $("body").offset().top
						}, 1000);
						return;

					} 
				

					

			//----------------------   Header ---------------------------

	
				var main_date = jQuery('#main_date').val();

				//----------------------   Cabinetry ---------------------------
				
				var cabinetry_type = jQuery('#cabinetry_type').val();
				var included_items = jQuery('#included_items').val();
				var top_priority = jQuery('#top_priority').val();
				var budget = jQuery('#budget').val();
				//console.log(jQuery('#delivery_start').val())
				var delivery_start = jQuery('#delivery_start').val();
				var delivery_end = jQuery('#delivery_end').val();
				
				
				jQuery('#pdf_c_cabinetry_type').text(cabinetry_type);
				jQuery('#pdf_c_included_items').text(included_items);
				jQuery('#pdf_c_top_priority').text(top_priority);
				jQuery('#pdf_c_budget').text(budget);
				jQuery('#pdf_c_delivery_start').text(delivery_start);
				jQuery('#pdf_c_delivery_end').text(delivery_end);
				
				var whats_next_for_you = jQuery('#whats_next_for_you').val();
				var whats_next_for_upgrade = jQuery('#whats_next_for_upgrade').val();
				
				
				jQuery('#pdf_c_whats_next_for_you').text(whats_next_for_you);
				jQuery('#pdf_c_whats_next_for_upgrade').text(whats_next_for_upgrade);
				
				
				var initial_design = jQuery('#initial_design').val();
				var approved_plan = jQuery('#approved_plan').val();
				var revisions = jQuery('#revisions').val();
				
				
				jQuery('#pdf_c_initial_design').text(initial_design);
				jQuery('#pdf_c_approved_plan').text(approved_plan);
				jQuery('#pdf_c_revisions').text(revisions);
				
				
				var kitchen_designer = jQuery('#kitchen_designer').val();
				var designerData = designer_info[ jQuery('#kitchen_designer option:selected').attr('name') ];

				console.log(designerData.email);

				
				
				jQuery('#pdf_c_kitchen_designer_value').text(kitchen_designer);
				jQuery('#pdf_c_kitchen_designer_email').text(designerData.email);
				jQuery('#pdf_c_kitchen_designer_phone').text(designerData.phone);
				
				var appliances_items_rows = '';
				
				jQuery('.appliance_items_row').each(function () {

						console.log('appliances list item  ---- ')
						console.log(this)
						
						appliances_items_rows += `<div class="flex_table w_96 appliances_list">
							<div class="justify-normal flex_12"> <span id="" class="td_value text-left"> ${jQuery(this).find('.appliance_items_qty').val()} </span> </div>
							<div class="justify-normal flex_12"> <span id="" class="td_value text-left">${jQuery(this).find('.appliance_items_size').val()}  </span> </div>
							<div class="justify-normal flex_72"> <span id="" class="td_value text-left"> ${jQuery(this).find('.appliance_items_list').val()} </span> </div>
						</div>`

				});
				
				jQuery('#editor #appliances').empty();;
				jQuery('#editor #appliances').append(appliances_items_rows);
				
				
				printJS('editor', 'html');
					
			});	
			
});
