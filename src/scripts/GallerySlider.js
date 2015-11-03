// export default 123;
// import default as $ from 'jquery';
// var $ = require('jquery');

export default function GallerySlider(element) {

  this.activeItem  = 0;
  this.$element    = $(element);
  this.itemsLength = this.$element.find('.project-gallery-list-item').length
  this.height      = this.$element.height();


  this.$element.on('click', function() {
    this.goToNextItem()
  }.bind(this))


  this.goToNextItem = function() {
    if (this.activeItem >= this.itemsLength - 1) {
      // go to first item
      this.activeItem = 0;
    } else {
      // go to next item
      this.activeItem = this.activeItem + 1;
    }

    this.goToItem(this.activeItem);
  }

  this.goToItem = function(index) {
    var list = this.$element.find('.project-gallery-list');
    var translationY = this.height * index;
    list.css('transform', 'translateY(-' + translationY  + 'px)');
  }
}
