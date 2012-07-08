// Personalize install code. 
// Make sure to update this whenever landing page changes to ensure proper id values.
var Pc = {
  init : function(){
    var $code = $("#install-code-wrapper").find("span.typ");
    var $repoName = $("#repo_name");
    var $blogLink = $("#blog_link");
    var $blogLogLink = $("#blog_log_link");
    $("#generate_code").submit(function(e){
      var username = $("#github_username").val();
      $code.text(username);
      $repoName.val( username + ".ruhoh.com");
      var link = "http://" + username + ".ruhoh.com";
      $blogLink.text(link).attr("href", link);
      $blogLogLink.attr("href", link + '/log.txt');
      if ($.trim(username) !== ""){ 
        //if (typeof mpq !== 'undefined') mpq.track("install", {"username": username });
      }  
      e.preventDefault();
      return false;
    })
  }
}