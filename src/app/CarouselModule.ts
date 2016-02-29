'use strict';

import 'templates';

import {CarouselDirective} from './CarouselDirective';
import {CarouselController} from './CarouselController';

angular.module('jkCarousel', [])
  .directive('jkCarousel', CarouselDirective.Factory())
  .controller('CarouselController', CarouselController);
