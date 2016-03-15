(function() {

  'use strict';

  function CarouselDirective() {

    function link(scope, element, attrs, ctrl) {
      ctrl.registerElement(element);
      scope.$on('$destroy', function() {
        ctrl.stopAutoSlide();
      });
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
        itemTemplateUrl: '=',
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
