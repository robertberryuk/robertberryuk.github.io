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
var format_ES_StephenHaig_2 = new ol.format.GeoJSON();
var features_ES_StephenHaig_2 = format_ES_StephenHaig_2.readFeatures(json_ES_StephenHaig_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_StephenHaig_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_StephenHaig_2.addFeatures(features_ES_StephenHaig_2);
var lyr_ES_StephenHaig_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_StephenHaig_2, 
                style: style_ES_StephenHaig_2,
                interactive: true,
                title: '<img src="styles/legend/ES_StephenHaig_2.png" /> ES_Stephen Haig'
            });
var format_ES_PhilipWhite_3 = new ol.format.GeoJSON();
var features_ES_PhilipWhite_3 = format_ES_PhilipWhite_3.readFeatures(json_ES_PhilipWhite_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_PhilipWhite_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_PhilipWhite_3.addFeatures(features_ES_PhilipWhite_3);
var lyr_ES_PhilipWhite_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_PhilipWhite_3, 
                style: style_ES_PhilipWhite_3,
                interactive: true,
                title: '<img src="styles/legend/ES_PhilipWhite_3.png" /> ES_Philip White'
            });
var format_ES_PeteGaskell_4 = new ol.format.GeoJSON();
var features_ES_PeteGaskell_4 = format_ES_PeteGaskell_4.readFeatures(json_ES_PeteGaskell_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_PeteGaskell_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_PeteGaskell_4.addFeatures(features_ES_PeteGaskell_4);
var lyr_ES_PeteGaskell_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_PeteGaskell_4, 
                style: style_ES_PeteGaskell_4,
                interactive: true,
                title: '<img src="styles/legend/ES_PeteGaskell_4.png" /> ES_Pete Gaskell'
            });
var format_ES_MaggieHenderson_5 = new ol.format.GeoJSON();
var features_ES_MaggieHenderson_5 = format_ES_MaggieHenderson_5.readFeatures(json_ES_MaggieHenderson_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_MaggieHenderson_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_MaggieHenderson_5.addFeatures(features_ES_MaggieHenderson_5);
var lyr_ES_MaggieHenderson_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_MaggieHenderson_5, 
                style: style_ES_MaggieHenderson_5,
                interactive: true,
                title: '<img src="styles/legend/ES_MaggieHenderson_5.png" /> ES_Maggie Henderson'
            });
var format_ES_KenSmith_6 = new ol.format.GeoJSON();
var features_ES_KenSmith_6 = format_ES_KenSmith_6.readFeatures(json_ES_KenSmith_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_KenSmith_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_KenSmith_6.addFeatures(features_ES_KenSmith_6);
var lyr_ES_KenSmith_6 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_KenSmith_6, 
                style: style_ES_KenSmith_6,
                interactive: true,
                title: '<img src="styles/legend/ES_KenSmith_6.png" /> ES_Ken Smith'
            });
var format_ES_JeremyLake_7 = new ol.format.GeoJSON();
var features_ES_JeremyLake_7 = format_ES_JeremyLake_7.readFeatures(json_ES_JeremyLake_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_JeremyLake_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_JeremyLake_7.addFeatures(features_ES_JeremyLake_7);
var lyr_ES_JeremyLake_7 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_JeremyLake_7, 
                style: style_ES_JeremyLake_7,
                interactive: true,
                title: '<img src="styles/legend/ES_JeremyLake_7.png" /> ES_Jeremy Lake'
            });
var format_ES_CCRINLCCKK_8 = new ol.format.GeoJSON();
var features_ES_CCRINLCCKK_8 = format_ES_CCRINLCCKK_8.readFeatures(json_ES_CCRINLCCKK_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_CCRINLCCKK_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_CCRINLCCKK_8.addFeatures(features_ES_CCRINLCCKK_8);
var lyr_ES_CCRINLCCKK_8 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_CCRINLCCKK_8, 
                style: style_ES_CCRINLCCKK_8,
                interactive: true,
                title: '<img src="styles/legend/ES_CCRINLCCKK_8.png" /> ES_CCRI (NL, CC, KK)'
            });
