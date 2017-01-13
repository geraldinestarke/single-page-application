(function () {
  'use strict';

  angular
    .module('SinglePageApp')
    // directive notImplementedOnStaging
    .directive('notImplementedOnStaging', notImplementedOnStaging)
    // directive class-sm
    .directive('classSm', classSm)
    // directive class-gt-sm
    .directive('classGtSm', classGtSm)
    // directive class-md
    .directive('classMm', classMm)
    // directive class-gt-md
    .directive('classGtMd', classGtMd)
    // directive class-lg
    .directive('classLg', classLg)
    // directive class-gt-lg
    .directive('classGtLg', classGtLg)
    // directive when-scrolled
    .directive('whenScrolled', whenScrolled)
    // directive compare-to
    .directive('compareTo', compareTo)
    // directive loading
    .directive('loading', loading)
  ;

  function notImplementedOnStaging(ENV, $timeout) {
    return {
      scope: {
        isNotImplemented: '='
      },
      link: function (scope, element) {
        $timeout(function () {
          if (ENV.environment === 'staging' && scope.isNotImplemented) {
            element.prepend(`<div class='not-implemented' style='height:${element[0].offsetHeight}px;width:${element[0].offsetWidth}px'></div>`);
          }
        }, 0);
      }
    };
  }
  function classSm($mdMedia) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        if ($mdMedia('sm')) {
          elem.addClass(attrs.classSm);
        }
      }
    };
  }
  function classGtSm($mdMedia) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        if ($mdMedia('gt-sm')) {
          elem.addClass(attrs.classGtSm);
        }
      }
    };
  }
  function classMm($mdMedia) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        if ($mdMedia('md')) {
          elem.addClass(attrs.classMd);
        }
      }
    };
  }
  function classGtMd($mdMedia) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        if ($mdMedia('gt-md')) {
          elem.addClass(attrs.classGtMd);
        }
      }
    };
  }
  function classLg($mdMedia) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        if ($mdMedia('lg')) {
          elem.addClass(attrs.classLg);
        }
      }
    };
  }
  function classGtLg($mdMedia) {
    return {
      restrict: 'A',
      link: function (scope, elem, attrs) {
        if ($mdMedia('gt-lg')) {
          elem.addClass(attrs.classGtLg);
        }
      }
    };
  }
  function whenScrolled($http) {
    return {
      scope: {
        nextPage: '=',
        items: '='
      },
      link: function (scope, elm, attr) {
        elm.bind('scroll', function () {
          var raw = elm[0];
          if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
            scope.$apply(attr.whenScrolled);
            $http.get(scope.nextPage).then(function (resp) {
              var link = resp.headers('Link');
              if (link) {
                var parts = link.split(';');
                var url = parts[0].replace(/<(.*)>/, '$1').trim();
                var rel = parts[1].replace(/rel='(.*)'/, '$1').trim();
                if (rel === 'next') {
                  scope.nextPage = url;
                }
              }
              scope.items = scope.items.concat(resp.data);
            });
          }
        });
      }
    };
  }
  function compareTo() {
    return {
      require: 'ngModel',
      scope: {
        otherModelValue: '=compareTo'
      },
      link: function (scope, element, attributes, ngModel) {
        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue === scope.otherModelValue;
        };
        scope.$watch('otherModelValue', function () {
          ngModel.$validate();
        });
      }
    };
  }
  function loading($http) {
    return {
      restrict: 'A',
      link: function (scope) {
        scope.isLoading = function () {
          return $http.pendingRequests && $http.pendingRequests.length > 0;
        };
        scope.$watch(scope.isLoading, function (v) {
          scope.m.loading = v;
        });
      }
    };
  }
}());
