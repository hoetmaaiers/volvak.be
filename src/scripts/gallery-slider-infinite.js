import _ from 'lodash';


export default class GallerySlider {
  constructor (element) {
    this.nextIndex = 1;
    this.$element  = $(element);
    this.items     = this.$element.find('.project-gallery-list-item').map(function(i, item) {
      return $(item).css('background-image')
    })

    // start event listeners
    this._startEventListeners();

    // hide original items
    this.$element.find('ul').css('visibility', 'hidden');

    // add infinite container
    this.$infiniteElement = $('<ul class="project-gallery-list -infinite"></ul>');
    this.$infiniteElement.prependTo(this.$element);

    // add current and next
    $(this._getItem(this.items[0], ['-current'])).appendTo(this.$infiniteElement);

    $(this._getItem(this.items[1], ['-next'])).appendTo(this.$infiniteElement);
  }

  goToNextItem() {
    // make current -> previous and remove after transition
    this.$infiniteElement.find('.-current').removeClass('-current').addClass('-previous').on('transitionend webkittransitionend otransitionend', (event) => {
      $(event.currentTarget).remove();
    });

    // make next -> current
    this.$infiniteElement.find('.-next').removeClass('-next').addClass('-current');
    // add new next
    $(this._getNextItem()).appendTo(this.$infiniteElement);
  }

  /**
   * @param imageUrl {string}
   * @param classes {array}
   */
  _getItem(imageUrl, classes) {
    return `<li class="project-gallery-list-item ${classes.join(' ')}" style="background-image: ${imageUrl}"></li>`;
  }


  _getNextItem() {
    this.nextIndex += 1;

    if (this.nextIndex > this.items.length - 1) {
      this.nextIndex = 0;
    }

    return this._getItem(this.items[this.nextIndex], ['-next']);
  }

  _startEventListeners() {
    if (this.items.length === 1) return;

    let stamp = 0;

    this.$element.on('click', () => {
      let clickStamp = Date.now();

      if ((clickStamp - stamp) > 500) {
        this.goToNextItem();
        stamp = clickStamp;
      }

    })
  }

}
