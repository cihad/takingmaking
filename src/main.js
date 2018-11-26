import Vue from 'vue'
import uniqKey from '@/mixins/uniqKey'
import TakingMaking from '@/classes/TakingMaking'

Vue.mixin({
  methods: { uniqKey }
})

Vue.config.productionTip = false

var tm = new TakingMaking({
  selector: "#app",
  output: "#output" 
})

tm.changed(function() {
  console.log('changed//////');
})

// window.TakingMaking = TakingMaking;
export default TakingMaking