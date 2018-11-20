import Vue from 'vue'
import uniqKey from '@/utils/uniqKey'
import TakingMaking from '@/classes/TakingMaking'

Vue.mixin({
  methods: { uniqKey }
})

Vue.config.productionTip = false

window.TakingMaking = TakingMaking;

var tm = new TakingMaking({
  selector: "#app",
  output: "#output" 
})

tm.changed(function() {
  console.log('changed//////');
})