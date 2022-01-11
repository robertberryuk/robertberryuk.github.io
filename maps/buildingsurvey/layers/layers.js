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
var format_NCA_2 = new ol.format.GeoJSON();
var features_NCA_2 = format_NCA_2.readFeatures(json_NCA_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_NCA_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_NCA_2.addFeatures(features_NCA_2);
var lyr_NCA_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_NCA_2, 
                style: style_NCA_2,
                interactive: true,
                title: '<img src="styles/legend/NCA_2.png" /> NCA'
            });
var format_ES_StephenHaig_3 = new ol.format.GeoJSON();
var features_ES_StephenHaig_3 = format_ES_StephenHaig_3.readFeatures(json_ES_StephenHaig_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_StephenHaig_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_StephenHaig_3.addFeatures(features_ES_StephenHaig_3);
var lyr_ES_StephenHaig_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_StephenHaig_3, 
                style: style_ES_StephenHaig_3,
                interactive: true,
                title: '<img src="styles/legend/ES_StephenHaig_3.png" /> ES_Stephen Haig'
            });
var format_ES_PhilipWhite_4 = new ol.format.GeoJSON();
var features_ES_PhilipWhite_4 = format_ES_PhilipWhite_4.readFeatures(json_ES_PhilipWhite_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_PhilipWhite_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_PhilipWhite_4.addFeatures(features_ES_PhilipWhite_4);
var lyr_ES_PhilipWhite_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_PhilipWhite_4, 
                style: style_ES_PhilipWhite_4,
                interactive: true,
                title: '<img src="styles/legend/ES_PhilipWhite_4.png" /> ES_Philip White'
            });
var format_ES_PeteGaskell_5 = new ol.format.GeoJSON();
var features_ES_PeteGaskell_5 = format_ES_PeteGaskell_5.readFeatures(json_ES_PeteGaskell_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_PeteGaskell_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_PeteGaskell_5.addFeatures(features_ES_PeteGaskell_5);
var lyr_ES_PeteGaskell_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_PeteGaskell_5, 
                style: style_ES_PeteGaskell_5,
                interactive: true,
                title: '<img src="styles/legend/ES_PeteGaskell_5.png" /> ES_Pete Gaskell'
            });
var format_ES_MaggieHenderson_6 = new ol.format.GeoJSON();
var features_ES_MaggieHenderson_6 = format_ES_MaggieHenderson_6.readFeatures(json_ES_MaggieHenderson_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_MaggieHenderson_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_MaggieHenderson_6.addFeatures(features_ES_MaggieHenderson_6);
var lyr_ES_MaggieHenderson_6 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_MaggieHenderson_6, 
                style: style_ES_MaggieHenderson_6,
                interactive: true,
                title: '<img src="styles/legend/ES_MaggieHenderson_6.png" /> ES_Maggie Henderson'
            });
var format_ES_KenSmith_7 = new ol.format.GeoJSON();
var features_ES_KenSmith_7 = format_ES_KenSmith_7.readFeatures(json_ES_KenSmith_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_KenSmith_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_KenSmith_7.addFeatures(features_ES_KenSmith_7);
var lyr_ES_KenSmith_7 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_KenSmith_7, 
                style: style_ES_KenSmith_7,
                interactive: true,
                title: '<img src="styles/legend/ES_KenSmith_7.png" /> ES_Ken Smith'
            });
var format_ES_JeremyLake_8 = new ol.format.GeoJSON();
var features_ES_JeremyLake_8 = format_ES_JeremyLake_8.readFeatures(json_ES_JeremyLake_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_JeremyLake_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_JeremyLake_8.addFeatures(features_ES_JeremyLake_8);
var lyr_ES_JeremyLake_8 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_JeremyLake_8, 
                style: style_ES_JeremyLake_8,
                interactive: true,
                title: '<img src="styles/legend/ES_JeremyLake_8.png" /> ES_Jeremy Lake'
            });
var format_ES_CCRINLCCKK_9 = new ol.format.GeoJSON();
var features_ES_CCRINLCCKK_9 = format_ES_CCRINLCCKK_9.readFeatures(json_ES_CCRINLCCKK_9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_ES_CCRINLCCKK_9 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_ES_CCRINLCCKK_9.addFeatures(features_ES_CCRINLCCKK_9);
var lyr_ES_CCRINLCCKK_9 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_ES_CCRINLCCKK_9, 
                style: style_ES_CCRINLCCKK_9,
                interactive: true,
                title: '<img src="styles/legend/ES_CCRINLCCKK_9.png" /> ES_CCRI (NL, CC, KK)'
            });
