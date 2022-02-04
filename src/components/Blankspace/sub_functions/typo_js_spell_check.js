//this file used in Blankspace.vue as an external functions. Contains logic for checking textarea input with Typo-JS library. 
//Include  functions: 
// 1st {run_typo_js_spellCheckLibrary()}     =>  finds misspelled words, form/create the text with misspelled suggestions dropdowns (highlited with red) and manually opens BS modal window where a user can fix the errors
// 2nd {fix_MisspelledWords_In_ModalWindow()} => When user clicks "Fix changes" in modal window with options dropdowns, we finds the index/position in the array of found misspelled word + finds selected dropdown text + fixes textarea text in loop





export const typoJs_spellCheck_external = {



    /*
    |--------------------------------------------------------------------------
    | Typo JS core functionality is here, works on btn "Typo Spell Check" Click, Check the textarea input by Typo-js and suggests correct variants in dropdowns
	| On click finds misspelled words, form/create the text with misspelled suggestions dropdowns (highlited with red) and manually opens BS modal window where a user can fix the errors
	| Additionally displays misspelled words above the textarea and button to open modal window (unless they fixed, then this info disappear)
	| @param that is passed {this} context (from /Blankspace/Blankspace.vue)
	| @param Typo is imported in /Blankspace.vue Typo-Js library 
    | @param checkPathFile is an external file imported in Blankspace.vue. Contains function checkFileExist_External. Imported from './sub_functions/check_if_path_exist_function.js';
    |--------------------------------------------------------------------------
    |
    |
    */

	run_typo_js_spellCheckLibrary_External: function(that, Typo, checkPathFile){ 
			    
	    //Typo-js Library (spell check)-------			
		that.resultsShowFlag        = false; //hide div with Double space remover if visible (if user clicked prev "Run a check")
	    that.arrayOfMisspelledWords = [];    //reset the array of misspelled words
			
		let foundMisspelledWords  = "Found misspelled: ";  //list of misspelled words 
	    let all_text              = "";                    // contains whole textarea input with highlighted misspelled words (by Typo-js)
	    let spellErrorFound       = false;
			
		//decide which url to use, switching ajax url when running on  http://localhost:8080/ (hot reload), OpenServer Hosting or real web host
		let dynamicPath;  
	    let localhost8080     = "/static/dictionaries";
        let localhostOpServer = "../static/dictionaries"; 
	    let realServerProdURL = "static/dictionaries";
	     
		  
	    //if finds "/localhost:8080/" in current url. Url for case when app is runing in (npm run dev) hot reload
	    if(window.location.href.match(/localhost:8080/)){   
		    dynamicPath = localhost8080 ; 
		}
			
	    //if finds "/localhost/" in current url. Url for case when app is runing in OpenServer 
	    if(window.location.href.match(/localhost/)){    
		    dynamicPath = localhostOpServer ;
	    } else {
		    //case when app is runing on real web-host. Library must be in the same root with index.html
			dynamicPath = realServerProdURL; 
	    }
			
			
		//Check if path file to dictionary exists
		if(checkPathFile.checkFileExist_External(dynamicPath+"/en_US/en_US.aff")){  
		} else {
			that.$swal('Dictionary is not found');
			that.typoJSCheckFlag =  false; //hide the loader
			return false;
		}
			
					   
		//Check the textarea input by Typo-js
		let dictionary = new Typo("en_US", false, false, { dictionaryPath: dynamicPath });     //{ dictionaryPath: "/static/dictionaries" }
        let  arrayX2 = that.userInput.split('\n'); //split textarea input (string) to array by ('\n'). E.g "Lilly awoke  in an evening dress and opera cloak."
		for(let i = 0; i < arrayX2.length; i++) {  
			let  arrayX3 =  arrayX2[i].split(' ');  //split every line by separate words. E.g "opera"
			for(let j = 0; j < arrayX3.length; j++) {
				let currWord             = arrayX3[j]; //i.e one word from textarea to check, if it contains punctuantion, it is also included e.g "awoke,"
				let currWordPurified     = arrayX3[j].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,""); //i.e one word from textarea to check, but if it contains any punctuantion, we remove it 
				let is_spelled_correctly = dictionary.check(currWordPurified); //check the one current word by Typo-JS Library
				
				if(is_spelled_correctly){ //if spelling OK (by Typo-JS Library)
				    all_text = all_text + "  " + arrayX3[j];
                    
                //if spelling is wrong (by Typo-JS Library)				
				} else {
					//add misspelled word to array
					that.arrayOfMisspelledWords.push(currWord);
					//get suggestions for misspelled word (by typo-js)
					let array_of_suggestions = dictionary.suggest(currWordPurified); //to get suggested corrections word variants for a misspelled word by Typo-JS Library. E.g if it "wodke", the suggestions will be ["woke", "awoke']
					console.log(array_of_suggestions);
			
					//create checkbox/select/option with misspelled word suggestions.  E.g if it "wodke", the suggestions will be ["woke", "awoke']
					let checkBox = "<select class='suggests'> <option value='" + currWordPurified + "' selected>" + currWordPurified + "</option>"; 
					for(let i =  0; i < array_of_suggestions.length; i++){
						checkBox+= "<option value='" + array_of_suggestions[i] + "'>" + array_of_suggestions[i] + "</option>";
					}
					checkBox+= "</select>";
					//end get suggestions for misspelled word (by typo-js)
						
					foundMisspelledWords = foundMisspelledWords +  " <span style='color:red;'>" + arrayX3[j] + "</span> "; //to end the list of misspelled words
					all_text+= " <span style='color:red;'>" + checkBox + "</span> ";           //contains whole textarea input with highlighted misspelled words and suggestions dropdown (by Typo-js)
					spellErrorFound = true;
						
					$('#myModal').modal('show'); //open/show Modal window manually if errors exist
				}
			}
		}
			
		//CSS flag to change button text and hide loader, some delay for loader UI
		setTimeout(function(){ 
		    that.typoJSCheckFlag = false; 
		}, 1100); 
			
		that.typoJSSpellCheck_cut  = foundMisspelledWords;
		that.typoJSSpellCheck_full = all_text;
			
		if(spellErrorFound){
			that.$swal('Spelling error found');
            that.typoJSSpellCheck_cut+= '</br> <button type="button" class="btn btn-info" data-toggle="modal" data-target="#myModal">Open to fix</button>'; //<!-- Trigger the modal with a button -->
		} else {
			that.$swal('No spelling error found');
			that.typoJSSpellCheck_cut = "No spelling errors found";
		}
	},
	
	
	
	
	

	
	
    /*
    |--------------------------------------------------------------------------
    | When user clicks "Fix changes" in modal window with options dropdowns, we finds the index/position in the array of found misspelled word + finds selected dropdown text + fixes textarea text in loop
    | Modal window either pops up on executing{function run_typo_js_spellCheckLibrary()} or on manual clicking the button "Open to fix" (for example user ran {function run_typo_js_spellCheckLibrary()} but closes the modal without fixing the errors)
    | @param that is passed {this} context (from /Blankspace/Blankspace.vue)
	| @param sweet_alert_externalFile is an external file imported in Blankspace.vue. Contains function for SweetAlert2. Imported from './sub_functions/sweet_alert_function.js';
	|--------------------------------------------------------------------------
    |
    |
    */

	fix_MisspelledWords_In_ModalWindow_External: function(that, sweet_alert_externalFile){ 
		let r = "";  //just for alert string
		let textWithoutTags = that.typoJSSpellCheck_full.replace(/<[^>]*>?/gm, ''); //remove all html tags from text in modal window, as it includes <select><option> suggestion1 </option> <option> suggestion2 </option> <select>
		//console.log(textWithoutTags);
		let n = textWithoutTags.replace( /\s\s+/g, ' ' );     /* remove all double spaces in text, otherwise produces incorrect result */
		n =  n.trim(); // stripped of whitespace characters from beginning and end of a string
		let arrayTextWithoutTags = n.split(' ');  //.split('\n');  //convert modal window text (string) to array
			
		//copy textarea input to a new var for further manipulation without affecting textarea input   
		let userInputText = that.userInput; 
		userInputText     = userInputText.split(' ');  //.split('\n')  //textarea input to array	
			
		//finds the index/position in the array of found misspelled word + finds selected dropdown text + fixes textarea text in loop
		for(let i = 0; i < that.arrayOfMisspelledWords.length; i++){
			let searchWord  = that.arrayOfMisspelledWords[i]; //one current misspelled word, e.g "awakecc"
			let indexResult = userInputText.indexOf(searchWord); //index/position of found misspelled in array 'userInputText'
		    r+= "got index: " + indexResult + " " ;
				
			//finds selected dropdown text (corrected variant) for this current [i] <select>
			let selects     = document.getElementsByTagName('select');//gets all <select> array
			let e           = selects[i];                         //gets the currect <select>
            let textSelected = e.options[e.selectedIndex].text;   //get selected text of this currect <select>, e.g "awoke"
			console.log("fix: " + textSelected );
			// end  finds selected (corrected variant) for this current [i] <select>
				
			//replace => after removing all html tags from text in modal window, specifically <select> text contains all <option> text as one string, i.e "awokerevokewake", here we replace it with one selected from dropdown(corrected variant). i.e "awoke"
			arrayTextWithoutTags[indexResult] = textSelected ;
								
		    //fix/correct text, replace an element in array {userInputText} having index {indexResult} with selected text (selected in dropdown in modal window)
			userInputText[indexResult] = textSelected ;
		}
		
        //sweet_alert_externalFile.callSweetAlert2_Toast(that, r);	//Call the function from external file (/sub_functions/sweet_alert_function.js)	
		//console.log("arrayTextWithoutTags after :" + arrayTextWithoutTags);
			
		//replace texarea user input with fixed/corrected text
		let b = userInputText.join(' '); // convert array to string
		that.userInput = b;  //assign fixed/corrected text to {this.userInput}
			
		//Clears the string with errors found (which appears above the textarea). E.g "Found misspelled: evfoke" replace with "Spelling fixed successfully"
		that.typoJSSpellCheck_cut = 'Spelling fixed successfully';	     
	},
			
			
};