//this file is used in Blankspace.vue as an external functions

export const clearBtnFile = {

    /*
    |--------------------------------------------------------------------------
    | If user clicks "Clear" button, clear the data
	| @param that is passed {this} context (from /Blankspace/Blankspace.vue)
    |--------------------------------------------------------------------------
    |
    |
    */

	clearAll: function(that){ 
	    that.userInput            = "";
		that.fixedUserInput       = "";
		that.textAfterCorrection  = "";
		that.instructionShowFlag  = false;
		that.resultsShowFlag      = false;
		that.typoJSSpellCheck_cut = "";  //Typo-js text
	}
			
};