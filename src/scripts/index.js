require('style!css!normalize.css/normalize.css');
require('style!css!sass!../styles/main.scss');
// require('style!css!sass!./style.scss');

var $ = window.$ = require('jquery');
var Masonry = require('masonry-layout/dist/masonry.pkgd.js');
var GallerySlider = require('./GallerySlider.js');

$(document).ready(function() {
  var gallerySliders = [];
  // console.log($('.projects')[0]);
  var grid = document.querySelector('.projects')

  // var msnry = new Masonry(grid, {
  //   itemSelector: '.project',
  //   columnWidth: 100,
  //   gutter: 20,
  // });

  $('.project-gallery').each(function(i, el) {
    var slider = new GallerySlider(el);
    gallerySliders.push(slider);
  });

});
