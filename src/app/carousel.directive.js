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
