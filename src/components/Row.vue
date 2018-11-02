<template>
	<div class="row">
		<div v-for="col in columns">
			<div :class="'col-' + col.colSize">
          
      </div>
		</div>
	</div>
</template>

<script>
export default {

}
</script>

<style></style>


<div class="container">

  <div class="row">
    <div class="col-6"></div>
    <div class="col-6"></div>
  </div>
  
  <div class="row">
    <div class="col-4"></div>
    <div class="col-4"></div>
    <div class="col-4"></div>
  </div>



</div>