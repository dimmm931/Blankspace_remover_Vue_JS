<template>
    <div class="col-sm-12 col-xs-12 blankspace">
	
	    <div id="headX" class="jumbotron text-center bg-color"> 
            <h1 id="h1Text"> 
			    <span id="textChange"> Double blankspace removal</span> <span class="glyphicon glyphicon glyphicon-link myclip"></span> 
			</h1>
            <p class="header_p"> finds, highlights and fixes all double blankspaces, consecutive duplicates and more </p> 
        </div>

        <div class="item contact padding-top-0 padding-bottom-0" id="contact1">
            <div class="wrapper grey">
    		    <div class="container">

                    <!--------- Show misspelled words by Typo-JS ---------------->
                    <div v-html="this.typoJSSpellCheck_cut" class="misspelled"></div>  <!--  v-html to display unescaped HTML with html tages -->
						
						
                    <!--------------------------------------------------- Textarea form Start ------------------------------------------------------>
    			    <div class="col-sm-12 col-xs-12">	
    	                <form role="form">  	
    			            <div class="form-group">
    				            <textarea  v-model="userInput"  class="form-control" rows="6" placeholder="Your text here.."  required spellcheck="true"></textarea>
    		                </div>
                        </form>
    			    </div>	
                    <!--------------------------------------------------- Textarea form END -------------------------------------------------------->
    			
				
    				<!--------------------------- Checkboxes to add additional functions to text fixing process ------------------------------------>
					<div class="row check-options">
                        <!-- Checkbox to include checking underscores, i.e for misplaced ad pins -->
					    <div class="col-sm-3 col-xs-12">
					        <input type="checkbox" id="checkbox" name="checkbox" class="checkbox-x" v-model="ifUnderscoreOnFlag" v-on:click="toogleMisplacedAdPinsOn">
                            <label id="following" for="checkbox"> {{ this.ifUnderscoreOnFlag ? "check underscores on" : "check underscores" }} </label>
					    </div>
					
					    <!-- Checkbox to include checking some waze specifics, i.e "Please know that, Help Center". No correction, just notifications-->
					    <div class="col-sm-3 col-xs-12">
					        <input type="checkbox" id="wspec" class="checkbox-x" v-model="ifWazeSpecificsOnFlag" v-on:click="toggleWazeSpecifics">
                            <label id="following" for="wspec"> {{ this.ifWazeSpecificsOnFlag ? "waze specifics on (notify only)" : "waze specifics" }} </label>
					    </div>
					
					    <!-- Checkbox to include/exclude Support footer -->
					    <div class="col-sm-2 col-xs-12">
					        <input type="checkbox" id="support" class="checkbox-x" v-model="ifSupportOnFlag" v-on:click="toogleSupport">
                            <label id="following" for="support"> {{ this.ifSupportOnFlag ? "support footer on" : "support footer" }} </label>
					    </div>
				    </div>
                    <!--------------------------- End Checkboxes to add additional functions to text fixing process -------------------------------->



                    <!------------------------------------------------------- START BUTTONS -------------------------------------------------------->
			        <div class="col-md-8 buttons-set">  
    				    <button id="splitButton"       type="button" class="btn btn-primary btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="proccessTextCore">  Run a check </button>
                        <button id="clearButton"       type="button" class="btn btn-danger btn-embossed btn-lg btn-wide bt-mobile-mine"   v-on:click="clear">             &nbsp;Reset&nbsp;       </button >
					    <button id="examplebutton"     type="button" class="btn btn-primary btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="setExample">        Example     </button>
                        <button id="instructionButton" type="button" class="btn btn-success btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="setInstructions">   {{ this.instructionShowFlag ? "Hide instructions" : "Show instructions"  }} </button>
    		            <button type="button" class="btn btn-success btn-embossed btn-lg btn-wide bt-mobile-mine"  v-on:click="run_typo_js_handler">                      {{ this.typoJSCheckFlag      ? "Checking..."      : "Typo JS Spell Check" }} </button>
					</div>
                    <!------------------------------------------------------- START BUTTONS -------------------------------------------------------->



                    <!------------------------------------------ INSTRUCTIONS SECTION Component ---------------------------------------------------->
                    <!--------- Draw the Instructions from sub-component './sub_components/instructions.vue' ------------> 
			        <draw-instrcutions-field :cssVisibilityFlag ="this.instructionShowFlag"> </draw-instrcutions-field>   <!-- props :cssVisibilityFlag-->
                    <!----------------------------------------- END INSTRUCTIONS SECTION Component ------------------------------------------------->


					
			        <!-------------------------------- RESULTS SECTION (fixed/edited/corrected text) ----------------------------------------------->
			        <transition name="bounce">  <!--- Animation wrapper ------>
				        <div v-if="this.resultsShowFlag" class="col-sm-12 col-xs-12">
								
				            <!-- "No correction was performed" vs "Text after correction" -->
				            <div class="col-sm-12 col-xs-12 red margin-top text-bigger"> 
						        {{ this.textAfterCorrection }} 
						    </div>              
				
				            <!-- Fixed/Corrected text -->
			                <div v-html="this.fixedUserInput" class="col-sm-12 col-xs-12 resultFinal" id="fixedText">    <!--  v-html to display unescaped HTML (with html tages -->
				            </div> 
						
						
						    <!-- Button "Copy text" -->
						    <div class="col-sm-12 col-xs-12">  
						        <button class="btn" v-on:click="copyTextFunction"> 
						           {{ copiedFlag ? "Copied successfully" : "Copy corrected text" }}
						        </button> 
						    </div> 
				
				
				            <!-- Quantity of found errors -->
				            <div class="col-sm-12 col-xs-12 red errors-div red text-bigger"> Found Errors: <span class="badge red-bg"> {{ this.foundErrorsCount }} </span> </div>
						
						    <!-- Button/Div to show/hide detailed error list -->
						    <div v-on:click="showDetailedErrors" class="cursor-x"> 
						        {{ showDetailedErrorsFlag ? "hide detailed error list >>" : "show detailed error list >>" }}  
						    </div> 
						
						    <!-- Button/Div to show/hide highlighted errors -->
						    <div v-on:click="showHighLightedErrors" class="cursor-x"> <!-- Button to show/hide highlighted errors -->
    						    {{ showHighLightErrorsFlag ? "hide highlighted errors " : "show highlighted errors " }} >> </i>   
						    </div>  <!-- Button to show/hide highlighted errors -->
						
						 
						    <!-- Detailed ist of errors -->
						    <transition name="bounce">
						        <div v-if="this.showDetailedErrorsFlag" v-html="this.detailedListOfErrors" class="col-sm-12 col-xs-12 hightLighted"> </div>    <!--  v-html to display unescaped HTML (with html tages -->
						    </transition> 
						 
				            <!-- Text with red highlighted text -->
						    <transition name="bounce"> 
				                <div v-if="this.showHighLightErrorsFlag" v-html="this.textHighlightedErrors" class="col-sm-12 col-xs-12 hightLighted"></div>   <!--  v-html to display unescaped HTML (with html tages -->
				            </transition>
				        </div>
				    </transition>  
				    <!--------------------------------- END RESULTS SECTION (fixed text)-------------------------------------------------------->
	                          

    		    </div><!-- /.container -->
    	    </div><!-- /.wrapper -->

		    <!----- Footer from sub-component './sub_components/footer.vue' ---->
		    <draw-footer-field/>
		    <!-- END Footer from sub-component './sub_components/footer.vue' ---->
    	
        </div> <!-- /.item -->
			

	    <!------------------------ Modal window contains Typo-JS highlighted spell errors (dropdowns)in text ---------------------------------->
		<!----------------------- Hidden by default, get visible either by run_typo_js_spellCheckLibrary() or by click on  <button data-target="#myModal">Open to fix</button>. Button is generated by the same function---------------------------->
        <div id="myModal" class="modal fade" role="dialog">
            <div class="modal-dialog">
                <!-- Modal content-->
                <div class="modal-content">
                    <div class="modal-header">
                       <button type="button" class="close" data-dismiss="modal">&times;</button>
                       <h4 class="modal-title">Fix misspelled words</h4>
                    </div>
                    <div class="modal-body">
                        <p>See errors and fix them.</p>
						<!-- contains whole textarea input with highlighted misspelled words (by Typo-js) -->
						<div v-html="this.typoJSSpellCheck_full" class="col-sm-12 col-xs-12"></div>       <!--  v-html to display unescaped HTML (with html tages -->
                    </div>
                    <div class="modal-footer">
					   <button v-on:click="fix_MisspelledWords_In_ModalWindow" type="button" class="btn btn-default" data-dismiss="modal" >Fix changes</button>
                       <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
        <!----------------------------- Modal window contains Typo-JS highlighted spell errors (dropdowns)in text ------------------------------->
			
		
	    <!--------- Loader, appearance is based on Vue data typoJSCheckFlag )-------------------------------------------------------------------->
        <div v-if="this.typoJSCheckFlag" class="loader-x">
			<img :src="this.imageMineLoader" alt="a"/>  <!-- image path is speficied in data => imageMineLoader -->
        </div>
        <!--------------------------- Loader  --------------------------------------------------------------------------------------------------->	
		
  </div> <!-- end class="blankspace" -->
</template>

<script>
//Import Typo-JS library
let Typo = require("typo-js/typo.js"); //Use "typo-js" JS Library for check spell //https://github.com/cfinke/Typo.js

//Import function from other external file
import {computedAnswerFile}               from './sub_functions/scroll_function.js';  
import {copyExternalFunction}             from './sub_functions/copy_function.js';
import {typoJs_spellCheck_external}       from './sub_functions/typo_js_spell_check.js';             //Typo-Js check spell check external functions
import {clearBtnFile}                     from './sub_functions/clear_btn_function.js';              //"Clear" button external functions
import {core_doubleSpace_remover_checker} from './sub_functions/core_doubleSpace_remover_check.js';  //Core double space remove functions external functions 
import {sweet_alert_externalFile}         from './sub_functions/sweet_alert_function.js';            //Sweet Alert 2 external functions
import {checkPathFile}                    from './sub_functions/check_if_path_exist_function.js';    //checkFileExist external functions

//Import sub-component, using other sub-component, in this case a component to draw instructions, footer, etc                        
import instructionField from './sub_components/instructions.vue';  
import footerField      from './sub_components/footer.vue';        

export default {
    name: 'Blankspace',
	
	//using other sub-component
    components: {
      'draw-instrcutions-field': instructionField,
	  'draw-footer-field'      : footerField 
    },
	
    data () {
        return {
            msg                    : 'Welcome to Blankspace App',
			userInput              : '',     //textarea input
			fixedUserInput         : '',     //fixed/corrected textarea input
			instructionShowFlag    : false,  //CSS flag to show/hide instructions
			resultsShowFlag        : false,  //CSS to show/hide div with core results (double spaces, double dots, etc removed)
			showDetailedErrorsFlag : false,  //CSS to show/hide detailed list with errors (double spaces, double dots section)
			showHighLightErrorsFlag: false,  //CSS to show/hide highlited red text        (double spaces, double dots section)
			copiedFlag             : false,  //CSS to change text "Copy" / "Copied"
			typoJSCheckFlag        : false,   //CSS to change text "Typo Js Check spell"/"Checking" + loader appearance
			ifUnderscoreOnFlag     : false,  //checkbox flag to decide if text editing will include checking/removing underscore (_, e.g for misplaced ad pins)
			ifSupportOnFlag        : false,  //checkbox flag to decide if edited/fixed text will contain support footer
			ifWazeSpecificsOnFlag  : false,  //checkbox flag to decide if edited/fixed text will contain checking for some waze specifics, i.e "Please know that, Help Center"
			foundErrorsCount       : null,   //amount of errors found (int) (used in double spaces, double dots section)
			textAfterCorrection    :'',      //"No correction was performed" vs "Text after correction" (used in double spaces, double dots section)
			detailedListOfErrors   :'',      //detailed list of errors found (used in double spaces, double dots section)
			textHighlightedErrors  :'', 
			typoJSSpellCheck_cut  :'',         //string contains list of misspelled words (by Typo-js)  //'Spell errors will be here (click "typo spell check") ..', 
			typoJSSpellCheck_full :'',         //string contains whole textarea input with highlighted misspelled words (by Typo-js)
			arrayOfMisspelledWords:[],         //array contains list of misspelled words (by Typo-js)
			imageMineLoader       : require('@/assets/loader-black.gif'), //image for loader
        }
    },
  
    computed: {
		checkText() {
			return this.userInput;
		},	
	},
		
	//before mount
    beforeMount() {    
	},
		
	mounted(){     
	},

	methods: {
		    
        /*
        |---------------------------------------------------------------------------------------------------------------------
        | If image url is invalid or broken or image physically not available in folder, then use 'images/image-corrupted.jpg"
        |---------------------------------------------------------------------------------------------------------------------
        |
        |
        */
		imageUrlAlt(event) {
            event.target.src = "images/image-corrupted.jpg"
        },
		
		
		
        /*
        |-------------------------------------------------------------------------------------------------------------------------------------------------------
        | If user clicks core button to process the text, fixes all double blankspaces, blankspace + comma, blankspace + full stop, etc. Call External function
        |-------------------------------------------------------------------------------------------------------------------------------------------------------
        |
        |
        */		
		proccessTextCore(){

		    core_doubleSpace_remover_checker.proccessTextCore_External(this, computedAnswerFile);  //Call the function from external file (/sub_functions/core_doubleSpace_remover_check.js)
        },

		
		
        /*
        |--------------------------------------------------------------------------
        | If user clicks "Clear" button
        |--------------------------------------------------------------------------
        |
        |
        */		
		clear(){
		    clearBtnFile.clearAll(this);  //Call the function from external file (/sub_functions/clear_btn_function.js)
        },
        
		
		
	
	   /*
        |--------------------------------------------------------------------------
        | Function to show/hide instructions
        |--------------------------------------------------------------------------
        */
        setInstructions(){
		    this.instructionShowFlag = !this.instructionShowFlag; //switch state to change class.
			const myTimeout = setTimeout(function(){ 
				computedAnswerFile.scrollResults("#hiddenInstructions"); //Call the function from external file (/sub_functions/computedAnswer.js)
		    }, 700);
        },
		
		
		
		/*
        |--------------------------------------------------------------------------
        | Function set example text to teaxtarea
        |--------------------------------------------------------------------------
        */
		setExample(){
		    this.userInput = "Lilly awoke  in an evening dress and opera cloak. \n In her hand were five playing cards. \n They were were, the queen  of spades, four of clubs, \n nine of clubs , three of hearts, nine of hearts.";
		},
		
		
		
		/*
        |--------------------------------------------------------------------------
        | Function to switch CSS to show/hide detailed error list
        |--------------------------------------------------------------------------
        */
		showDetailedErrors(){
		    this.showDetailedErrorsFlag  = !this.showDetailedErrorsFlag; //switch state to change class.
			this.showHighLightErrorsFlag = false; //always hide HighLighted Errors text
			//Call the function from external file (/sub_functions/computedAnswer.js).
			const myTimeout = setTimeout(function(){ 
			    computedAnswerFile.scrollResults(".hightLighted"); 
			}, 700);
		},
		
		  
		
	    /*
        |-----------------------------------------------------------------------------------
        | Function to switch CSS to show/hide HighLighted Errors text
        |-----------------------------------------------------------------------------------
        */
		showHighLightedErrors(){
		    this.showHighLightErrorsFlag = !this.showHighLightErrorsFlag; //switch state to change class.
			this.showDetailedErrorsFlag  = false; //always hide detailed error list 
			//Call the function from external file (/sub_functions/computedAnswer.js). 
			const myTimeout = setTimeout(function(){ 
			    computedAnswerFile.scrollResults(".hightLighted"); 
		   }, 700);
        },
		
	
		/*
        |-----------------------------------------------------------------------------------
        | Function to copy text via external function
        |-----------------------------------------------------------------------------------
        */
		copyTextFunction(){ 
		    copyExternalFunction.copyTextToClipBoard(this); //calling external file function
		},
		
		
		
		
		/*
        |-----------------------------------------------------------------------------------
        | On checkbox change enable/disable checking undescored (used for misplaced ad pins)
        |-----------------------------------------------------------------------------------
        */
		toogleMisplacedAdPinsOn(){
		    this.ifUnderscoreOnFlag  = !this.ifUnderscoreOnFlag; //switch state to change text and enable/disable checking misplaced Ad Pins.
		},
		
		//on checkbox change enable/disable adding Support footer to edited/fixed tex 
		toogleSupport(){
		    this.ifSupportOnFlag  = !this.ifSupportOnFlag; //switch state to change text and enable/disable adding support footer
		},
		
		//on checkbox change enable/disable checking if edited/fixed text will contain checking for some waze specifics, i.e "Please know that, Help Center"
		toggleWazeSpecifics(){
		    this.ifWazeSpecificsOnFlag  = !this.ifWazeSpecificsOnFlag; //switch state to change text and enable/disable
		},
		
		

			
		/*
        |-----------------------------------------------------------------------------------------------------------------------------------------------------------------
        | Function-handler Fix to fire run_typo_js_spellCheckLibrary(). On click, it changes data value, shows loader and run run_typo_js_spellCheckLibrary(). 
		| 
        |------------------------------------------------------------------------------------------------------------------------------------------------------------------
        |
        |
        */
		run_typo_js_handler(){
		    //if no user printed no input
			if(this.userInput == ""){
			    this.$swal('Input is empty');
				return false;
			}
			
			let that = this;
		    this.typoJSCheckFlag = true; //CSS flag for button text and Loader appearance
			
			//In Vue DOM refreshes async 
			this.$nextTick(function () {
			    setTimeout(function(){ 	
			        that.run_typo_js_spellCheckLibrary(); 
			    }, 100); 
			});
		},
		
		
		
		
		/*
        |-----------------------------------------------------------------------------------------------------------------------------------------
        | Typo JS core functionality is here, works on btn "Typo Spell Check" Click, Check the textarea input spell errors by Typo-js and suggests correct variants in dropdowns
		| On click finds misspelled words, form/create the text with misspelled suggestions dropdowns (highlited with red) and manually opens BS modal window where a user can fix the errors
		| Additionally displays misspelled words above the textarea and button to open modal window (unless they fixed, then this info disappears)
		| 
        |-----------------------------------------------------------------------------------------------------------------------------------------
        |
        |
        */  
		run_typo_js_spellCheckLibrary(){
            typoJs_spellCheck_external.run_typo_js_spellCheckLibrary_External(this, Typo, checkPathFile);   //calling external functions from './sub_functions/typo_js_spell_check.js', arg [ @param this, @param Typo(imported Typo-JS library), @param checkPathFile(impoterd external file) ]
		},
		

		
		/*
        |-------------------------------------------------------------------------------------------------------------------
        | When user clicks "Fix changes" in modal window with correct spell options dropdowns, we finds the index/position in the array of found misspelled word + finds selected dropdown text + fixes textarea text in loop
		| Modal window either pops up on executing{function run_typo_js_spellCheckLibrary()} or on manual clicking the button "Open to fix" (for example user ran {function run_typo_js_spellCheckLibrary()} but closes the modal without fixing the errors)
        |-------------------------------------------------------------------------------------------------------------------
        |
        |
        */
		fix_MisspelledWords_In_ModalWindow(){
		    typoJs_spellCheck_external.fix_MisspelledWords_In_ModalWindow_External(this, sweet_alert_externalFile); //calling external functions from './sub_functions/typo_js_spell_check.js', arg[@param this, @param sweet_alert_externalFile is an external file to call SweetAlert2 Toast]
		},
		
    }		
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li             {display: inline-block;margin: 0 10px;}
a              {color: #42b983;}
.resultFinal   {border: 1px solid black; margin-top: 1em; padding: 1em 0.2em}
.hightLighted  {border: 1px solid black; margin-top: 1em; padding: 1em 0.2em}
.red           {color: red;}
.margin-zz     {margin: 0 !important; color:red !important; text-align:left; }
.errors-div    {margin-top:2em;}
.margin-top    {margin-top:2em;}
.cursor-x:hover{text-decoration: underlined; color:red; cursor:pointer;}
.text-bigger   {font-size: 1.2em;}
.red-bg        {background-color:red;}
.footer        {margin-top: 26em;}
.buttons-set   {margin-top:3em;}
.misspelled    {margin-bottom: 0.2em;}
.bg-color      {background-color: #2ba6cb;}

/*  mobile */
@media screen and (max-width: 460px) {   
    .check-options { font-size: 0.8em;}
	.buttons-set   {margin-top: 1em;}
}


/* ----------------  Vue animation ----- */

    /*--- Animation Var 1 */
    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.1s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
        opacity: 0;
    }

    /*--- Animation Var 2 */	
    .bounce-enter-active {
       animation: bounce-in 0.5s; /* fade in time */
    }
    .bounce-leave-active {
      animation: bounce-in 1.5s reverse;
    }
    @keyframes bounce-in {
       0%   { transform: scale(0); }
       50% { -webkit-transform : rotate(480deg) scale(0.3); /* Chrome, Opera 15+, Safari 3.1+ */  transform: rotate(490deg) scale(0.2); /* Firefox 16+, IE 10+, Opera */ }     /* transform: scale(1.5); */
       100% { transform: scale(1); }
    }
	
/* -------------- End  Vue animation ----------*/


/* ---- Loader --------*/
.loader-x     {position:absolute; top:16em; left:0em; width:99%; z-index:888; }
.loader-x img {width:13%;}

/* --- Mobile */
@media screen and (max-width: 480px) { 
  .loader-x     {position:fixed; top:16em; left:1em; width:99%;}
  .loader-x img {width:43%;}  
}
/* ---- End  Loader --------*/

</style>
