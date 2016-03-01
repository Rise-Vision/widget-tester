(function (window){
  "use strict";

  if (typeof window.WebFont === "undefined") {
    window.WebFont = {};
  }

  window.WebFont = {
    load: function(params) {
      if (params && params.fontinactive) {
        if (params.google && params.google.families && params.google.families.length > 0) {
          params.fontinactive(params.google.families[0]);
        }
      }

      if (params && params.active) {
        params.active();
      }
    }
  };
})(window);

angular.module("risevision.widget.common")
  .factory("googleFontLoader", ["$q", function ($q) {
    var factory = {},
      allFonts = [];

    factory.getGoogleFonts = function() {
      var deferred = $q.defer();
        resp = {};

      allFonts = ["ABeeZee", "Abel", "Abril Fatface", "Aclonica", "Acme"];

      resp = {
        fonts: "ABeeZee=ABeeZee,sans-serif;Abel=Abel,sans-serif;Abril Fatface='Abril Fatface',sans-serif;Aclonica='Aclonica',sans-serif;Acme='Acme',sans-serif;",
        urls: ["//fonts.googleapis.com/css?family=ABeeZee", "//fonts.googleapis.com/css?family=Abel",
          "//fonts.googleapis.com/css?family=Abril Fatface", "//fonts.googleapis.com/css?family=Aclonica",
          "//fonts.googleapis.com/css?family=Acme"]
      };

      deferred.resolve(resp);

      return deferred.promise;
    };

    factory.getFontsUsed = function(familyList) {
      var fontsUsed = [];

      angular.forEach(allFonts, function (family) {
        if (familyList.indexOf(family) !== -1) {
          fontsUsed.push(family);
        }
      });

      return fontsUsed;
    };

    return factory;
  }]);