var format_CS_StephenHaig_10 = new ol.format.GeoJSON();
var features_CS_StephenHaig_10 = format_CS_StephenHaig_10.readFeatures(json_CS_StephenHaig_10, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_StephenHaig_10 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_StephenHaig_10.addFeatures(features_CS_StephenHaig_10);
var lyr_CS_StephenHaig_10 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_StephenHaig_10, 
                style: style_CS_StephenHaig_10,
                interactive: true,
                title: '<img src="styles/legend/CS_StephenHaig_10.png" /> CS_Stephen Haig'
            });
var format_CS_PhilipWhite_11 = new ol.format.GeoJSON();
var features_CS_PhilipWhite_11 = format_CS_PhilipWhite_11.readFeatures(json_CS_PhilipWhite_11, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_PhilipWhite_11 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_PhilipWhite_11.addFeatures(features_CS_PhilipWhite_11);
var lyr_CS_PhilipWhite_11 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_PhilipWhite_11, 
                style: style_CS_PhilipWhite_11,
                interactive: true,
                title: '<img src="styles/legend/CS_PhilipWhite_11.png" /> CS_Philip White'
            });
var format_CS_PeteGaskell_12 = new ol.format.GeoJSON();
var features_CS_PeteGaskell_12 = format_CS_PeteGaskell_12.readFeatures(json_CS_PeteGaskell_12, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_PeteGaskell_12 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_PeteGaskell_12.addFeatures(features_CS_PeteGaskell_12);
var lyr_CS_PeteGaskell_12 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_PeteGaskell_12, 
                style: style_CS_PeteGaskell_12,
                interactive: true,
                title: '<img src="styles/legend/CS_PeteGaskell_12.png" /> CS_Pete Gaskell'
            });
var format_CS_MaggieHenderson_13 = new ol.format.GeoJSON();
var features_CS_MaggieHenderson_13 = format_CS_MaggieHenderson_13.readFeatures(json_CS_MaggieHenderson_13, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_MaggieHenderson_13 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_MaggieHenderson_13.addFeatures(features_CS_MaggieHenderson_13);
var lyr_CS_MaggieHenderson_13 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_MaggieHenderson_13, 
                style: style_CS_MaggieHenderson_13,
                interactive: true,
                title: '<img src="styles/legend/CS_MaggieHenderson_13.png" /> CS_Maggie Henderson'
            });
var format_CS_KenSmith_14 = new ol.format.GeoJSON();
var features_CS_KenSmith_14 = format_CS_KenSmith_14.readFeatures(json_CS_KenSmith_14, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_KenSmith_14 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_KenSmith_14.addFeatures(features_CS_KenSmith_14);
var lyr_CS_KenSmith_14 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_KenSmith_14, 
                style: style_CS_KenSmith_14,
                interactive: true,
                title: '<img src="styles/legend/CS_KenSmith_14.png" /> CS_Ken Smith'
            });
var format_CS_JeremyLake_15 = new ol.format.GeoJSON();
var features_CS_JeremyLake_15 = format_CS_JeremyLake_15.readFeatures(json_CS_JeremyLake_15, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_JeremyLake_15 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_JeremyLake_15.addFeatures(features_CS_JeremyLake_15);
var lyr_CS_JeremyLake_15 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_JeremyLake_15, 
                style: style_CS_JeremyLake_15,
                interactive: true,
                title: '<img src="styles/legend/CS_JeremyLake_15.png" /> CS_Jeremy Lake'
            });
var format_CS_CCRINLCCKK_16 = new ol.format.GeoJSON();
var features_CS_CCRINLCCKK_16 = format_CS_CCRINLCCKK_16.readFeatures(json_CS_CCRINLCCKK_16, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_CS_CCRINLCCKK_16 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_CS_CCRINLCCKK_16.addFeatures(features_CS_CCRINLCCKK_16);
var lyr_CS_CCRINLCCKK_16 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_CS_CCRINLCCKK_16, 
                style: style_CS_CCRINLCCKK_16,
                interactive: true,
                title: '<img src="styles/legend/CS_CCRINLCCKK_16.png" /> CS_CCRI (NL, CC, KK)'
            });
var group_Basemaps = new ol.layer.Group({
                                layers: [lyr_GoogleRoad_0,lyr_GoogleHybrid_1,],
                                title: "Base maps"});

