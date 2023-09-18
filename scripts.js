const apikey = config.API_KEY;

// Specify required ArcGIS modules
require(["esri/config", "esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer", "esri/layers/GeoJSONLayer", "esri/renderers/UniqueValueRenderer", "esri/symbols/SimpleFillSymbol", "esri/widgets/Legend"], function(esriConfig, Map, MapView, FeatureLayer, GeoJSONLayer, UniqueValueRenderer, SimpleFillSymbol, Legend) {
    esriConfig.apiKey = apikey; // Configure API key

        // Array of colours 
        const colours = ["#A01D2B", "#CF4A19", "#832069", "#30D27C"];

        // Define base map
        const map = new Map({
          basemap: "arcgis-dark-gray" // Basemap layer service
        });

        // Define the map specifications
        const view = new MapView({
          map: map,
          center: [-76.54, 44.28], // Longitude, latitude
          zoom: 12, // Zoom level
          container: "viewDiv" // Div element
        });

        // Pop-up display content
        const template = {
          title: "{trailname}",
          content: "Activities: {activities}" + "<br><br>Accessible?... {accessible}"
        }

        // Render trails as simple lines and colour-code by class
        const uvrTrails = new UniqueValueRenderer({
          field: "trail_class",
          uniqueValueInfos: [
            {value: "Park Trail", symbol: {type: "simple-line", width: "4px", color: colours[3]}},
            {value: "Park Trail-Driveway", symbol: {type: "simple-line", width: "4px", color: colours[0]}},
            {value: "Trail-Granular", symbol: {type: "simple-line", width: "4px", color: colours[2]}},
            {value: "Trail-Paved Pathway", symbol: {type: "simple-line", width: "4px", color: colours[1]}}
          ]
        });

        // Define GeoJSON layer using file, render, and popup 
        const gjlTrails = new GeoJSONLayer({
          url: "./trails.geojson",
          title: "Kingston Trails",
          popupTemplate: template,
          renderer: uvrTrails
        });

        // Add the GeoJSON to the map
        map.add(gjlTrails);

        // Add a legend
        view.ui.add(new Legend({ view }), "top-right");
});