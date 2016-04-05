(function() {

  'use strict';

  function CarouselDirective() {

    function link(scope, element, attrs, ctrl) {
      if (attrs.autoSlide === undefined) {
        ctrl.autoSlide = false;
      }
      if (attrs.autoSlideTime === undefined) {
        ctrl.autoSlideTime = 5000;
      }
      ctrl.registerElement(element);
      scope.$on('$destroy', function() {
        ctrl.stopAutoSlide();
      });
      scope.$watch('ctrl.autoSlide', function() {
        ctrl.validateAutoSlide();
      });
      scope.$watch('ctrl.autoSlideTime', function() {
        ctrl.restartAutoSlide();
      });
    }

    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'carousel-directive.html',
      scope: {},
      controller: 'JKCarouselController',
      controllerAs: 'ctrl',
      bindToController: {
        data: '=',
        itemTemplateUrl: '=',
        maxWidth: '@?',
        maxHeight: '@?',
        autoSlide: '@?',
        autoSlideTime: '@?'
      },
      link: link
    };
  }

  angular
    .module('jkAngularCarousel')
    .directive('jkCarousel', [
    CarouselDirective
  ]);

}());