lyr_GoogleRoad_0.setVisible(true);lyr_GoogleHybrid_1.setVisible(true);lyr_NCA_2.setVisible(false);lyr_ES_StephenHaig_3.setVisible(false);lyr_ES_PhilipWhite_4.setVisible(false);lyr_ES_PeteGaskell_5.setVisible(false);lyr_ES_MaggieHenderson_6.setVisible(false);lyr_ES_KenSmith_7.setVisible(false);lyr_ES_JeremyLake_8.setVisible(false);lyr_ES_CCRINLCCKK_9.setVisible(false);lyr_CS_StephenHaig_10.setVisible(false);lyr_CS_PhilipWhite_11.setVisible(false);lyr_CS_PeteGaskell_12.setVisible(false);lyr_CS_MaggieHenderson_13.setVisible(false);lyr_CS_KenSmith_14.setVisible(false);lyr_CS_JeremyLake_15.setVisible(false);lyr_CS_CCRINLCCKK_16.setVisible(false);
var layersList = [group_Basemaps,lyr_NCA_2,lyr_ES_StephenHaig_3,lyr_ES_PhilipWhite_4,lyr_ES_PeteGaskell_5,lyr_ES_MaggieHenderson_6,lyr_ES_KenSmith_7,lyr_ES_JeremyLake_8,lyr_ES_CCRINLCCKK_9,lyr_CS_StephenHaig_10,lyr_CS_PhilipWhite_11,lyr_CS_PeteGaskell_12,lyr_CS_MaggieHenderson_13,lyr_CS_KenSmith_14,lyr_CS_JeremyLake_15,lyr_CS_CCRINLCCKK_16];
lyr_NCA_2.set('fieldAliases', {'FID': 'FID', 'JCACODE': 'JCACODE', 'JCANAME': 'JCANAME', 'NCA_Name': 'NCA_Name', 'NAID': 'NAID', 'NANAME': 'NANAME', 'Area_SqKM': 'Area_SqKM', 'Hotlink': 'Hotlink', 'GlobalID': 'GlobalID', 'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', });
lyr_ES_StephenHaig_3.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_ES_PhilipWhite_4.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_ES_PeteGaskell_5.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_ES_MaggieHenderson_6.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_ES_KenSmith_7.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_ES_JeremyLake_8.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_ES_CCRINLCCKK_9.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'agref': 'agref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_CS_StephenHaig_10.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_CS_PhilipWhite_11.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_CS_PeteGaskell_12.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_CS_MaggieHenderson_13.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_CS_KenSmith_14.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_CS_JeremyLake_15.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_CS_CCRINLCCKK_16.set('fieldAliases', {'Surveyor': 'Surveyor', 'org_name': 'org_name', 'ccri_ref': 'ccri_ref', 'csref': 'csref', 'tot_rec': 'tot_rec', 'target_s': 'target_s', });
lyr_NCA_2.set('fieldImages', {'FID': 'Range', 'JCACODE': 'TextEdit', 'JCANAME': 'TextEdit', 'NCA_Name': 'TextEdit', 'NAID': 'TextEdit', 'NANAME': 'TextEdit', 'Area_SqKM': 'TextEdit', 'Hotlink': 'TextEdit', 'GlobalID': 'TextEdit', 'SHAPE_Leng': 'TextEdit', 'SHAPE_Area': 'TextEdit', });
lyr_ES_StephenHaig_3.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_ES_PhilipWhite_4.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_ES_PeteGaskell_5.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_ES_MaggieHenderson_6.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_ES_KenSmith_7.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_ES_JeremyLake_8.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_ES_CCRINLCCKK_9.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'agref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_CS_StephenHaig_10.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_CS_PhilipWhite_11.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_CS_PeteGaskell_12.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_CS_MaggieHenderson_13.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_CS_KenSmith_14.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_CS_JeremyLake_15.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_CS_CCRINLCCKK_16.set('fieldImages', {'Surveyor': 'TextEdit', 'org_name': 'TextEdit', 'ccri_ref': 'TextEdit', 'csref': 'TextEdit', 'tot_rec': '', 'target_s': '', });
lyr_NCA_2.set('fieldLabels', {'FID': 'no label', 'JCACODE': 'no label', 'JCANAME': 'no label', 'NCA_Name': 'inline label', 'NAID': 'no label', 'NANAME': 'no label', 'Area_SqKM': 'no label', 'Hotlink': 'no label', 'GlobalID': 'no label', 'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', });
lyr_ES_StephenHaig_3.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'agref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_ES_PhilipWhite_4.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'agref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_ES_PeteGaskell_5.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'agref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_ES_MaggieHenderson_6.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'agref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_ES_KenSmith_7.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'agref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_ES_JeremyLake_8.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'agref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_ES_CCRINLCCKK_9.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'agref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_CS_StephenHaig_10.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'csref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_CS_PhilipWhite_11.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'csref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_CS_PeteGaskell_12.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'csref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_CS_MaggieHenderson_13.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'no label', 'csref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_CS_KenSmith_14.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'csref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_CS_JeremyLake_15.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'csref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_CS_CCRINLCCKK_16.set('fieldLabels', {'Surveyor': 'inline label', 'org_name': 'inline label', 'ccri_ref': 'inline label', 'csref': 'inline label', 'tot_rec': 'inline label', 'target_s': 'inline label', });
lyr_CS_CCRINLCCKK_16.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});