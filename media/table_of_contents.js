// Table Of Contents
var Toc = {
  $container : null,
  $wrapper : null,

  init : function(container, wrapper){
    Toc.$container = $(container);
    Toc.$wrapper = $(wrapper);

    Toc.buildFull();
    
    // Toc.$container.find('ul.nav-pills').find('a').live('click', function(e){
    //   var top = $($(this).attr("href")).offset().top - 100;
    //   $('html, body').scrollTop(top);
    //   e.preventDefault();
    //   return false;
    // })
  },

  // just the H1s
  build : function(){
    var h1 = [];
    Toc.$wrapper.find("h1").each(function(){
      h1.push({h1 : this, children : null });
    })
    
    var cache = '';
    for(var i=0, len=h1.length; i < len; i++){
      cache += '<li >';
        cache += '<a href="#'+ h1[i].h1.id +'">'+$(h1[i].h1).text()+'</a>';
      cache += '</li>';
    }
    Toc.$container.find('ul.nav').prepend(cache)
  },
  
  // H1s and H2s
  buildFull : function(){
    var h1 = [];
    var h2 = [];

    Toc.$wrapper.find("h1").each(function(){
      var h = {h1 : this, children : null }
      h.children = $(this).nextUntil("h1", "h2");
      h1.push(h);
    })
    
    var cache = '';
    for(var i=0, len=h1.length; i < len; i++){
      cache += '<li class="dropdown">';
        cache += '<a class="dropdown-toggle" data-toggle="dropdown" href="#">'+$(h1[i].h1).text()+' <b class="caret"></b></a>';
        cache += '<ul class="dropdown-menu">';
        h1[i].children.each(function(){
          cache += '<li><a href="#'+ this.id + '">'+ $(this).text() + '</a></li>';
        })
        cache += '</ul>';
      cache += '</li>';
    }
    Toc.$container.find('ul.nav').prepend(cache)
    
    var cache = '';
    for(var i=0, len=h1.length; i < len; i++){
      cache += '<li>';
        cache += '<a href="#'+ h1[i].h1.id + '">'+$(h1[i].h1).text()+'</a>';
        cache += '<ul>';
        h1[i].children.each(function(){
          cache += '<li><a href="#'+ this.id + '">'+ $(this).text() + '</a></li>';
        })
        cache += '</ul>';
      cache += '</li>';
    }
    
    $("#main-content").prepend($("<ul class='edge-table-of-contents'></ul>").prepend(cache));
  }

}