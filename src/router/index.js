import Vue from 'vue'
import VueRouter from 'vue-router'

// const isRunningLocally = process.env.NODE_ENV !== 'production'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
	},
	{
		path: '/visualization',
		name: 'Visualization',
		component: () => import('@/views/visualizations/VisualizationRoot.vue'),
		children: [
			{
				path: 'quick-sort',
				name: 'QuickSort',
				component: () => import('@/views/visualizations/QuickSort.vue'),
			},
			{
				path: 'merge-sort',
				name: 'MergeSort',
				component: () => import('@/views/visualizations/MergeSort.vue'),
			}
		]
	}
]

export default new VueRouter({
	mode: 'history',
	routes
})
