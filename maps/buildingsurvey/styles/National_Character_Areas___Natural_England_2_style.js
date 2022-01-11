var size = 0;
var placement = 'point';

var style_National_Character_Areas___Natural_England_2 = function(feature, resolution){
    var context = {
        feature: feature,
        variables: {}
    };
    var value = ""
    var labelText = "";
    size = 0;
    var labelFont = "19.5px \'Open Sans\', sans-serif";
    var labelFill = "#000000";
    var bufferColor = "";
    var bufferWidth = 0;
    var textAlign = "left";
    var offsetX = 8;
    var offsetY = 3;
    var placement = 'point';
    if (feature.get("NCA_Name") !== null) {
        labelText = String(feature.get("NCA_Name"));
    }
    var style = [ new ol.style.Style({
        stroke: new ol.style.Stroke({color: 'rgba(255,127,0,0.403)', lineDash: null, lineCap: 'butt', lineJoin: 'miter', width: 5}),fill: new ol.style.Fill({color: 'rgba(255,255,255,0.403)'}),
        text: createTextStyle(feature, resolution, labelText, labelFont,
                              labelFill, placement, bufferColor,
                              bufferWidth)
    })];

    return style;
};
