/**
 * Created by adam1 on 4/3/14.
 */


$(document).ready(function(){

        jQuery("abbr.timeago").timeago();

    /*       change the main tweet compose box height and make controls hide/unhide       */

        $("#tweet-content > .tweet-compose").focus(function() {
           // $(this).parent().next().show;  other way to use


         if ($("#tweet-controls")){$("#tweet-controls").show();};
         $(this).height(93);
        });

        $("#tweet-content > .tweet-compose").focusout(function(){
            var tweet = $(" #tweet-content > .tweet-compose").val().length;
           // console.log(tweet);
           if( tweet <= 0) {

               $("#tweet-controls").css("display", "none");
               $(".tweet-compose").height(19);
           };
            /*     change box height for #stream tweets input boxes                           */
        });

        $(".reply > .tweet-compose").on("focus", function() {
            // $(this).parent().next().show;
           $(".reply > .tweet-compose").height(93);
        });

        $(".reply > .tweet-compose").on("focusout", this, function(){

            var tweet = $(".tweet-compose").val().length;


            if( tweet <= 0) {

                $(" .reply > .tweet-compose", this).height(19);}
        });



        /*   counter for characters changes to red if count is less than 10    */

        $(".tweet-compose").on("input" ,function(){
            var length = $(this).val().length;
            var count = 140 - length;
            $("#char-count").text(count);
             if (count <= 10) {
                 $("#char-count").css("color","red");
             }
             else {
                 $("#char-count").css("color","black");
             }

            /*   disable tweet button if tweet is over 140 or has 0 characters  */

             var tweet = $("#tweet-content > .tweet-compose").val().length;
             // console.log(tweet);
             if (tweet <= 140 && tweet > 0) {
                 $("#tweet-submit").removeAttr("disabled", false);
             }
             else {
                 $("#tweet-submit").attr("disabled", true);
             }

         });

          /*        add new tweet section       */



        $("#tweet-submit").click(function (){
            var tweettext = $(".tweet-compose").val();
            var newtweet = $("#stream .tweet ").first().clone();
            var timestamp = jQuery.timeago(new Date());

            $(".tweet-compose").val("");

            $(newtweet).find("p").first().text(tweettext);
            $(newtweet).find("abbr").first().text(timestamp);

            $("#stream").prepend(newtweet);


        });

        //   hide the reply and stats sections of a tweet

        $("#stream").on("click", '.tweet',  function(event) {  //  use a second parameter in the on() function to specify the context  the first selector is the parent of .tweet class.
           var editorbox = $(event.target).hasClass("tweet-compose")
            if (editorbox == false ) {       //  .tweet-compose

            $(".reply", this).slideToggle();
            $(".stats", this).slideToggle();
            }

//            if ($(event.target).hasClass(".tweet-compose")) {
//                  $(".reply", this).show();                             //
//                  $(".stats", this).show();
//           }

        });


        
            /*     make tweet tools appear/ disappear      */

       $("#stream").on("mouseenter", '.tweet', function() {
           // alert("hi");
            $(".tweet-actions", this).show();          

       });
        $("#stream").on("mouseleave", '.tweet', function() {
        
            $(".tweet-actions", this).hide();          

        });




});





