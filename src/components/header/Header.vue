<template lang='pug'>
	div
		v-navigation-drawer(v-model="drawer" app clipped )
			v-list.internal-drawer-container.listing-listy.list(dense)
				v-divider
				NavMenuItem(v-for="(route, index) in routes" :key="index" :route="route")
			div.find-me
				v-switch(
					v-model="isDarkMode"
					@change="saveDarkModeSetting"
					label='Dark Mode'
					hide-details
				)
		v-app-bar.app-bar-modified-height(app clipped-left)
			v-app-bar-nav-icon(@click.stop="drawer = !drawer")
			v-toolbar-title.full-width
				v-row(justify='space-between' align='baseline')
					v-col
					v-col.flex-end(cols='2') 
</template>

<script>
import NavMenuItem from '@/components/header/NavMenuItem.vue'
import { routes } from '@/router/routes'
export default {
	components: {
		NavMenuItem,
	},
	data() {
		return {
			routes,
			drawer: false,
			isDarkMode: false,
		}
	},
	computed: {
		isMobile(){
			return window.innerWidth < 1264
		},
		menuActivatorClassName(){
			return this.drawer
				? 'menu-open'
				: ''
		},
		menuActivatorIconName(){
			return this.drawer
				? 'mdi-close'
				: 'mdi-chevron-right'
		}
	},
	methods: {
		saveDarkModeSetting() {
			window.localStorage.setItem( 'darkMode', JSON.stringify({ darkMode: !this.darkMode }))
			this.$vuetify.theme.dark = this.isDarkMode
		},
	},
	mounted() {
		try {
			const isDarkMode = JSON.parse(window.localStorage.getItem('darkMode')).darkMode
			this.isDarkMode = isDarkMode
			this.$vuetify.theme.dark = isDarkMode
		} catch (error) {
			// setting it to true if not previusly set
			this.$vuetify.theme.dark = true
		}
	}
}
</script>

<style lang='sass'>
	.app-bar-modified-height
		height: 45px !important
		& div
			height: 45px !important
	.menu-open
		top: 8px !important
		left: 200px !important
	.menu-toggle
		transition: all 0.25s
		color: white
		position: fixed
		top: 20px
		left: 7px
		font-size: 50px
		z-index: 100
		background-color: rgba(52, 52, 52, 0.53)
		border-radius: 2px
		height: 30px
		width: 30px
		display: flex
		justify-content: center
		align-items: center
	.find-me
		height: 40px
		width: 130px
		position: absolute
		bottom: 15%
		right: 4%
		@media screen and (min-width: 786px)
			bottom: 5%
			right: 4%
	.internal-drawer-container
		height: 100%
	#menu-badge
		left: -1px !important
		top: 1px !important
</style>