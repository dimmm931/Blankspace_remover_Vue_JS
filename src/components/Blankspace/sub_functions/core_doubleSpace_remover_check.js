//this file is used in Blankspace.vue as an external functions. 
//Include  functions:
//proccessTextCore_External()    -> fixes all double blankspaces, blankspace + comma, blankspace + full stop, etc
//countAllFoundErrors_External() -> count all errors found in text (double space etc). Used in function proccessTextCore
//highlightErrors_External()     -> function to highlight Errors in text (i.e double spaces, space+comma, etc). Used in function proccessTextCore

export const core_doubleSpace_remover_checker = {

    /*
    |--------------------------------------------------------------------------
	| If user clicks core button to process the text, fixes all double blankspaces, blankspace + comma, blankspace + full stop, etc
	| @param that is passed {this} context (from /Blankspace/Blankspace.vue)
	| @param computedAnswerFile is an external file imported in Blankspace.vue. Contains function scrollResults(). Imported from './sub_functions/scroll_function.js';
    |--------------------------------------------------------------------------
    |
    |
    */

	proccessTextCore_External: function(that, computedAnswerFile){  
		that.resultsShowFlag         = false;
		that.showDetailedErrorsFlag  = false; //always hide detailed error list 
		that.showHighLightErrorsFlag = false; //always hide HighLighted Errors text
		that.copiedFlag              = false;
			
		//if no user printed no input
		if(that.userInput == ""){
			//VUE Sweet alert 2
            that.$swal.fire({  
                html:true, 
                title: 'Stopped! Empty input!',
                text: "You are able to revert this!",
                icon: 'error',
                //showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'OK, I"ll try harder!',
                cancelButtonText: "No, cancel it!",
			    keydownListenerCapture: false, //ignore esc button to close the pop
				allowOutsideClick: false       //don't allow outside click to close the pop-up
             });
			return false;
		}
			
		that.instructionShowFlag = false; //hide instructions if shown
		that.fixedUserInput      = "";   //clear prev fixed/edited input if any
		that.textAfterCorrection = "";   //clear prev if any
		let  arrayX2 = that.userInput.split('\n');  
		arrayX2 = arrayX2.filter(item => item); //remove empty array elem, i.e if this.userInput contains 2 "/n" lines, e.g when u add support footer	
		for(let j = 0; j < arrayX2.length; j++) {  
            let tempTextLine = arrayX2[j]
	            .replace( /\s\s+/g, ' ' )                              /*double spaces*/
			    .replace(/ \,+/g, ',' )  //.replace(spaceComma, ',' )  /*space+comma*/
			    .replace( / \.+/g, '.' )                               /*space+dot*/
			    .replace( /\b(\w+)\s+\1\b/g, '\$1' )                   /*word duplicate*/
			    .replace( /\,\,+/g, ',' )                              /*double commas ,,*/
			    .replace( /\.\.+/g, '.' )                              /*double dots ..*/  
			    + '</br>'; 
				 
			//case if checkbox "check underscores" is ON, then include removing/replacing undescores as well (used for misplaces ad pins) 
            if(that.ifUnderscoreOnFlag){
				tempTextLine = tempTextLine.replace(/_/gi, ' ' );   /* underscore _ */ 
			}                          
				 
            //add up fixed/edited/corrected text
            that.fixedUserInput = that.fixedUserInput  + tempTextLine ;
        } 
			
		//case if checkbox "support footer on" is ON, then include Support footer to fixed/edited text
        if(that.ifSupportOnFlag){
		    that.fixedUserInput+= "</br>Best regards, </br> Waze Support team";
		}      
			
			
		this.countAllFoundErrors_External(that); //run additional function to count all found errors.
		this.highlightErrors_External(that);     //run additional function to highlight errors in red. 
			
		//Promise -> scroll only after the Div (".resultFinal") is in DOM
		new Promise(function(resolveX, rejectMe) {
			//add some delay before div will appear for better UI/UX
			 const myTimeout = setTimeout(function(){ 
				that.resultsShowFlag = true; 
				resolveX(); 
			}, 700);
		})
		.then(
			responseZZ => {  
			    computedAnswerFile.scrollResults(".resultFinal"); //Call the function from external file (/sub_functions/computedAnswer.js)
			}
		) 
        //catch
        .catch(errorX => { 
		    that.$swal('Error happened  ' + errorX);
        });	 
	},
	
	
	
	
	
	/*
    |-------------------------------------------------------------------------------------
    | Count all errors found in text (double space etc). Used in function proccessTextCore_External (used to be in proccessTextCore in /Blankspace.vue)
	| @param that is passed {this} context (from /Blankspace/Blankspace.vue)
    |-------------------------------------------------------------------------------------
    |
    |
    */		
	countAllFoundErrors_External: function(that){ 
			
		let numb                 = (that.userInput.match(/  +/g) || []).length;            //count doublespaces
        let numbComma            = (that.userInput.match(/ \,+/g) || []).length;           //count space+comma
        let numbDot              = (that.userInput.match(/ \.+/g) || []).length;           //count space+dot
        let doubleWords          = (that.userInput.match(/\b(\w+)\s+\1\b/g) || []).length; //count all consecutive duplicate words
        let doubleCommas         = (that.userInput.match(/(\,\,+)/g  ) || []).length;      //count all consecutive duplicate commas (i.e ",,")
        let doubleDots           = (that.userInput.match(/(\.\.+)/g  ) || []).length;      //count all consecutive duplicate dots (i.e "..")
        let commaCharNoSpace     = (that.userInput.match(/\,(.)/g    ) || []).length;     // count comma followed by NO SPACE (i.e ",char")  //work here!!!!!!!     //comma followed by char no space (i.e "not,you")
        //Rex exp for misplaced ad pins
        let RegExp_underscore = /_/gi; // construct Regular expression
        let Underscore_ErrCount = (that.userInput.match(RegExp_underscore) || []).length; // count undescores (i.e "_")
  
		//case if checkbox "waze specifics" is ON, then include checking for some waze specifics  i.e "Please know that, Help Center". Notifications only (swal).
        if(that.ifWazeSpecificsOnFlag){
            //start Help Center issue---
            let hrefUrlBlankSpace = (that.userInput.match(/Help Center/gi) || []).length; // checking Help Center space; if blankspace is linked. 
            if(hrefUrlBlankSpace > 0){
                that.$swal('Help Center reference is detected!!!');
		    }
            // END Help Center issue-----[

   
           //Please know that(if that is missing)
		    let RegExp_PlsKnow  = /please (know||note) (?!that)\w*/gi;  
	        let PlsKnowErrCount = (that.userInput.match(RegExp_PlsKnow ) || []).length; //count "please know"
	        if(that.userInput.match(RegExp_PlsKnow)) { ///if at least 1 result
			    that.$swal('Missing "that" error is detected! Found: ' + PlsKnowErrCount + ' issue');
			} 
            //END Please know that(if that is missing)
        }

        // count all counts Errors all together (they are +-ed)
        let AllErrorsCount = numb + numbComma + numbDot+doubleWords + doubleCommas + doubleDots;  
			
	    //specify detailedListOfErrors
		that.detailedListOfErrors = "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Double Spaces => "                           + numb             + "</p>" + 
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Char followed by comma with space => "   + numbComma        + "</p>" + 
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Dots followed => "                       + numbDot          + "</p>" +
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Consecutive duplicates => "              + doubleWords      + "</p>" +
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Double commas => "                       + doubleCommas     + "</p>" +
				                        "<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Double dots => "                         + doubleDots       + "</p>";
			
		//case if checkbox "check underscores" is ON, then include undescores to mistakes count (used for misplaces ad pins)
        if(that.ifUnderscoreOnFlag){
			AllErrorsCount = AllErrorsCount + Underscore_ErrCount;
		    that.detailedListOfErrors = that.detailedListOfErrors + 
				"<p class='margin-zz' style='margin-top: -0.7em;text-align:left;'> Underscores => "  + Underscore_ErrCount   + "</p>";;
		}
			
		that.foundErrorsCount = AllErrorsCount; //amount of found errors
		(AllErrorsCount == 0) ? that.textAfterCorrection = "No correction was performed" : that.textAfterCorrection = "Text after correction";
	},
	
	
	
	
		
	
	/*
    |---------------------------------------------------------------------------------------------------------------
    | Function to highlight Errors in text (i.e double spaces, space+comma, etc). Used in function proccessTextCore_External
	| @param that is passed {this} context (from /Blankspace/Blankspace.vue)
    |---------------------------------------------------------------------------------------------------------------
    |
    |
    */
	highlightErrors_External(that){
		let intro;
		let finalText = '';
		(that.foundErrorsCount == 0) ? intro = "<p> No errors found </p>" :  intro = "<p> See errors </p>";
		let  arrayX2 = that.userInput.split('\n');
		for(let j = 0; j < arrayX2.length; j++) {  
			let resHighlight = arrayX2[j] /*->double spaces*/
	                .replace(/  +/g, "&nbsp;<span style='background:red;'> __ </span>&nbsp;")                 /* double blankspace */
					.replace(/ \,+/g, "&nbsp;<span style='background:red;'> __, </span>&nbsp;")               /* space+comma       */
					.replace(/ \.+/g, "&nbsp;<span style='background:red;'> __. </span>&nbsp;")               /* space+dot         */
	                .replace(/\b(\w+)\s+\1\b/g, "&nbsp;<span style='background:red;'> \$1 \$1 </span>&nbsp;") /* dublicate         */
		            .replace(/\,\,+/g, "&nbsp;<span style='background:red;'> ,, </span>&nbsp;")               /* double,,          */
		            .replace(/\.\.+/g, "&nbsp;<span style='background:red;'> .. </span>&nbsp;")               /* double..          */
                    /* .replace(/\,(.)/g, "&nbsp;&nbsp;<span style='background:red;'>_ ,</span>&nbsp;") */        /* comma char no space(,word) */ 
	               + "</br>";
	   
	        //case if checkbox "check underscores" is ON, include undescores to highlighted text (used for misplaces ad pins)
            if(that.ifUnderscoreOnFlag){
				resHighlight =  resHighlight.replace(/_/gi, "&nbsp;<span style='background:red;'> _ </span>&nbsp;");   /*underscore_*/  
			}
			
	        //add up finalText
	        finalText = finalText + resHighlight;
		}
		that.textHighlightedErrors = intro  + finalText;
	}
			
			
};