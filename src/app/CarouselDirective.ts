'use strict';

export class CarouselDirective implements ng.IDirective {

  public restrict: string = 'E';
  public replace: boolean = true;
  public templateUrl: string = 'carousel-directive.html';
  public scope: any = {};
  public controller: string = 'CarouselController';
  public controllerAs: string = 'ctrl';
  public bindToController: any = {
    data: '=',
    itemTemplateUrl: '='
  };

  link = ($scope: ng.IScope, element: Element, attr: ng.IAttributes, ctrl: any) => {
    ctrl.registerElement(element);
  };

  public static Factory() {
    var directive = () => {
      return new CarouselDirective();
    };
    return directive;
  }

}
