//this file used in Blankspace.vue as an external functions

export const computedAnswerFile = {

    /*
    |--------------------------------------------------------------------------
    | Scroll function // that.scrollResults("#captchaSet"); 
	| arg(DivID, levels to go up from DivID)
    |--------------------------------------------------------------------------
    |
    |
    */

	scrollResults: function(divName, parent){
	    //if 2nd arg is not provided while calling the function with one arg
		if (typeof(parent)==='undefined') {
            $('html, body').animate({
                scrollTop: $(divName).offset().top
            }, 'slow'); 
		        
		} else {
			let stringX = "$(divName)" + parent + "offset().top";  //i.e constructs -> $("#divID").parent().parent().offset().top
			$('html, body').animate({
                scrollTop: eval(stringX)     
            }, 'slow'); 
		}
	}
			
			
};