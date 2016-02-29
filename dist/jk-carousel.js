System.registerDynamic("templates", [], false, function(__require, __exports, __module) {
  var _retrieveGlobal = System.get("@@global-helpers").prepareGlobal(__module.id, null, null);
  (function() {
    (function() {
      angular.module("jkCarousel.templates", []).run(["$templateCache", function($templateCache) {
        $templateCache.put("carousel-directive.html", "<div class=\"jk-carousel\" >\n\n  <div class=\"slides-container\" layout=\"row\" >\n    <div\n      ng-repeat=\"item in ctrl.cloneData\"\n      class=\"slide\"\n    >\n      <div ng-include=\"ctrl.itemTemplateUrl\" ></div>\n    </div>\n  </div>\n  <div class=\"left-arrow-container\" layout=\"column\" layout-align=\"center center\" >\n    <md-button class=\"md-icon-button\" >\n      <md-icon ng-click=\"ctrl.navigateLeft()\" >chevron_left</md-icon>\n    </md-button>\n  </div>\n  <div class=\"right-arrow-container\" layout=\"column\" layout-align=\"center center\" >\n    <md-button class=\"md-icon-button\" >\n      <md-icon ng-click=\"ctrl.navigateRight()\" >chevron_right</md-icon>\n    </md-button>\n  </div>\n\n  <md-radio-group\n    class=\"radio-buttons-container\"\n    layout=\"row\"\n    ng-model=\"ctrl.radioButtonIndex\"\n    layout-align=\"center center\"\n    ng-change=\"ctrl.onRadioButtonClick()\" >\n    <md-radio-button\n      ng-repeat=\"item in ctrl.data\"\n      ng-value=\"$index\"\n      aria-label=\"$index\" >\n    </md-radio-button>\n  </md-radio-group>\n\n</div>\n");
      }]);
    })();
  })();
  return _retrieveGlobal();
});

System.register("CarouselDirective.js", [], function($__export) {
  "use strict";
  var __moduleName = "CarouselDirective.js";
  var CarouselDirective;
  return {
    setters: [],
    execute: function() {
      CarouselDirective = function() {
        function CarouselDirective() {
          this.restrict = 'E';
          this.replace = true;
          this.templateUrl = 'carousel-directive.html';
          this.scope = {};
          this.controller = 'CarouselController';
          this.controllerAs = 'ctrl';
          this.bindToController = {
            data: '=',
            itemTemplateUrl: '='
          };
          this.link = function($scope, element, attr, ctrl) {
            ctrl.registerElement(element);
          };
        }
        return ($traceurRuntime.createClass)(CarouselDirective, {}, {Factory: function() {
            var directive = function() {
              return new CarouselDirective();
            };
            return directive;
          }});
      }();
      $__export("CarouselDirective", CarouselDirective);
    }
  };
});