var format_CS_StephenHaig_9 = new ol.format.GeoJSON();
var features_CS_StephenHaig_9 = format_CS_StephenHaig_9.readFeatures(json_CS_StephenHaig_9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_StephenHaig_9 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_StephenHaig_9.addFeatures(features_CS_StephenHaig_9);
var lyr_CS_StephenHaig_9 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_StephenHaig_9, 
                style: style_CS_StephenHaig_9,
                interactive: true,
                title: '<img src="styles/legend/CS_StephenHaig_9.png" /> CS_Stephen Haig'
            });
var format_CS_PhilipWhite_10 = new ol.format.GeoJSON();
var features_CS_PhilipWhite_10 = format_CS_PhilipWhite_10.readFeatures(json_CS_PhilipWhite_10, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_PhilipWhite_10 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_PhilipWhite_10.addFeatures(features_CS_PhilipWhite_10);
var lyr_CS_PhilipWhite_10 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_PhilipWhite_10, 
                style: style_CS_PhilipWhite_10,
                interactive: true,
                title: '<img src="styles/legend/CS_PhilipWhite_10.png" /> CS_Philip White'
            });
var format_CS_PeteGaskell_11 = new ol.format.GeoJSON();
var features_CS_PeteGaskell_11 = format_CS_PeteGaskell_11.readFeatures(json_CS_PeteGaskell_11, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_PeteGaskell_11 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_PeteGaskell_11.addFeatures(features_CS_PeteGaskell_11);
var lyr_CS_PeteGaskell_11 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_PeteGaskell_11, 
                style: style_CS_PeteGaskell_11,
                interactive: true,
                title: '<img src="styles/legend/CS_PeteGaskell_11.png" /> CS_Pete Gaskell'
            });
var format_CS_MaggieHenderson_12 = new ol.format.GeoJSON();
var features_CS_MaggieHenderson_12 = format_CS_MaggieHenderson_12.readFeatures(json_CS_MaggieHenderson_12, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_MaggieHenderson_12 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_MaggieHenderson_12.addFeatures(features_CS_MaggieHenderson_12);
var lyr_CS_MaggieHenderson_12 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_MaggieHenderson_12, 
                style: style_CS_MaggieHenderson_12,
                interactive: true,
                title: '<img src="styles/legend/CS_MaggieHenderson_12.png" /> CS_Maggie Henderson'
            });
var format_CS_KenSmith_13 = new ol.format.GeoJSON();
var features_CS_KenSmith_13 = format_CS_KenSmith_13.readFeatures(json_CS_KenSmith_13, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_KenSmith_13 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_KenSmith_13.addFeatures(features_CS_KenSmith_13);
var lyr_CS_KenSmith_13 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_KenSmith_13, 
                style: style_CS_KenSmith_13,
                interactive: true,
                title: '<img src="styles/legend/CS_KenSmith_13.png" /> CS_Ken Smith'
            });
var format_CS_JeremyLake_14 = new ol.format.GeoJSON();
var features_CS_JeremyLake_14 = format_CS_JeremyLake_14.readFeatures(json_CS_JeremyLake_14, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_JeremyLake_14 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_JeremyLake_14.addFeatures(features_CS_JeremyLake_14);
var lyr_CS_JeremyLake_14 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_JeremyLake_14, 
                style: style_CS_JeremyLake_14,
                interactive: true,
                title: '<img src="styles/legend/CS_JeremyLake_14.png" /> CS_Jeremy Lake'
            });
var format_CS_CCRINLCCKK_15 = new ol.format.GeoJSON();
var features_CS_CCRINLCCKK_15 = format_CS_CCRINLCCKK_15.readFeatures(json_CS_CCRINLCCKK_15, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_CCRINLCCKK_15 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_CCRINLCCKK_15.addFeatures(features_CS_CCRINLCCKK_15);
var lyr_CS_CCRINLCCKK_15 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_CCRINLCCKK_15, 
                style: style_CS_CCRINLCCKK_15,
                interactive: true,
                title: '<img src="styles/legend/CS_CCRINLCCKK_15.png" /> CS_CCRI (NL, CC, KK)'
            });
