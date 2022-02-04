import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Blankspace from '@/components/Blankspace/Blankspace'

Vue.use(Router)

export default new Router({
  routes: [
  
    //Blankspace main page
    {
      path: '/',
      name: 'Blankspace',
      component: Blankspace
    },
	
	
    {
      path: '/example',
      name: 'HelloWorld',
      component: HelloWorld
    },
	
	//if not found 404
	{ path: "*", 
	  component: { template: '<p> </br> Page Not Found </p>'}, //PageNotFound 
	},
	
	
  ]
})
