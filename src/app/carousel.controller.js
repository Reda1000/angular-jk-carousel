(function() {
  'use strict';

  function CarouselController($timeout, $attrs, $interval) {

    var that = this;
    that.currentIndex = 0;
    that.currentMarginLeftValue = 0;
    that.radioButtonIndex = 0;
    that.transitionsTime = 500;
    that.transitionsEnabled = true;

    if (that.autoSlide === undefined) {
      that.autoSlide = false;
    }

    if (that.autoSlideTime === undefined) {
      that.autoSlideTime = 5000;
    }

    that.registerElement = function(element) {
      that.element = element;
      that.slidesContainer = angular.element(that.element.find('div')[0]);
    };

    $attrs.$observe('data', function() {
      that.onDataChange();
    });

    $attrs.$observe('autoSlide', function() {
      that.autoSlide = that.autoSlide === 'true';
      that.validateAutoSlide();
    });

    $attrs.$observe('autoSlideTime', function() {
      that.autoSlideTime = parseInt(that.autoSlideTime);
      that.restartAutoSlide();
    });

    that.onDataChange = function() {
      if (that.isDataInvalidOrTooSmall()) {
        return;
      }
      that.executeCloneData();
      $timeout(function() {
        that.updateSlidesContainerWidth();
        that.restartFromFirstItem();
      });
    };

    that.updateSlidesContainerWidth = function() {
      that.elementWidth = that.element.prop('offsetWidth');
      that.slidesContainer.css('width', (that.elementWidth * that.cloneData.length) + 'px');
    };

    that.restartFromFirstItem = function() {
      if (!that.elementWidth) {
        return;
      }
      that.disableTransitions();
      that.currentMarginLeftValue = that.elementWidth * -1;
      that.applyMarginLeft();
      that.currentIndex = 0;
      that.radioButtonIndex = that.currentIndex;
      that.enableTransitions();
    };

    that.executeCloneData = function() {
      var cloneArray = [];
      for (var index = 0; index < that.data.length; index++) {
        var item = that.data[index];
        cloneArray.push(item);
      }
      that.cloneFirstItem(cloneArray);
      that.cloneLastItem(cloneArray);
      that.cloneData = cloneArray;
    };

    that.cloneFirstItem = function(cloneArray) {
      var firstItem = cloneArray[0];
      var firstItemClone = angular.copy(firstItem);
      cloneArray.push(firstItemClone);
    };

    that.cloneLastItem = function(cloneArray) {
      var lastItem = cloneArray[that.data.length - 1];
      var lastItemClone = angular.copy(lastItem);
      cloneArray.unshift(lastItemClone);
    };

    that.validateAutoSlide = function() {
      if (!that.autoSlide) {
        that.stopAutoSlide();
      } else {
        that.startAutoSlide();
      }
    };

    that.restartAutoSlide = function() {
      if (!that.autoSlide) {
        return;
      }
      if (that.transitionsEnabled) {
        $timeout(function() {
          that.stopAutoSlide();
          that.startAutoSlide();
        }, that.transitionsTime);
      } else {
        that.stopAutoSlide();
        that.startAutoSlide();
      }
    };

    that.startAutoSlide = function() {
      if (!angular.isDefined(that.autoSlideInterval)) {
        that.autoSlideInterval = $interval(function() {
          that.navigateRight();
        }, that.autoSlideTime);
      }
    };

    that.stopAutoSlide = function() {
      if (angular.isDefined(that.autoSlideInterval)) {
        $interval.cancel(that.autoSlideInterval);
        that.autoSlideInterval = undefined;
      }
    };

    that.onNavigateLeft = function() {
      that.navigateLeft();
      that.restartAutoSlide();
    };

    that.navigateLeft = function() {
      if (that.isDataInvalidOrTooSmall()) {
        return;
      }
      that.currentIndex--;
      that.radioButtonIndex = that.currentIndex;
      that.currentMarginLeftValue += that.elementWidth;
      that.applyMarginLeft();
      that.restartAutoSlide();
      if (that.currentIndex === -1) {
        that.restartFromLastItem();
      }
    };

    that.restartFromLastItem = function() {
      $timeout(function() {
        that.disableTransitions();
        that.currentMarginLeftValue = (that.elementWidth * that.data.length) * -1;
        that.applyMarginLeft();
        that.currentIndex = that.data.length - 1;
        that.radioButtonIndex = that.currentIndex;
        that.enableTransitions();
      }, that.transitionsTime);
    };

    that.onNavigateRight = function() {
      that.navigateRight();
      that.restartAutoSlide();
    };

    that.navigateRight = function() {
      if (that.isDataInvalidOrTooSmall()) {
        return;
      }
      that.currentIndex++;
      that.radioButtonIndex = that.currentIndex;
      that.currentMarginLeftValue -= that.elementWidth;
      that.applyMarginLeft();
      that.restartAutoSlide();
      if (that.currentIndex === that.data.length) {
        $timeout(function() {
          that.restartFromFirstItem();
        }, that.transitionsTime);
      }
    };

    that.applyMarginLeft = function() {
      that.slidesContainer.css('margin-left', that.currentMarginLeftValue + 'px');
    };

    that.disableTransitions = function() {
      that.slidesContainer.css('transition', 'none');
      that.transitionsEnabled = false;
    };

    that.enableTransitions = function() {
      $timeout(function() {
        that.slidesContainer.css('transition', 'margin 0.5s ease-in-out');
        that.transitionsEnabled = true;
      }, 200);
    };

    that.onRadioButtonClick = function() {
      var multiplier;
      if (that.radioButtonIndex > that.currentIndex) {
        multiplier = that.radioButtonIndex - that.currentIndex;
        that.currentMarginLeftValue -= (that.elementWidth * multiplier);
      } else {
        multiplier = that.currentIndex - that.radioButtonIndex;
        that.currentMarginLeftValue += (that.elementWidth * multiplier);
      }
      that.currentIndex = that.radioButtonIndex;
      that.applyMarginLeft();
      that.restartAutoSlide();
    };

    that.isDataInvalidOrTooSmall = function() {
      if (!that.data || that.data.length === 0 || that.data.length === 1) {
        return true;
      }
      return false;
    };
  }

  angular
    .module('jkAngularCarousel')
    .controller('CarouselController', [
      '$timeout', '$attrs', '$interval',
      CarouselController
    ]);

}());
