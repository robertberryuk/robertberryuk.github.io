var wms_layers = [];


        var lyr_GoogleRoad_0 = new ol.layer.Tile({
            'title': 'Google Road',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
            })
        });

        var lyr_GoogleHybrid_1 = new ol.layer.Tile({
            'title': 'Google Hybrid',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            })
        });
var format_Status_2 = new ol.format.GeoJSON();
var features_Status_2 = format_Status_2.readFeatures(json_Status_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Status_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Status_2.addFeatures(features_Status_2);
var lyr_Status_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Status_2, 
                style: style_Status_2,
                interactive: true,
    title: 'Status<br />\
    <img src="styles/legend/Status_2_0.png" /> Resident<br />\
    <img src="styles/legend/Status_2_1.png" /> Visitor<br />'
        });
var format_Participant_3 = new ol.format.GeoJSON();
var features_Participant_3 = format_Participant_3.readFeatures(json_Participant_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Participant_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Participant_3.addFeatures(features_Participant_3);
var lyr_Participant_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Participant_3, 
                style: style_Participant_3,
                interactive: true,
    title: 'Participant<br />\
    <img src="styles/legend/Participant_3_0.png" /> Yes<br />\
    <img src="styles/legend/Participant_3_1.png" /> No<br />'
        });
var format_Volunteer_4 = new ol.format.GeoJSON();
var features_Volunteer_4 = format_Volunteer_4.readFeatures(json_Volunteer_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Volunteer_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Volunteer_4.addFeatures(features_Volunteer_4);
var lyr_Volunteer_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Volunteer_4, 
                style: style_Volunteer_4,
                interactive: true,
    title: 'Volunteer<br />\
    <img src="styles/legend/Volunteer_4_0.png" /> Yes<br />\
    <img src="styles/legend/Volunteer_4_1.png" /> No<br />'
        });
var format_Respondentsall_5 = new ol.format.GeoJSON();
var features_Respondentsall_5 = format_Respondentsall_5.readFeatures(json_Respondentsall_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Respondentsall_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Respondentsall_5.addFeatures(features_Respondentsall_5);
var lyr_Respondentsall_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Respondentsall_5, 
                style: style_Respondentsall_5,
                interactive: true,
                title: '<img src="styles/legend/Respondentsall_5.png" /> Respondents (all)'
            });

