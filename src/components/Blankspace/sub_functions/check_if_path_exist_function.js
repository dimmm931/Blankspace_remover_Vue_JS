//this file used in Blankspace.vue as an external functions (and is passed as param to sub-function)

export const checkPathFile = {

    /*
    |---------------------------------------------------------------------------------------------------------------------
    | Function to check if file path exists, used to check before load the Dictionary for Typo-js (if Dictionary path is OK)
	| @param urlToFile
    |--------------------------------------------------------------------------------------------------------------------
    |
    |
    */

	checkFileExist_External: function(urlToFile){ 
	    let xhr = new XMLHttpRequest();
        xhr.open('GET', urlToFile, false);
        xhr.send();
		
        //If file not found
        if (xhr.status == "404" ) {    
            return false;
			
		//if file is found and OK
        } else {
			let checkWord = xhr.responseText.split("\n")[0] ; //get the first 1 line, if OK it must be "SET ISO8859-1"			
			if(checkWord == "SET ISO8859-1" ){
				return true;
			} else {
				return false;
			}
        }
	}
			
			
};