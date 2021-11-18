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
var format_4hrs_2 = new ol.format.GeoJSON();
var features_4hrs_2 = format_4hrs_2.readFeatures(json_4hrs_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_4hrs_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_4hrs_2.addFeatures(features_4hrs_2);
var lyr_4hrs_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_4hrs_2, 
                style: style_4hrs_2,
                interactive: true,
                title: '<img src="styles/legend/4hrs_2.png" /> 4 hrs'
            });
var format_3hrs_3 = new ol.format.GeoJSON();
var features_3hrs_3 = format_3hrs_3.readFeatures(json_3hrs_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_3hrs_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_3hrs_3.addFeatures(features_3hrs_3);
var lyr_3hrs_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_3hrs_3, 
                style: style_3hrs_3,
                interactive: true,
                title: '<img src="styles/legend/3hrs_3.png" /> 3 hrs'
            });
var format_2hrs_4 = new ol.format.GeoJSON();
var features_2hrs_4 = format_2hrs_4.readFeatures(json_2hrs_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_2hrs_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_2hrs_4.addFeatures(features_2hrs_4);
var lyr_2hrs_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_2hrs_4, 
                style: style_2hrs_4,
                interactive: true,
                title: '<img src="styles/legend/2hrs_4.png" /> 2 hrs'
            });
var format_1hr30mins_5 = new ol.format.GeoJSON();
var features_1hr30mins_5 = format_1hr30mins_5.readFeatures(json_1hr30mins_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_1hr30mins_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_1hr30mins_5.addFeatures(features_1hr30mins_5);
var lyr_1hr30mins_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_1hr30mins_5, 
                style: style_1hr30mins_5,
                interactive: true,
                title: '<img src="styles/legend/1hr30mins_5.png" /> 1 hr 30 mins'
            });
var format_1hr_6 = new ol.format.GeoJSON();
var features_1hr_6 = format_1hr_6.readFeatures(json_1hr_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_1hr_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_1hr_6.addFeatures(features_1hr_6);
var lyr_1hr_6 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_1hr_6, 
                style: style_1hr_6,
                interactive: true,
                title: '<img src="styles/legend/1hr_6.png" /> 1hr'
            });
var format_30min_7 = new ol.format.GeoJSON();
var features_30min_7 = format_30min_7.readFeatures(json_30min_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_30min_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_30min_7.addFeatures(features_30min_7);
var lyr_30min_7 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_30min_7, 
                style: style_30min_7,
                interactive: true,
                title: '<img src="styles/legend/30min_7.png" /> 30 min'
            });
var format_FrancisCloseHall_8 = new ol.format.GeoJSON();
var features_FrancisCloseHall_8 = format_FrancisCloseHall_8.readFeatures(json_FrancisCloseHall_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_FrancisCloseHall_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_FrancisCloseHall_8.addFeatures(features_FrancisCloseHall_8);
var lyr_FrancisCloseHall_8 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_FrancisCloseHall_8, 
                style: style_FrancisCloseHall_8,
                interactive: true,
                title: '<img src="styles/legend/FrancisCloseHall_8.png" /> Francis Close Hall'
            });

lyr_GoogleRoad_0.setVisible(true);lyr_GoogleHybrid_1.setVisible(true);lyr_4hrs_2.setVisible(false);lyr_3hrs_3.setVisible(false);lyr_2hrs_4.setVisible(false);lyr_1hr30mins_5.setVisible(false);lyr_1hr_6.setVisible(false);lyr_30min_7.setVisible(true);lyr_FrancisCloseHall_8.setVisible(true);
var layersList = [lyr_GoogleRoad_0,lyr_GoogleHybrid_1,lyr_4hrs_2,lyr_3hrs_3,lyr_2hrs_4,lyr_1hr30mins_5,lyr_1hr_6,lyr_30min_7,lyr_FrancisCloseHall_8];
lyr_4hrs_2.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_3hrs_3.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_2hrs_4.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_1hr30mins_5.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_1hr_6.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_30min_7.set('fieldAliases', {'id': 'id', 'prop_is_on': 'prop_is_on', });
lyr_FrancisCloseHall_8.set('fieldAliases', {'id': 'id', });
lyr_4hrs_2.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_3hrs_3.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_2hrs_4.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_1hr30mins_5.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_1hr_6.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_30min_7.set('fieldImages', {'id': 'TextEdit', 'prop_is_on': 'TextEdit', });
lyr_FrancisCloseHall_8.set('fieldImages', {'id': 'TextEdit', });
lyr_4hrs_2.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_3hrs_3.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_2hrs_4.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_1hr30mins_5.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_1hr_6.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_30min_7.set('fieldLabels', {'id': 'no label', 'prop_is_on': 'no label', });
lyr_FrancisCloseHall_8.set('fieldLabels', {'id': 'no label', });
lyr_FrancisCloseHall_8.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});