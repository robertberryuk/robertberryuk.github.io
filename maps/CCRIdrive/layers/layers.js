var wms_layers = [];


        var lyr_GoogleHybrid_0 = new ol.layer.Tile({
            'title': 'Google Hybrid',
            'type': 'base',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            })
        });
var format_4hrs_1 = new ol.format.GeoJSON();
var features_4hrs_1 = format_4hrs_1.readFeatures(json_4hrs_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_4hrs_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_4hrs_1.addFeatures(features_4hrs_1);
var lyr_4hrs_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_4hrs_1, 
                style: style_4hrs_1,
                interactive: true,
                title: '<img src="styles/legend/4hrs_1.png" /> 4 hrs'
            });
var format_3hrs_2 = new ol.format.GeoJSON();
var features_3hrs_2 = format_3hrs_2.readFeatures(json_3hrs_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_3hrs_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_3hrs_2.addFeatures(features_3hrs_2);
var lyr_3hrs_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_3hrs_2, 
                style: style_3hrs_2,
                interactive: true,
                title: '<img src="styles/legend/3hrs_2.png" /> 3 hrs'
            });
var format_2hrs_3 = new ol.format.GeoJSON();
var features_2hrs_3 = format_2hrs_3.readFeatures(json_2hrs_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_2hrs_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_2hrs_3.addFeatures(features_2hrs_3);
var lyr_2hrs_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_2hrs_3, 
                style: style_2hrs_3,
                interactive: true,
                title: '<img src="styles/legend/2hrs_3.png" /> 2 hrs'
            });
var format_1hr30mins_4 = new ol.format.GeoJSON();
var features_1hr30mins_4 = format_1hr30mins_4.readFeatures(json_1hr30mins_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_1hr30mins_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_1hr30mins_4.addFeatures(features_1hr30mins_4);
var lyr_1hr30mins_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_1hr30mins_4, 
                style: style_1hr30mins_4,
                interactive: true,
                title: '<img src="styles/legend/1hr30mins_4.png" /> 1 hr 30 mins'
            });
var format_1hr_5 = new ol.format.GeoJSON();
var features_1hr_5 = format_1hr_5.readFeatures(json_1hr_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_1hr_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_1hr_5.addFeatures(features_1hr_5);
var lyr_1hr_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_1hr_5, 
                style: style_1hr_5,
                interactive: true,
                title: '<img src="styles/legend/1hr_5.png" /> 1hr'
            });
var format_30min_6 = new ol.format.GeoJSON();
var features_30min_6 = format_30min_6.readFeatures(json_30min_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_30min_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_30min_6.addFeatures(features_30min_6);
var lyr_30min_6 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_30min_6, 
                style: style_30min_6,
                interactive: true,
                title: '<img src="styles/legend/30min_6.png" /> 30 min'
            });
var format_FrancisCloseHall_7 = new ol.format.GeoJSON();
var features_FrancisCloseHall_7 = format_FrancisCloseHall_7.readFeatures(json_FrancisCloseHall_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FrancisCloseHall_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FrancisCloseHall_7.addFeatures(features_FrancisCloseHall_7);
var lyr_FrancisCloseHall_7 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_FrancisCloseHall_7, 
                style: style_FrancisCloseHall_7,
                interactive: true,
                title: '<img src="styles/legend/FrancisCloseHall_7.png" /> Francis Close Hall'
            });

lyr_GoogleHybrid_0.setVisible(true);lyr_4hrs_1.setVisible(false);lyr_3hrs_2.setVisible(false);lyr_2hrs_3.setVisible(false);lyr_1hr30mins_4.setVisible(false);lyr_1hr_5.setVisible(false);lyr_30min_6.setVisible(true);lyr_FrancisCloseHall_7.setVisible(true);
var layersList = [lyr_GoogleHybrid_0,lyr_4hrs_1,lyr_3hrs_2,lyr_2hrs_3,lyr_1hr30mins_4,lyr_1hr_5,lyr_30min_6,lyr_FrancisCloseHall_7];
lyr_4hrs_1.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_3hrs_2.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_2hrs_3.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_1hr30mins_4.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_1hr_5.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_30min_6.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_FrancisCloseHall_7.set('fieldAliases', {'id': 'id', });
lyr_4hrs_1.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_3hrs_2.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_2hrs_3.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_1hr30mins_4.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_1hr_5.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_30min_6.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_FrancisCloseHall_7.set('fieldImages', {'id': 'TextEdit', });
lyr_4hrs_1.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_3hrs_2.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_2hrs_3.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_1hr30mins_4.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_1hr_5.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_30min_6.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_FrancisCloseHall_7.set('fieldLabels', {'id': 'no label', });
lyr_FrancisCloseHall_7.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});