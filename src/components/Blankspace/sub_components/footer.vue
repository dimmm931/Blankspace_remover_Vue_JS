<!-- This all below code used to be inside Blankspace.vue as sub-component. Outlined here (to subcomponent) to make code more clear -->
<template>
	<div class="footer">
		Contact: <strong>dimmm931@gmail.com</strong></br>
		{{ new Date().getFullYear() }}
	    <!-- <?php  echo date("Y"); ?>-->
    </div>
</template>

<script>
export default {
    name: 'Footer',
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