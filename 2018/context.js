        (function() {
            var app = angular.module('roadmap', ['ngSanitize', 'ngCookies']);
            app.controller('Features', function($scope, $http, $cookies) {
                $http.get('https://rally1.rallydev.com/slm/webservice/v2.0/portfolioitem/ppmfeature?query=' +
                        '(((c_ProductRoadmapBUPTProduct = "NGP System Services") AND (c_ProductRoadmapQuarterStatus != Rejected)) AND (name !contains "Legacy Support"))' +
                        '&fetch=Name,c_ProductRoadmapNGPProduct,c_ProductRoadmapQuarter,Description,c_ProductRoadmapQuarterStatus' +
                        '&project=/project/27154375449' +
                        '&projectScopeDown=false' + 
                        '&pagesize=1000')
                    .then(function(response) {
                        $scope.features = response.data.QueryResult.Results;
                        console.log( "loaded all featues: "+ $scope.features.length);
                        $scope.time = {}
                        $scope.streams = [ null, "Container Platform", "Monitoring", "Messaging", "API Gateway", "API Portal",  "DevX"]  // "Data Fabric",
                        angular.forEach($scope.features, function(feature, key) {
                            console.log("featrue: " + feature.Name + " => " + feature._ref );
                            q =  "x"+feature.c_ProductRoadmapQuarter 
                            if ($scope.time[ q ] == null) {
                                $scope.time[ q ] = {}
                            }  
                            stream = feature.c_ProductRoadmapNGPProduct 
                            if ($scope.time[ q ][ stream ] == null) {
                                $scope.time[ q ][ stream ] = []
                            }
                            $scope.time[ q ][ stream ].push( { "name": feature.Name, "desc": feature.Description, "status": feature.c_ProductRoadmapQuarterStatus } ) 
                        });                        
                        console.log( "loaded roadmap");
                    });
            });
        })();
