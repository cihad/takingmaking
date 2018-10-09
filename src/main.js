import Vue from 'vue'
import TakingMaking from './classes/TakingMaking'

Vue.config.productionTip = false

window.TakingMaking = TakingMaking;

var tm = new TakingMaking({
  selector: "#app",
  output: "#output" 
})

tm.changed(function(blocks) {
  console.log('changed//////');
})