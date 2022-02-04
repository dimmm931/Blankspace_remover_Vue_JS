<!-- This all below code used to be inside Blankspace.vue as sub-component. Outlined here (to subcomponent) to make code more clear -->
<template>
  <transition name="bounce">  <!--- Animation wrapper ------>  
    <div v-if="this.cssVisibilityFlag" class="col-md-8 jumbotron"  id="hiddenInstructions" style="margin-top:2%;"> 
	
	    <!-- INSTRUCTIONS -->
        <p>
            </br>How to remove punctuantion errors in the text:
            </br>1.Paste the text you'd like to fix.
            </br>2.Click "Run a check" button and get corrected text.
            </br>3.Click "Copy" button to copy corrected text.
            </br>4.Click <span style="color:red;">"Show detailed error list" </span> to see errors summary or click <span style="color:red;"> "Show highlighted errors" </span> to view hightlighted errors in original text.
            </br>
            </br>This application checks text for commom punctuantion errors; performs a check, finds, highlights and fixes all double blankspaces, blankspace + comma, blankspace + full stop.
            </br></br>Additionally, it fixes consecutive duplicates, double commas, double dots, cases when word is preceeded by comma without no space and more, see full list below.
			</br> Spell check is also available on request (Typo-Js library)
            </br>List:
            </br>1.Double blankspaces.
            </br>2.Character followed by comma with space (i.e "word ,")
            </br>3.Character followed by dot with space (i.e  "word .")
            </br>4.Consecutive duplicates (i.e "to to")
            </br>5.Accidentally placed two repetitive commas (i.e  ",,")
            </br>6.Accidentally placed two repetitive dots (i.e  "..")
            </br>7.Character preceeded by comma without space (i.e ",word") - > <span style="color:red;"> being implemented </span>
            </br>8.Character preceeded by dot without space (i.e ".word") - > <span style="color:red;"> being implemented</span>
            </br>9.Removes underscore (if you tick "Check underscore" checkbox on). Useful for misplaced add pins
			</br>10. Adds Support footer to the text (if you tick "Support footer" checkbox on)
			</br>10. Check for some waze specifics, e.g Pls know /Help center (if you tick "Waze specific" checkbox on). Notifications only.
			</br>11. Separate spell check by Typo-JS, use button "Typo-Js Spell check"
            <!--</br>10.Pls know /Help center - > <span style="color:red;"> notifications only</span>-->
            <!--</br>11.Double paragraphs - > <span style="color:red;"> being implemented</span>-->
            <!--</br>9.Missing dot in the end of the sentence - > <span style="color:red;"> being implemented</span>-->
            <!--</br></br><i>Note: numbered and bulleted list option and other inner GCases formats will not be saved.</i></br></p>-->
            <!--END  INSTRUCTIONS-->
        </p>
	 </div>
  </transition> 
</template>


<script>
export default {
    name: 'Instructions',
    props: ['cssVisibilityFlag', ], //props sent from parent
    data () { return { 
    }},
    computed: {
    },
    methods: {
    },
} 
</script>

<style scoped>
</style>