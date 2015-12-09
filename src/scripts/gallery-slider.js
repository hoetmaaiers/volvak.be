export default function GallerySlider(element) {

  this.activeItem  = 0;
  this.$element    = $(element);
  this.itemsLength = this.$element.find('.project-gallery-list-item').length
  this.height      = this.$element.height();

  // public function API
  this.goToNextItem = goToNextItem;
  this.goToItem = goToItem;

  init.bind(this)();
  //////////////////////////////////////////////////////////////////////////////

  function init() {
    /**
     * Event listeners
     */
    this.$element.on('click', function() {
      this.goToNextItem()
    }.bind(this))

    // on window resize, ensure translateY stays correct
    $(window).resize(function() {
      this.goToItem(this.activeItem);
    }.bind(this))
  }


  function goToNextItem() {
    if (this.activeItem >= this.itemsLength - 1) {
      // go to first item
      this.activeItem = 0;
    } else {
      // go to next item
      this.activeItem = this.activeItem + 1;
    }

    this.goToItem(this.activeItem);
  }


  function goToItem(index) {
    let list = this.$element.find('.project-gallery-list'),
        translationY = this.$element.height() * index;
        
    list.css('transform', 'translateY(-' + translationY  + 'px)');
  }
}
