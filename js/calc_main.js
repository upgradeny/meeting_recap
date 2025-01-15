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
			
			function monthInputFormatConverter(monthInput){
				if (monthInput) {
					const date = new Date(monthInput + "-01"); // Add a day to make it a valid date
					const options = { year: 'numeric', month: 'long' };
					const formattedDate = date.toLocaleDateString('en-US', options);
					return formattedDate;
				}else{
					return '';
				}
			}
			
			// to check for non empty input fields of specific class
			function countNonEmptyInputs(selector) {
				return jQuery(selector).filter(function() {
					return this.value.trim() !== ''; // Checks if the input field is not empty
				}).length;
			}


			
			
			function appliances_rowHTML(num){
					
			var rowHTML = `
							<div class="flex_col basis_42 appliance_items_row">
								<div class="flex_row_inp">
									<div class="col-sm-2 p-0">
										<input type="number" id="appliance_items_qty_${num}" class="number_req form-control appliance_items_qty" name="" value=""/>
									</div>
									<div class="col-sm-2 p-0">
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
									<div class="col-sm-7 p-0">
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
						phone : "845-426-1400 x 202"
					} , 
					rivka : {
						email : "rivka@upgradeny.com" , 
						phone : "845-426-1400 x 204"
					} ,
					rachel : {
						email : "rachel@upgradeny.com" , 
						phone : "845-426-1400 x 203"
					} ,
					aliza : {
						email : "aliza@upgradeny.com" , 
						phone : "845-426-1400 x 205"
					} , 
					lazer : {
						email : "lazer@upgradesny.com" , 
						phone : "845-426-1400 x 201"
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
				
				var project_name = jQuery('#project_name').val();
				var cabinetry_type = jQuery('#cabinetry_type').val();
				var included_items = jQuery('#included_items').val();
				var top_priority = jQuery('#top_priority').val();
				var budget = jQuery('#budget').val();
				var installation = jQuery('#installation').val();
				//console.log(jQuery('#delivery_start').val())
				var delivery_start = monthInputFormatConverter( jQuery('#delivery_start').val() );
				//var delivery_end = monthInputFormatConverter( jQuery('#delivery_end').val() );
				
				
				if (project_name) {
					jQuery('#pdf_consultation_recap').text(`Consultation Recap - ${project_name}`);
				} else {
					jQuery('#pdf_consultation_recap').text(`Consultation Recap`);
				}
				
				
				jQuery('#pdf_c_cabinetry_type').text(cabinetry_type);
				jQuery('#pdf_c_included_items').text(included_items);
				jQuery('#pdf_c_top_priority').text(top_priority);
				jQuery('#pdf_c_budget').text('$ ' + numberWithCommas(budget));
				jQuery('#pdf_c_installation').text(installation);
				jQuery('#pdf_c_delivery_start').text(delivery_start);
				//jQuery('#pdf_c_delivery_end').text(delivery_end);
				
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

				//console.log(designerData.email);

				
				
				jQuery('#pdf_c_kitchen_designer_value').text(kitchen_designer);
				jQuery('#pdf_c_kitchen_designer_email').text(designerData.email);
				jQuery('#pdf_c_kitchen_designer_phone').text(designerData.phone);
				
				
				var NonEmptyInputs = countNonEmptyInputs('.appliance_items_list');  // count how many non emoty inputs
				var half_of_NonEmptyInputs = Math.ceil(NonEmptyInputs/2);
				var appliances_split_factor = NonEmptyInputs <= 10 ?  half_of_NonEmptyInputs = 5 : half_of_NonEmptyInputs = half_of_NonEmptyInputs;
				console.log(NonEmptyInputs , appliances_split_factor);
				
				var appliances_items_rows =  `<h2>APPLIANCE LIST</h2>
												<div class="flex justify-space-between bck_light_grey">
												<div class="flex_table flex_col table_bck">
													<div class="appliances_list">
														<div class="flex_12 border_0"> <span id="" class="td_value text-left text-bold">Qty </span> </div>
														<div class="flex_12 border_0"> <span id="" class="td_value text-left text-bold">Size  </span> </div>
														<div class="flex_1 border_0"> <span id="" class="td_value text-left text-bold">Item </span> </div>
													</div>`;
				var counter_appliances = 0;
				jQuery('.appliance_items_row').each(function () {
						
						//console.log('appliances list item  ---- ')
						//console.log(this);
						
						if (counter_appliances == appliances_split_factor) {
							appliances_items_rows += `</div><div class="flex_table flex_col table_bck">
													<div class="appliances_list">
														<div class="flex_12 border_0"> <span id="" class="td_value text-left text-bold">Qty </span> </div>
														<div class="flex_12 border_0"> <span id="" class="td_value text-left text-bold">Size  </span> </div>
														<div class="flex_1 border_0"> <span id="" class="td_value text-left text-bold">Item </span> </div>
													</div>`; // end flextable and start new flextable
						}

						appliances_items_rows += `<div class="appliances_list">
							<div class="flex_12 border_0"> <span id="" class="td_value text-left"> ${jQuery(this).find('.appliance_items_qty').val()} </span> </div>
							<div class="flex_12 border_0"> <span id="" class="td_value text-left">${jQuery(this).find('.appliance_items_size').val()}  </span> </div>
							<div class="flex_1 border_0"> <span id="" class="td_value text-left"> ${jQuery(this).find('.appliance_items_list').val()} </span> </div>
						</div>`
						
						counter_appliances++;

				});
				
				appliances_items_rows += '</div></div>';
				

				
				jQuery('#editor #appliances').empty();;
				jQuery('#editor #appliances').append(appliances_items_rows);
				
				
				printJS('editor', 'html');
					
			});	
			
});
