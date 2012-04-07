// Table Of Contents
var Toc = {
  $container : null,
  $wrapper : null,

  init : function(container, wrapper){
    Toc.$container = $(container);
    Toc.$wrapper = $(wrapper);

    Toc.build();
    
    Toc.$container.find("button").click(function(){
      Toc.$container.find('.toc-container').toggle();
    })
    
    Toc.$container.find('.toc-container').find('a').live('click', function(e){
      Toc.$container.find('.toc-container').toggle();
      var top = $($(this).attr("href")).offset().top - 60;
      $('html, body').scrollTop(top);
      e.preventDefault();
      return false;
    })
  },

  build : function(){
    var h1 = [];
    var h2 = [];

    Toc.$wrapper.find("h1").each(function(){
      var h = {h1 : this, children : null }
      h.children = $(this).nextUntil("h1", "h2");
      h1.push(h);
    })

    var half = Math.floor(h1.length / 2);
    var cache = '<div class="pane">';
    for(var i=0, len=h1.length; i < len; i++){
      cache += '<h4><a href="#'+ h1[i].h1.id + '">'+$(h1[i].h1).text()+'</a></h4>';
      cache += "<ul>"
      h1[i].children.each(function(){
        cache += '<li class="sub"><a href="#'+ this.id + '">'+ $(this).text() + '</a></li>';
      })
      cache += "</ul>";
      if(i === half) cache += '</div><div class="pane">';
    }
    cache += '</div>';

    Toc.$container.find('.toc-container').prepend(cache);
  }

}
// Personalize install code. 
// Make sure to update this whenever landing page changes to ensure proper id values.
var Pc = {
  init : function(){
    var $code = $("#install-code-wrapper").find("span.typ");
    var $repoName = $("#repo_name");
    var $blogLink = $("#blog_link");
    $("#generate_code").submit(function(e){
      var username = $("#github_username").val();
      $code.text(username);
      $repoName.val( username + ".ruhoh.com");
      $blogLink.text("http://" + username + ".ruhoh.com").attr("href", "http://" + username + ".github.com");
      if ($.trim(username) !== ""){ 
        //if (typeof mpq !== 'undefined') mpq.track("install", {"username": username });
        //if (typeof _gaq !== 'undefined') _gaq.push(['_trackEvent', 'Forms', 'Input', username]);
      }  
      e.preventDefault();
      return false;
    })
  }
}