'use strict';

export class CarouselController {

  public static $inject = [
    '$timeout',
    '$attrs',
    '$mdCompiler'
  ];

  private data: any[];
  private cloneData: any[];
  private element: any;
  private elementWidth: number;
  private slidesContainer: any;
  private currentIndex: number = 0;
  private currentMarginLeftValue: number = 0;
  private radioButtonIndex: number = 0;

  constructor(private $timeout: any, private $attrs: any, private $mdCompiler: any) {
    this.$attrs.$observe('data', () => {
      this.onDataChange();
    });
  }

  registerElement(element: any) {
    this.element = element;
    this.slidesContainer = angular.element(this.element.find('div')[0]);
    console.log('registerElement...', this.slidesContainer);
  }

  resetSlidesContainerToDefaultPosition() {
    if (!this.elementWidth) {
      return;
    }
    this.disableTransitions();
    this.currentMarginLeftValue = this.elementWidth * -1;
    this.applyMarginLeft();
    this.currentIndex = 0;
    this.radioButtonIndex = this.currentIndex;
    this.enableTransitions();
  }

  onDataChange() {
    if (this.isDataInvalidOrTooSmall()) {
      return;
    }
    console.log('onDataChange...');
    this.executeCloneData();
    this.$timeout(() => {
      this.updateSlidesContainerWidth();
      this.resetSlidesContainerToDefaultPosition();
    });
  }

  executeCloneData() {
    let cloneArray = [];
    for (var index = 0; index < this.data.length; index++) {
      let item = this.data[index];
      cloneArray.push(item);
    }
    this.cloneFirstItem(cloneArray);
    this.cloneLastItem(cloneArray);
    this.cloneData = cloneArray;
  }

  cloneFirstItem(cloneArray) {
    let firstItem = cloneArray[0];
    let firstItemClone = angular.copy(firstItem);
    cloneArray.push(firstItemClone);
  }

  cloneLastItem(cloneArray) {
    let lastItem = cloneArray[this.data.length - 1];
    let lastItemClone = angular.copy(lastItem);
    cloneArray.unshift(lastItemClone);
  }

  updateSlidesContainerWidth() {
    this.elementWidth = this.element.prop('offsetWidth');
    this.slidesContainer.css('width', (this.elementWidth * this.cloneData.length) + 'px');
  }

  navigateLeft() {
    if (this.isDataInvalidOrTooSmall()) {
      return;
    }
    this.currentIndex--;
    this.radioButtonIndex = this.currentIndex;
    this.currentMarginLeftValue += this.elementWidth;
    this.applyMarginLeft();
    if (this.currentIndex === -1) {
      this.restartFromLastItem();
    }
  }

  restartFromLastItem() {
    this.$timeout(() => {
      this.disableTransitions();
      this.currentMarginLeftValue = (this.elementWidth * this.data.length) * -1;
      this.applyMarginLeft();
      this.currentIndex = this.data.length - 1;
      this.radioButtonIndex = this.currentIndex;
      this.enableTransitions();
    }, 500);
  }

  navigateRight() {
    if (this.isDataInvalidOrTooSmall()) {
      return;
    }
    this.currentIndex++;
    this.radioButtonIndex = this.currentIndex;
    this.currentMarginLeftValue -= this.elementWidth;
    this.applyMarginLeft();
    if (this.currentIndex === this.data.length) {
      this.$timeout(() => {
        this.resetSlidesContainerToDefaultPosition();
      }, 500);
      return;
    }
  }

  applyMarginLeft() {
    this.slidesContainer.css('margin-left', this.currentMarginLeftValue + 'px');
  }

  disableTransitions() {
    this.slidesContainer.css('transition', 'none');
  }

  enableTransitions() {
    this.$timeout(() => {
      this.slidesContainer.css('transition', 'margin 0.5s ease-in-out');
    }, 200);
  }

  onRadioButtonClick() {
    let multiplier;
    if (this.radioButtonIndex > this.currentIndex) {
      multiplier = this.radioButtonIndex - this.currentIndex;
      this.currentMarginLeftValue -= (this.elementWidth * multiplier);
    } else {
      multiplier = this.currentIndex - this.radioButtonIndex;
      this.currentMarginLeftValue += (this.elementWidth * multiplier);
    }
    this.currentIndex = this.radioButtonIndex;
    this.applyMarginLeft();
  }

  isDataInvalidOrTooSmall() {
    if (!this.data || this.data.length === 0 || this.data.length === 1) {
      return true;
    }
    return false;
  }

}
