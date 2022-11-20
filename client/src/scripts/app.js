/**
 * File name: app.js
 */

$(function() {
  console.log( "App Started..." );

  if($('#typed').length){
    var options = {
      strings: [".", "Multi Angular."],
      typeSpeed: 30,
      backDelay: 2000,
      backSpeed: 30,
      loop: true
    };

    var typed = new Typed('#typed', options);
  }
});
