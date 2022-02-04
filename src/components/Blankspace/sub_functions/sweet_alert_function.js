//This file used in Blankspace.vue as an external functions (and passed to sub-function).
//Contains functions to call Sweet Alert 2 messages and Toasts

export const sweet_alert_externalFile = {


    /*
    |--------------------------------------------------------------------------
	| Function to call Sweet_Alert 2 Alert. Not used so far
	| @param that is passed {this} context. E.g can be called from  (from /sub_functions/core_doubleSpace_remover_check.js)
	| @param string customMessage
    |--------------------------------------------------------------------------
    |
    |
    */
	/*
	callSweetAlert2_Alert: function(that, customMessage){
		//VUE Sweet alert 2
        that.$swal.fire({  //or this.$swal  or Vue.swal
                html:true, 
                title: customMessage,
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
	},
	*/
	
	
	
	

    /*
    |--------------------------------------------------------------------------
	| Function to call Sweet Alert 2 Toasts 
	| @param that is passed {this} context. E.g can be called from (from /sub_functions/typo_js_spell_check.js)
	| @param string customMessage
    |--------------------------------------------------------------------------
    |
    |
    */

	callSweetAlert2_Toast: function(that,customMessage){
		
	    //Vue_Sweet alert 2 Toast -----
        let Toast = that.$swal.mixin({
            toast: true,
            position: 'fixed', //'top-end',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', that.$swal.stopTimer)   //anemdments for Vue SweetAlerts
                toast.addEventListener('mouseleave', that.$swal.resumeTimer) //anemdments for Vue SweetAlerts
            }
        });
		
        //Fire the toast
        Toast.fire({
            icon: 'success',
            title: customMessage
        }); 
	 
	},
			
};