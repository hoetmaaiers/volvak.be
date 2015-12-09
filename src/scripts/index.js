require('style!css!normalize.css/normalize.css');
require('style!css!sass!../styles/main.scss');
// require('style!css!sass!./style.scss');

var $ = window.$ = require('jquery');
var Masonry = require('masonry-layout/dist/masonry.pkgd.js');
// var GallerySlider = require('./gallery-slider-infinite.js');
import GallerySlider from './gallery-slider-infinite.js'

$(document).ready(function() {
  resizeProjects();

  var gallerySliders = [];

  $('.project-gallery').each(function(i, el) {
    var slider = new GallerySlider(el);
    gallerySliders.push(slider);
  });

  // toggle logo href handle
  $('.main-logo').on('click', navigate);
});

$(window).resize(function() {
  resizeProjects();
})

function resizeProjects() {
  $('.project').each(function(i, element) {
    var $element = $(element);
    var factor = $element.width() / $element.data('width');
    $element.css('height', $element.data('height') * factor);
  })
}

function navigate(e) {
  e.preventDefault();

  if (/\/contact\.html/.test(window.location.pathname)) {
    // redirect to index
    window.location = "index.html"
  } else {
    // redirect to contact
    window.location = "contact.html"
  }

}
