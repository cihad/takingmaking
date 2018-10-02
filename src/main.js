import Vue from 'vue'
import TakingMaking from './classes/TakingMaking'

window.TakingMaking = TakingMaking;

Vue.config.productionTip = false

var tm = new TakingMaking({
  selector: "#app",
  output: "#output"
})

tm.changed(function(blocks) {
  console.log('changed//////');
})