var group_CS = new ol.layer.Group({
                                layers: [lyr_CS_StephenHaig_9,lyr_CS_PhilipWhite_10,lyr_CS_PeteGaskell_11,lyr_CS_MaggieHenderson_12,lyr_CS_KenSmith_13,lyr_CS_JeremyLake_14,lyr_CS_CCRINLCCKK_15,],
                                title: "CS"});
var group_ES = new ol.layer.Group({
                                layers: [lyr_ES_StephenHaig_2,lyr_ES_PhilipWhite_3,lyr_ES_PeteGaskell_4,lyr_ES_MaggieHenderson_5,lyr_ES_KenSmith_6,lyr_ES_JeremyLake_7,lyr_ES_CCRINLCCKK_8,],
                                title: "ES"});
var group_Basemaps = new ol.layer.Group({
                                layers: [lyr_GoogleRoad_0,lyr_GoogleHybrid_1,],
                                title: "Base maps"});

lyr_GoogleRoad_0.setVisible(true);lyr_GoogleHybrid_1.setVisible(true);lyr_ES_StephenHaig_2.setVisible(false);lyr_ES_PhilipWhite_3.setVisible(false);lyr_ES_PeteGaskell_4.setVisible(false);lyr_ES_MaggieHenderson_5.setVisible(false);lyr_ES_KenSmith_6.setVisible(false);lyr_ES_JeremyLake_7.setVisible(false);lyr_ES_CCRINLCCKK_8.setVisible(false);lyr_CS_StephenHaig_9.setVisible(false);lyr_CS_PhilipWhite_10.setVisible(false);lyr_CS_PeteGaskell_11.setVisible(false);lyr_CS_MaggieHenderson_12.setVisible(false);lyr_CS_KenSmith_13.setVisible(false);lyr_CS_JeremyLake_14.setVisible(false);lyr_CS_CCRINLCCKK_15.setVisible(false);
var layersList = [group_Basemaps,group_ES,group_CS];
lyr_ES_StephenHaig_2.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'es_type': 'es_type', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'optcode': 'optcode', 'opt_map': 'opt_map', 'building_i': 'building_i', 'ag_photos': 'ag_photos', 'fep_map': 'fep_map', 'startdat': 'startdat', 'enddate': 'enddate', });
lyr_ES_PhilipWhite_3.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'es_type': 'es_type', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'optcode': 'optcode', 'opt_map': 'opt_map', 'building_i': 'building_i', 'ag_photos': 'ag_photos', 'fep_map': 'fep_map', 'startdat': 'startdat', 'enddate': 'enddate', });
lyr_ES_PeteGaskell_4.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'es_type': 'es_type', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'optcode': 'optcode', 'opt_map': 'opt_map', 'building_i': 'building_i', 'ag_photos': 'ag_photos', 'fep_map': 'fep_map', 'startdat': 'startdat', 'enddate': 'enddate', });
lyr_ES_MaggieHenderson_5.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'es_type': 'es_type', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'optcode': 'optcode', 'opt_map': 'opt_map', 'building_i': 'building_i', 'ag_photos': 'ag_photos', 'fep_map': 'fep_map', 'startdat': 'startdat', 'enddate': 'enddate', });
lyr_ES_KenSmith_6.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'es_type': 'es_type', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'optcode': 'optcode', 'opt_map': 'opt_map', 'building_i': 'building_i', 'ag_photos': 'ag_photos', 'fep_map': 'fep_map', 'startdat': 'startdat', 'enddate': 'enddate', });
lyr_ES_JeremyLake_7.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'es_type': 'es_type', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'optcode': 'optcode', 'opt_map': 'opt_map', 'building_i': 'building_i', 'ag_photos': 'ag_photos', 'fep_map': 'fep_map', 'startdat': 'startdat', 'enddate': 'enddate', });
lyr_ES_CCRINLCCKK_8.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'es_type': 'es_type', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'optcode': 'optcode', 'opt_map': 'opt_map', 'building_i': 'building_i', 'ag_photos': 'ag_photos', 'fep_map': 'fep_map', 'startdat': 'startdat', 'enddate': 'enddate', });
lyr_CS_StephenHaig_9.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'cs_type': 'cs_type', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'opt_code': 'opt_code', 'opt_map': 'opt_map', 'Building_i': 'Building_i', 'ag_photos': 'ag_photos', 'ag_wa': 'ag_wa', 'fer_map': 'fer_map', 'startdate': 'startdate', 'enddate': 'enddate', });
lyr_CS_PhilipWhite_10.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'cs_type': 'cs_type', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'opt_code': 'opt_code', 'opt_map': 'opt_map', 'Building_i': 'Building_i', 'ag_photos': 'ag_photos', 'ag_wa': 'ag_wa', 'fer_map': 'fer_map', 'startdate': 'startdate', 'enddate': 'enddate', });
lyr_CS_PeteGaskell_11.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'cs_type': 'cs_type', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'opt_code': 'opt_code', 'opt_map': 'opt_map', 'Building_i': 'Building_i', 'ag_photos': 'ag_photos', 'ag_wa': 'ag_wa', 'fer_map': 'fer_map', 'startdate': 'startdate', 'enddate': 'enddate', });
lyr_CS_MaggieHenderson_12.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'cs_type': 'cs_type', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'opt_code': 'opt_code', 'opt_map': 'opt_map', 'Building_i': 'Building_i', 'ag_photos': 'ag_photos', 'ag_wa': 'ag_wa', 'fer_map': 'fer_map', 'startdate': 'startdate', 'enddate': 'enddate', });
lyr_CS_KenSmith_13.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'cs_type': 'cs_type', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'opt_code': 'opt_code', 'opt_map': 'opt_map', 'Building_i': 'Building_i', 'ag_photos': 'ag_photos', 'ag_wa': 'ag_wa', 'fer_map': 'fer_map', 'startdate': 'startdate', 'enddate': 'enddate', });
lyr_CS_JeremyLake_14.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'cs_type': 'cs_type', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'opt_code': 'opt_code', 'opt_map': 'opt_map', 'Building_i': 'Building_i', 'ag_photos': 'ag_photos', 'ag_wa': 'ag_wa', 'fer_map': 'fer_map', 'startdate': 'startdate', 'enddate': 'enddate', });
lyr_CS_CCRINLCCKK_15.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'cs_type': 'cs_type', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'opt_code': 'opt_code', 'opt_map': 'opt_map', 'Building_i': 'Building_i', 'ag_photos': 'ag_photos', 'ag_wa': 'ag_wa', 'fer_map': 'fer_map', 'startdate': 'startdate', 'enddate': 'enddate', });
lyr_ES_StephenHaig_2.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'es_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'optcode': 'TextEdit', 'opt_map': 'TextEdit', 'building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'fep_map': 'TextEdit', 'startdat': 'TextEdit', 'enddate': 'TextEdit', });
lyr_ES_PhilipWhite_3.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'es_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'optcode': 'TextEdit', 'opt_map': 'TextEdit', 'building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'fep_map': 'TextEdit', 'startdat': 'TextEdit', 'enddate': 'TextEdit', });
lyr_ES_PeteGaskell_4.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'es_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'optcode': 'TextEdit', 'opt_map': 'TextEdit', 'building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'fep_map': 'TextEdit', 'startdat': 'TextEdit', 'enddate': 'TextEdit', });
lyr_ES_MaggieHenderson_5.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'es_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'optcode': 'TextEdit', 'opt_map': 'TextEdit', 'building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'fep_map': 'TextEdit', 'startdat': 'TextEdit', 'enddate': 'TextEdit', });
lyr_ES_KenSmith_6.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'es_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'optcode': 'TextEdit', 'opt_map': 'TextEdit', 'building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'fep_map': 'TextEdit', 'startdat': 'TextEdit', 'enddate': 'TextEdit', });
lyr_ES_JeremyLake_7.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'es_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'optcode': 'TextEdit', 'opt_map': 'TextEdit', 'building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'fep_map': 'TextEdit', 'startdat': 'TextEdit', 'enddate': 'TextEdit', });
lyr_ES_CCRINLCCKK_8.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'es_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'optcode': 'TextEdit', 'opt_map': 'TextEdit', 'building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'fep_map': 'TextEdit', 'startdat': 'TextEdit', 'enddate': 'TextEdit', });
lyr_CS_StephenHaig_9.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'cs_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'opt_code': 'TextEdit', 'opt_map': 'TextEdit', 'Building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'ag_wa': 'TextEdit', 'fer_map': 'TextEdit', 'startdate': 'TextEdit', 'enddate': 'TextEdit', });
lyr_CS_PhilipWhite_10.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'cs_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'opt_code': 'TextEdit', 'opt_map': 'TextEdit', 'Building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'ag_wa': 'TextEdit', 'fer_map': 'TextEdit', 'startdate': 'TextEdit', 'enddate': 'TextEdit', });
lyr_CS_PeteGaskell_11.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'cs_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'opt_code': 'TextEdit', 'opt_map': 'TextEdit', 'Building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'ag_wa': 'TextEdit', 'fer_map': 'TextEdit', 'startdate': 'TextEdit', 'enddate': 'TextEdit', });
lyr_CS_MaggieHenderson_12.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'cs_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'opt_code': 'TextEdit', 'opt_map': 'TextEdit', 'Building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'ag_wa': 'TextEdit', 'fer_map': 'TextEdit', 'startdate': 'TextEdit', 'enddate': 'TextEdit', });
lyr_CS_KenSmith_13.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'cs_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'opt_code': 'TextEdit', 'opt_map': 'TextEdit', 'Building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'ag_wa': 'TextEdit', 'fer_map': 'TextEdit', 'startdate': 'TextEdit', 'enddate': 'TextEdit', });
lyr_CS_JeremyLake_14.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'cs_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'opt_code': 'TextEdit', 'opt_map': 'TextEdit', 'Building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'ag_wa': 'TextEdit', 'fer_map': 'TextEdit', 'startdate': 'TextEdit', 'enddate': 'TextEdit', });
lyr_CS_CCRINLCCKK_15.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'cs_type': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'opt_code': 'TextEdit', 'opt_map': 'TextEdit', 'Building_i': 'TextEdit', 'ag_photos': 'TextEdit', 'ag_wa': 'TextEdit', 'fer_map': 'TextEdit', 'startdate': 'TextEdit', 'enddate': 'TextEdit', });
lyr_ES_StephenHaig_2.set('fieldLabels', {});
lyr_ES_PhilipWhite_3.set('fieldLabels', {});
lyr_ES_PeteGaskell_4.set('fieldLabels', {});
lyr_ES_MaggieHenderson_5.set('fieldLabels', {});
lyr_ES_KenSmith_6.set('fieldLabels', {});
lyr_ES_JeremyLake_7.set('fieldLabels', {});
lyr_ES_CCRINLCCKK_8.set('fieldLabels', {});
lyr_CS_StephenHaig_9.set('fieldLabels', {});
lyr_CS_PhilipWhite_10.set('fieldLabels', {});
lyr_CS_PeteGaskell_11.set('fieldLabels', {});
lyr_CS_MaggieHenderson_12.set('fieldLabels', {});
lyr_CS_KenSmith_13.set('fieldLabels', {});
lyr_CS_JeremyLake_14.set('fieldLabels', {});
lyr_CS_CCRINLCCKK_15.set('fieldLabels', {});
lyr_CS_CCRINLCCKK_15.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});