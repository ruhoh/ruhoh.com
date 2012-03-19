// Table Of Contents
var Toc = {
  $container : null,
  $wrapper : null,

  init : function(container, wrapper){
    Toc.$container = $(container);
    Toc.$wrapper = $(wrapper);

    Toc.build();
    Toc.toggle();
    $(window).resize(function(){ Toc.toggle() })
  },

  build : function(){
    var h1 = [];
    var h2 = [];

    Toc.$wrapper.find("h1").each(function(){
      var h = {h1 : this, children : null }
      h.children = $(this).nextUntil("h1", "h2");
      h1.push(h);
    })

    var cache = '';
    h1.forEach(function(node){
      cache += '<h4><a href="#'+ node.h1.id + '">'+$(node.h1).text()+'</a></h4>';

      cache += "<ul>"
      node.children.each(function(){
        cache += '<li class="sub"><a href="#'+ this.id + '">'+ $(this).text() + '</a></li>';
      })
      cache += "</ul>";
    })

    Toc.$container.prepend(cache);
  },

  toggle :function(){
    if($(window).width() > 1000) Toc.$container.show();
    else Toc.$container.hide();
  }
}