System.register("CarouselController.js", [], function($__export) {
  "use strict";
  var __moduleName = "CarouselController.js";
  var CarouselController;
  return {
    setters: [],
    execute: function() {
      CarouselController = function() {
        function CarouselController($timeout, $attrs, $mdCompiler) {
          var $__2 = this;
          this.$timeout = $timeout;
          this.$attrs = $attrs;
          this.$mdCompiler = $mdCompiler;
          this.currentIndex = 0;
          this.currentMarginLeftValue = 0;
          this.radioButtonIndex = 0;
          this.$attrs.$observe('data', function() {
            $__2.onDataChange();
          });
        }
        return ($traceurRuntime.createClass)(CarouselController, {
          registerElement: function(element) {
            this.element = element;
            this.slidesContainer = angular.element(this.element.find('div')[0]);
            console.log('registerElement...', this.slidesContainer);
          },
          resetSlidesContainerToDefaultPosition: function() {
            if (!this.elementWidth) {
              return;
            }
            this.disableTransitions();
            this.currentMarginLeftValue = this.elementWidth * -1;
            this.applyMarginLeft();
            this.currentIndex = 0;
            this.radioButtonIndex = this.currentIndex;
            this.enableTransitions();
          },
          onDataChange: function() {
            var $__2 = this;
            if (this.isDataInvalidOrTooSmall()) {
              return;
            }
            console.log('onDataChange...');
            this.executeCloneData();
            this.$timeout(function() {
              $__2.updateSlidesContainerWidth();
              $__2.resetSlidesContainerToDefaultPosition();
            });
          },
          executeCloneData: function() {
            var cloneArray = [];
            for (var index = 0; index < this.data.length; index++) {
              var item = this.data[index];
              cloneArray.push(item);
            }
            this.cloneFirstItem(cloneArray);
            this.cloneLastItem(cloneArray);
            this.cloneData = cloneArray;
          },
          cloneFirstItem: function(cloneArray) {
            var firstItem = cloneArray[0];
            var firstItemClone = angular.copy(firstItem);
            cloneArray.push(firstItemClone);
          },
          cloneLastItem: function(cloneArray) {
            var lastItem = cloneArray[this.data.length - 1];
            var lastItemClone = angular.copy(lastItem);
            cloneArray.unshift(lastItemClone);
          },
          updateSlidesContainerWidth: function() {
            this.elementWidth = this.element.prop('offsetWidth');
            this.slidesContainer.css('width', (this.elementWidth * this.cloneData.length) + 'px');
          },
          navigateLeft: function() {
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
          },
          restartFromLastItem: function() {
            var $__2 = this;
            this.$timeout(function() {
              $__2.disableTransitions();
              $__2.currentMarginLeftValue = ($__2.elementWidth * $__2.data.length) * -1;
              $__2.applyMarginLeft();
              $__2.currentIndex = $__2.data.length - 1;
              $__2.radioButtonIndex = $__2.currentIndex;
              $__2.enableTransitions();
            }, 500);
          },
          navigateRight: function() {
            var $__2 = this;
            if (this.isDataInvalidOrTooSmall()) {
              return;
            }
            this.currentIndex++;
            this.radioButtonIndex = this.currentIndex;
            this.currentMarginLeftValue -= this.elementWidth;
            this.applyMarginLeft();
            if (this.currentIndex === this.data.length) {
              this.$timeout(function() {
                $__2.resetSlidesContainerToDefaultPosition();
              }, 500);
              return;
            }
          },
          applyMarginLeft: function() {
            this.slidesContainer.css('margin-left', this.currentMarginLeftValue + 'px');
          },
          disableTransitions: function() {
            this.slidesContainer.css('transition', 'none');
          },
          enableTransitions: function() {
            var $__2 = this;
            this.$timeout(function() {
              $__2.slidesContainer.css('transition', 'margin 0.5s ease-in-out');
            }, 200);
          },
          onRadioButtonClick: function() {
            var multiplier;
            if (this.radioButtonIndex > this.currentIndex) {
              multiplier = this.radioButtonIndex - this.currentIndex;
              this.currentMarginLeftValue -= (this.elementWidth * multiplier);
            } else {
              multiplier = this.currentIndex - this.radioButtonIndex;
              this.currentMarginLeftValue += (this.elementWidth * multiplier);
            }
            this.currentIndex = this.radioButtonIndex;
            this.applyMarginLeft();
          },
          isDataInvalidOrTooSmall: function() {
            if (!this.data || this.data.length === 0 || this.data.length === 1) {
              return true;
            }
            return false;
          }
        }, {});
      }();
      $__export("CarouselController", CarouselController);
      CarouselController.$inject = ['$timeout', '$attrs', '$mdCompiler'];
    }
  };
});

System.register("CarouselModule.js", ["templates", "CarouselDirective.js", "CarouselController.js"], function($__export) {
  "use strict";
  var __moduleName = "CarouselModule.js";
  var CarouselDirective,
      CarouselController;
  return {
    setters: [function($__m) {}, function($__m) {
      CarouselDirective = $__m.CarouselDirective;
    }, function($__m) {
      CarouselController = $__m.CarouselController;
    }],
    execute: function() {
      angular.module('jkCarousel', []).directive('jkCarousel', CarouselDirective.Factory()).controller('CarouselController', CarouselController);
    }
  };
});
