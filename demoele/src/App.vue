<template>
    <div class="app">
    	 <vheader :seller="seller"></vheader>
    	 <vtab></vtab>
    	 <keep-alive>
    	 <router-view :seller="seller"></router-view>
    	 </keep-alive>
    </div>
</template>

<script>
import vheader from './pages/header/header'
import vtab from './pages/tab/tab'
import axios from 'axios'

export default {
	components: {
		vheader,
		vtab
	},
	data() {
		return{
			seller:{}
		}
	},
	created() {
		axios.get('static/data.json').then((res) => {
			this.seller = res.data.seller
		
		})
	}
}
</script>

<style>

 
  
  
 

</style>
