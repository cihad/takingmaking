export default function( el, binding, vnode ) {
  var config = {};
  var vm = vnode.context,
      sortable = null;

  config.beforeStop = function( e, ui ) {
    var array = vm[ binding.arg ],
        newIndex = ui.item.index(),
        oldIndex = ui.item[0].__vue__.$vnode.key,
        target = array[ oldIndex ];
    // array.$remove( target );
    array.splice( oldIndex, 1 );
    array.splice( newIndex, 0, target );
    vm.$emit( "sort", target, oldIndex, newIndex );
  };

  sortable = $(el).sortable( config );

  vm.$watch('isSortable', function(isSortable) {
    if (isSortable) {
      sortable.sortable( 'enable' );
    } else {
      sortable.sortable( 'disable' );
    }
  })
}