lyr_GoogleRoad_0.setVisible(false);lyr_GoogleHybrid_1.setVisible(true);lyr_Status_2.setVisible(false);lyr_Participant_3.setVisible(false);lyr_Volunteer_4.setVisible(false);lyr_Respondentsall_5.setVisible(true);
var layersList = [lyr_GoogleRoad_0,lyr_GoogleHybrid_1,lyr_Status_2,lyr_Participant_3,lyr_Volunteer_4,lyr_Respondentsall_5];
lyr_Status_2.set('fieldAliases', {'Postcod': 'Postcod', 'URN': 'URN', 'Voluntr': 'Voluntr', 'Prtcpnt': 'Prtcpnt', 'Visitor': 'Visitor', '___1': '___1', 'V2': 'V2', 'X': 'X', 'Y': 'Y', 'V5': 'V5', 'V6': 'V6', 'V7': 'V7', 'V8': 'V8', 'V9': 'V9', 'V10': 'V10', });
lyr_Participant_3.set('fieldAliases', {'Postcod': 'Postcod', 'URN': 'URN', 'Voluntr': 'Voluntr', 'Prtcpnt': 'Prtcpnt', 'Visitor': 'Visitor', '___1': '___1', 'V2': 'V2', 'X': 'X', 'Y': 'Y', 'V5': 'V5', 'V6': 'V6', 'V7': 'V7', 'V8': 'V8', 'V9': 'V9', 'V10': 'V10', });
lyr_Volunteer_4.set('fieldAliases', {'Postcod': 'Postcod', 'URN': 'URN', 'Voluntr': 'Voluntr', 'Prtcpnt': 'Prtcpnt', 'Visitor': 'Visitor', '___1': '___1', 'V2': 'V2', 'X': 'X', 'Y': 'Y', 'V5': 'V5', 'V6': 'V6', 'V7': 'V7', 'V8': 'V8', 'V9': 'V9', 'V10': 'V10', });
lyr_Respondentsall_5.set('fieldAliases', {'Postcod': 'Postcod', 'URN': 'URN', 'Voluntr': 'Voluntr', 'Prtcpnt': 'Prtcpnt', 'Visitor': 'Visitor', '___1': '___1', 'V2': 'V2', 'X': 'X', 'Y': 'Y', 'V5': 'V5', 'V6': 'V6', 'V7': 'V7', 'V8': 'V8', 'V9': 'V9', 'V10': 'V10', });
lyr_Status_2.set('fieldImages', {'Postcod': 'TextEdit', 'URN': 'TextEdit', 'Voluntr': 'TextEdit', 'Prtcpnt': 'TextEdit', 'Visitor': 'TextEdit', '___1': 'TextEdit', 'V2': 'TextEdit', 'X': 'TextEdit', 'Y': 'TextEdit', 'V5': 'TextEdit', 'V6': 'TextEdit', 'V7': 'TextEdit', 'V8': 'TextEdit', 'V9': 'TextEdit', 'V10': 'TextEdit', });
lyr_Participant_3.set('fieldImages', {'Postcod': 'TextEdit', 'URN': 'TextEdit', 'Voluntr': 'TextEdit', 'Prtcpnt': 'TextEdit', 'Visitor': 'TextEdit', '___1': 'TextEdit', 'V2': 'TextEdit', 'X': 'TextEdit', 'Y': 'TextEdit', 'V5': 'TextEdit', 'V6': 'TextEdit', 'V7': 'TextEdit', 'V8': 'TextEdit', 'V9': 'TextEdit', 'V10': 'TextEdit', });
lyr_Volunteer_4.set('fieldImages', {'Postcod': 'TextEdit', 'URN': 'TextEdit', 'Voluntr': 'TextEdit', 'Prtcpnt': 'TextEdit', 'Visitor': 'TextEdit', '___1': 'TextEdit', 'V2': 'TextEdit', 'X': 'TextEdit', 'Y': 'TextEdit', 'V5': 'TextEdit', 'V6': 'TextEdit', 'V7': 'TextEdit', 'V8': 'TextEdit', 'V9': 'TextEdit', 'V10': 'TextEdit', });
lyr_Respondentsall_5.set('fieldImages', {'Postcod': 'TextEdit', 'URN': 'TextEdit', 'Voluntr': 'TextEdit', 'Prtcpnt': 'TextEdit', 'Visitor': 'TextEdit', '___1': 'TextEdit', 'V2': 'TextEdit', 'X': 'TextEdit', 'Y': 'TextEdit', 'V5': 'TextEdit', 'V6': 'TextEdit', 'V7': 'TextEdit', 'V8': 'TextEdit', 'V9': 'TextEdit', 'V10': 'TextEdit', });
lyr_Status_2.set('fieldLabels', {'Postcod': 'no label', 'URN': 'no label', 'Voluntr': 'no label', 'Prtcpnt': 'no label', 'Visitor': 'no label', '___1': 'no label', 'V2': 'no label', 'X': 'no label', 'Y': 'no label', 'V5': 'no label', 'V6': 'no label', 'V7': 'no label', 'V8': 'no label', 'V9': 'no label', 'V10': 'no label', });
lyr_Participant_3.set('fieldLabels', {'Postcod': 'no label', 'URN': 'no label', 'Voluntr': 'no label', 'Prtcpnt': 'no label', 'Visitor': 'no label', '___1': 'no label', 'V2': 'no label', 'X': 'no label', 'Y': 'no label', 'V5': 'no label', 'V6': 'no label', 'V7': 'no label', 'V8': 'no label', 'V9': 'no label', 'V10': 'no label', });
lyr_Volunteer_4.set('fieldLabels', {'Postcod': 'no label', 'URN': 'no label', 'Voluntr': 'no label', 'Prtcpnt': 'no label', 'Visitor': 'no label', '___1': 'no label', 'V2': 'no label', 'X': 'no label', 'Y': 'no label', 'V5': 'no label', 'V6': 'no label', 'V7': 'no label', 'V8': 'no label', 'V9': 'no label', 'V10': 'no label', });
lyr_Respondentsall_5.set('fieldLabels', {'Postcod': 'no label', 'URN': 'no label', 'Voluntr': 'no label', 'Prtcpnt': 'no label', 'Visitor': 'no label', '___1': 'no label', 'V2': 'no label', 'X': 'no label', 'Y': 'no label', 'V5': 'no label', 'V6': 'no label', 'V7': 'no label', 'V8': 'no label', 'V9': 'no label', 'V10': 'no label', });
lyr_Respondentsall_5.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});