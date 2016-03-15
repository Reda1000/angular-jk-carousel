(function() {
  'use strict';

  angular.module('jkAngularCarousel', [
    'jkAngularCarousel.templates'
  ]);
}());

(function() {
  'use strict';

  function CarouselController($timeout, $attrs) {

    var that = this;
    that.currentIndex = 0;
    that.currentMarginLeftValue = 0;
    that.radioButtonIndex = 0;
    $attrs.$observe('data', function() {
      that.onDataChange();
    });

    that.registerElement = function(element) {
      that.element = element;
      that.slidesContainer = angular.element(that.element.find('div')[0]);
    };

    that.resetSlidesContainerToDefaultPosition = function() {
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

    that.onDataChange = function() {
      if (that.isDataInvalidOrTooSmall()) {
        return;
      }
      that.executeCloneData();
      $timeout(function() {
        that.updateSlidesContainerWidth();
        that.resetSlidesContainerToDefaultPosition();
      });
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

    that.updateSlidesContainerWidth = function() {
      that.elementWidth = that.element.prop('offsetWidth');
      that.slidesContainer.css('width', (that.elementWidth * that.cloneData.length) + 'px');
    };

    that.navigateLeft = function() {
      if (that.isDataInvalidOrTooSmall()) {
        return;
      }
      that.currentIndex--;
      that.radioButtonIndex = that.currentIndex;
      that.currentMarginLeftValue += that.elementWidth;
      that.applyMarginLeft();
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
      }, 500);
    };

    that.navigateRight = function() {
      if (that.isDataInvalidOrTooSmall()) {
        return;
      }
      that.currentIndex++;
      that.radioButtonIndex = that.currentIndex;
      that.currentMarginLeftValue -= that.elementWidth;
      that.applyMarginLeft();
      if (that.currentIndex === that.data.length) {
        $timeout(function() {
          that.resetSlidesContainerToDefaultPosition();
        }, 500);
      }
    };

    that.applyMarginLeft = function() {
      that.slidesContainer.css('margin-left', that.currentMarginLeftValue + 'px');
    };

    that.disableTransitions = function() {
      that.slidesContainer.css('transition', 'none');
    };

    that.enableTransitions = function() {
      $timeout(function() {
        that.slidesContainer.css('transition', 'margin 0.5s ease-in-out');
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
      '$timeout', '$attrs',
      CarouselController
    ]);

}());

(function() {

  'use strict';

  function CarouselDirective() {

    function link(scope, element, attrs, ctrl) {
      ctrl.registerElement(element);
    }

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'carousel-directive.html',
      scope: {},
      controller: 'CarouselController',
      controllerAs: 'ctrl',
      bindToController: {
        data: '=',
        itemTemplateUrl: '='
      },
      link: link
    };
  }

  angular
    .module('jkAngularCarousel')
    .directive('jkCarousel', [
    CarouselDirective
  ]);

} ());

(function(){angular.module("jkAngularCarousel.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("carousel-directive.html","<div class=\"jk-carousel\" >\n\n  <div class=\"slides-container\" layout=\"row\" >\n    <div\n      ng-repeat=\"item in ctrl.cloneData\"\n      class=\"slide\"\n    >\n      <div ng-include=\"ctrl.itemTemplateUrl\" ></div>\n    </div>\n  </div>\n\n  <md-button class=\"md-icon-button left-arrow-button\" >\n    <md-icon ng-click=\"ctrl.navigateLeft()\" >chevron_left</md-icon>\n  </md-button>\n\n  <md-button class=\"md-icon-button right-arrow-button\" >\n    <md-icon ng-click=\"ctrl.navigateRight()\" >chevron_right</md-icon>\n  </md-button>\n\n  <md-radio-group\n    class=\"radio-buttons-container\"\n    layout=\"row\"\n    ng-model=\"ctrl.radioButtonIndex\"\n    layout-align=\"center center\"\n    ng-change=\"ctrl.onRadioButtonClick()\" >\n    <md-radio-button\n      ng-repeat=\"item in ctrl.data\"\n      ng-value=\"$index\"\n      aria-label=\"$index\" >\n    </md-radio-button>\n  </md-radio-group>\n\n</div>\n");}]);})();