// Table Of Contents
var TocNew = {
  $container : null,
  $wrapper : null,

  init : function(container, wrapper, active){
    this.$container = $(container);
    this.$wrapper = $(wrapper);
    this.$active = $("#outline-pane");
    this.build();
  },

  build : function(){
    var h1 = [];
    var h2 = [];

    this.$wrapper.find("h1").each(function(){
      var h = {h1 : this, children : null }
      h.children = $(this).nextUntil("h1", "h2");
      h1.push(h);
    })
    var cache = "<ul class='nest'>";
    h1.forEach(function(node){
      cache += '<li><strong><a href="#'+ node.h1.id + '">'+$(node.h1).text()+'</a></strong></li>';

      node.children.each(function(){
        cache += '<li class="sub"><a href="#'+ this.id + '">'+ $(this).text() + '</a></li>';
      })
    })
    cache += "</ul>";

    this.$active.append(cache);
  },

  toggle :function(){
    if($(window).width() > 1000) this.$container.css({'position' :'fixed'});
    else this.$container.css({'position': 'relative'});
  }
}