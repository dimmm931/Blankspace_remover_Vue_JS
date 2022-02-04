//this file is used in Blankspace.vue as an external functions

export const copyExternalFunction = {

    /*
    |--------------------------------------------------------------------------
    | Copy Text To ClipBoard
	| @param that is passed {this} context (from /Blankspace/Blankspace.vue)
    |--------------------------------------------------------------------------
    |
    |
    */

	copyTextToClipBoard: function(that){
	    that.copiedFlag  = !that.copiedFlag; //switch state to change btn text.
        // creating new textarea element and giveing it id 't'
        let t = document.createElement('textarea');
        t.id = 't';
        // Optional step to make less noise in the page, if any!
        t.style.height = 0;
        // You have to append it to your page somewhere, I chose <body>
        document.body.appendChild(t);
        // Copy whatever is in your div to our new textarea
        t.value = document.getElementById('fixedText').innerText;
        // Now copy whatever inside the textarea to clipboard;
        let selector = document.querySelector('#t');
        selector.select();
        document.execCommand('copy');
        // Remove the textarea;
        document.body.removeChild(t);	
	},
			
};