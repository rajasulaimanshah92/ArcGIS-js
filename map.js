require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/BasemapToggle",
    "esri/widgets/BasemapGallery",
    "esri/layers/FeatureLayer"
  ], function (Map, MapView, BasemapToggle, BasemapGallery, FeatureLayer) {
        
        var map = new Map({
          basemap: "topo-vector",
          ground: "world-elevation"
        });

        var view = new MapView({
          container: "viewDiv",
          map: map,
          zoom: 6,
          center: [109.46, 4.102] // longitude, latitude
        });

        var basemapGallery = new BasemapGallery({
          view: view,
          source: {
            portal: {
              url: "https://www.arcgis.com",
              useVectorBasemap: true
            }
          }
        });

        view.ui.add(basemapGallery);
        view.ui.move([basemapGallery], "top-right");

        var trailheadsLayer = new FeatureLayer({
          url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0"
        });

        map.add(trailheadsLayer);

        var trailsLayer = new FeatureLayer({
          url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0"
        }); 

        map.add(trailsLayer, 0);

        var parksLayer = new FeatureLayer({
          url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Parks_and_Open_Space/FeatureServer/0"
        });

        map.add(parksLayer, 0);

        var trailheadsRenderer = {
          type: "simple",
          symbol: {
            type: "picture-marker",
            url: "http://static.arcgis.com/images/Symbols/NPS/npsPictograph_0231b.png",
            width: "18px",
            height: "18px"
          }
        };

        var trailheadsLabels = {
          symbol: {
            type: "text",
            color: "#FFFFFF",
            haloColor: "#5E8D74",
            haloSize: "2px",
            font: {
              size: "12px",
              family: "Noto Sans",
              style: "italic",
              weight: "normal"
            }
          },
          labelPlacement: "above-center",
          labelExpressionInfo: {
            expression: "$feature.TRL_NAME"
          }
        };

        var trailheads = new FeatureLayer({
          url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads/FeatureServer/0",
          renderer: trailheadsRenderer,
          labelingInfo: [trailheadsLabels]
        });

        map.add(trailheads);

        var trailsRenderer = {
          type: "simple",
          symbol: {
            color: "#BA55D3",
            type: "simple-line",
            style: "solid"
          },
          visualVariables: [
            {
              type: "size",
              field: "ELEV_GAIN",
              minDataValue: 0,
              maxDataValue: 2300,
              minSize: "3px",
              maxSize: "7px"
            }
          ]
        };

        var trails = new FeatureLayer({
          url: "https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trails/FeatureServer/0",
          renderer: trailsRenderer,
          opacity: 0.75
        });

        map.add(trails, 0);

      });