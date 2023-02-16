var wms_layers = [];


        var lyr_GoogleHybrid_0 = new ol.layer.Tile({
            'title': 'Google Hybrid',
            'type': 'base',
            'opacity': 0.750000,
            
            
            source: new ol.source.XYZ({
    attributions: ' &middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
                url: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
            })
        });
var format_NPs_1 = new ol.format.GeoJSON();
var features_NPs_1 = format_NPs_1.readFeatures(json_NPs_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_NPs_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_NPs_1.addFeatures(features_NPs_1);
var lyr_NPs_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_NPs_1, 
                style: style_NPs_1,
                interactive: true,
                title: '<img src="styles/legend/NPs_1.png" /> NPs'
            });
var format_NP_Office_2 = new ol.format.GeoJSON();
var features_NP_Office_2 = format_NP_Office_2.readFeatures(json_NP_Office_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_NP_Office_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_NP_Office_2.addFeatures(features_NP_Office_2);
var lyr_NP_Office_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_NP_Office_2, 
                style: style_NP_Office_2,
                interactive: true,
                title: '<img src="styles/legend/NP_Office_2.png" /> NP_Office'
            });
var format_Contractor_3 = new ol.format.GeoJSON();
var features_Contractor_3 = format_Contractor_3.readFeatures(json_Contractor_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Contractor_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Contractor_3.addFeatures(features_Contractor_3);
var lyr_Contractor_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Contractor_3, 
                style: style_Contractor_3,
                interactive: true,
                title: '<img src="styles/legend/Contractor_3.png" /> Contractor'
            });
var format_Architect_4 = new ol.format.GeoJSON();
var features_Architect_4 = format_Architect_4.readFeatures(json_Architect_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Architect_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Architect_4.addFeatures(features_Architect_4);
var lyr_Architect_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Architect_4, 
                style: style_Architect_4,
                interactive: true,
                title: '<img src="styles/legend/Architect_4.png" /> Architect'
            });
var format_Building_5 = new ol.format.GeoJSON();
var features_Building_5 = format_Building_5.readFeatures(json_Building_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Building_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Building_5.addFeatures(features_Building_5);
var lyr_Building_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Building_5, 
                style: style_Building_5,
                interactive: true,
                title: '<img src="styles/legend/Building_5.png" /> Building'
            });
var format_Applicant_6 = new ol.format.GeoJSON();
var features_Applicant_6 = format_Applicant_6.readFeatures(json_Applicant_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Applicant_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Applicant_6.addFeatures(features_Applicant_6);
var lyr_Applicant_6 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Applicant_6, 
                style: style_Applicant_6,
                interactive: true,
                title: '<img src="styles/legend/Applicant_6.png" /> Applicant'
            });

lyr_GoogleHybrid_0.setVisible(true);lyr_NPs_1.setVisible(false);lyr_NP_Office_2.setVisible(false);lyr_Contractor_3.setVisible(false);lyr_Architect_4.setVisible(false);lyr_Building_5.setVisible(false);lyr_Applicant_6.setVisible(true);
var layersList = [lyr_GoogleHybrid_0,lyr_NPs_1,lyr_NP_Office_2,lyr_Contractor_3,lyr_Architect_4,lyr_Building_5,lyr_Applicant_6];
lyr_NPs_1.set('fieldAliases', {'FID': 'FID', 'CODE': 'CODE', 'NAME': 'NAME', 'MEASURE': 'MEASURE', 'DESIG_DATE': 'DESIG_DATE', 'HOTLINK': 'HOTLINK', 'STATUS': 'STATUS', 'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', });
lyr_NP_Office_2.set('fieldAliases', {'NP_advisor': 'NP_advisor', 'National_P': 'National_P', 'NP_Office_': 'NP_Office_', 'NP_X': 'NP_X', 'NP_Y': 'NP_Y', 'Building s': 'Building s', 'Management': 'Management', 'Total_clai': 'Total_clai', 'Applicant_': 'Applicant_', 'Applican_1': 'Applican_1', 'App_Pcode': 'App_Pcode', 'App_X': 'App_X', 'App_Y': 'App_Y', 'Applicant': 'Applicant', 'Applican_2': 'Applican_2', 'SBI': 'SBI', 'Building_N': 'Building_N', 'Building_G': 'Building_G', 'Building_X': 'Building_X', 'Building_Y': 'Building_Y', 'Architect': 'Architect', 'Architect_': 'Architect_', 'Architec_1': 'Architec_1', 'Architec_2': 'Architec_2', 'Architec_3': 'Architec_3', 'Architec_4': 'Architec_4', 'Architec_5': 'Architec_5', 'Contractor': 'Contractor', 'Contract_1': 'Contract_1', 'Contract_2': 'Contract_2', 'Contract_3': 'Contract_3', 'Contract_4': 'Contract_4', 'Contract_5': 'Contract_5', 'Contract_6': 'Contract_6', });
lyr_Contractor_3.set('fieldAliases', {'Contractor': 'Contractor', 'Contract_1': 'Contract_1', 'Contract_2': 'Contract_2', 'Contract_3': 'Contract_3', 'Contract_4': 'Contract_4', 'Contract_5': 'Contract_5', 'Contract_6': 'Contract_6', });
lyr_Architect_4.set('fieldAliases', {'Applicant_': 'Applicant_', 'App_Y': 'App_Y', 'Building_N': 'Building_N', 'Architect': 'Architect', 'Architect_': 'Architect_', 'Architec_1': 'Architec_1', 'Architec_2': 'Architec_2', 'Architec_3': 'Architec_3', 'Architec_4': 'Architec_4', 'Architec_5': 'Architec_5', 'Contractor': 'Contractor', });
lyr_Building_5.set('fieldAliases', {'Applicant_': 'Applicant_', 'SBI': 'SBI', 'Building_N': 'Building_N', 'Architect': 'Architect', 'Contractor': 'Contractor', });
lyr_Applicant_6.set('fieldAliases', {'NP_advisor': 'NP_advisor', 'National_P': 'National_P', 'Applicant_': 'Applicant_', 'Address': 'Address', 'Address_1': 'Address_1', 'Name': 'Name', 'Applican_2': 'Applican_2', 'Building_N': 'Building_N', 'Architect': 'Architect', });
lyr_NPs_1.set('fieldImages', {'FID': 'Range', 'CODE': 'Range', 'NAME': 'TextEdit', 'MEASURE': 'TextEdit', 'DESIG_DATE': 'DateTime', 'HOTLINK': 'TextEdit', 'STATUS': 'TextEdit', 'SHAPE_Leng': 'TextEdit', 'SHAPE_Area': 'TextEdit', });
lyr_NP_Office_2.set('fieldImages', {'NP_advisor': 'TextEdit', 'National_P': '', 'NP_Office_': '', 'NP_X': 'Range', 'NP_Y': 'Range', 'Building s': '', 'Management': '', 'Total_clai': '', 'Applicant_': '', 'Applican_1': '', 'App_Pcode': 'TextEdit', 'App_X': 'Range', 'App_Y': 'Range', 'Applicant': '', 'Applican_2': '', 'SBI': 'Range', 'Building_N': '', 'Building_G': '', 'Building_X': 'Range', 'Building_Y': 'Range', 'Architect': 'TextEdit', 'Architect_': '', 'Architec_1': '', 'Architec_2': '', 'Architec_3': '', 'Architec_4': '', 'Architec_5': '', 'Contractor': 'TextEdit', 'Contract_1': '', 'Contract_2': '', 'Contract_3': '', 'Contract_4': '', 'Contract_5': '', 'Contract_6': '', });
lyr_Contractor_3.set('fieldImages', {'Contractor': 'TextEdit', 'Contract_1': '', 'Contract_2': '', 'Contract_3': '', 'Contract_4': '', 'Contract_5': '', 'Contract_6': '', });
lyr_Architect_4.set('fieldImages', {'Applicant_': '', 'App_Y': 'Range', 'Building_N': '', 'Architect': 'TextEdit', 'Architect_': '', 'Architec_1': '', 'Architec_2': '', 'Architec_3': '', 'Architec_4': '', 'Architec_5': '', 'Contractor': 'TextEdit', });
lyr_Building_5.set('fieldImages', {'Applicant_': '', 'SBI': 'Range', 'Building_N': '', 'Architect': 'TextEdit', 'Contractor': 'TextEdit', });
lyr_Applicant_6.set('fieldImages', {'NP_advisor': 'TextEdit', 'National_P': 'TextEdit', 'Applicant_': 'TextEdit', 'Address': 'TextEdit', 'Address_1': '', 'Name': 'TextEdit', 'Applican_2': 'TextEdit', 'Building_N': 'TextEdit', 'Architect': 'TextEdit', });
lyr_NPs_1.set('fieldLabels', {'FID': 'no label', 'CODE': 'no label', 'NAME': 'no label', 'MEASURE': 'no label', 'DESIG_DATE': 'no label', 'HOTLINK': 'no label', 'STATUS': 'no label', 'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', });
lyr_NP_Office_2.set('fieldLabels', {'NP_advisor': 'no label', 'National_P': 'no label', 'NP_Office_': 'no label', 'NP_X': 'no label', 'NP_Y': 'no label', 'Building s': 'no label', 'Management': 'no label', 'Total_clai': 'no label', 'Applicant_': 'no label', 'Applican_1': 'no label', 'App_Pcode': 'no label', 'App_X': 'no label', 'App_Y': 'no label', 'Applicant': 'no label', 'Applican_2': 'no label', 'SBI': 'no label', 'Building_N': 'no label', 'Building_G': 'no label', 'Building_X': 'no label', 'Building_Y': 'no label', 'Architect': 'no label', 'Architect_': 'no label', 'Architec_1': 'no label', 'Architec_2': 'no label', 'Architec_3': 'no label', 'Architec_4': 'no label', 'Architec_5': 'no label', 'Contractor': 'no label', 'Contract_1': 'no label', 'Contract_2': 'no label', 'Contract_3': 'no label', 'Contract_4': 'no label', 'Contract_5': 'no label', 'Contract_6': 'no label', });
lyr_Contractor_3.set('fieldLabels', {'Contractor': 'inline label', 'Contract_1': 'no label', 'Contract_2': 'no label', 'Contract_3': 'no label', 'Contract_4': 'no label', 'Contract_5': 'no label', 'Contract_6': 'no label', });
lyr_Architect_4.set('fieldLabels', {'Applicant_': 'no label', 'App_Y': 'no label', 'Building_N': 'no label', 'Architect': 'no label', 'Architect_': 'inline label', 'Architec_1': 'no label', 'Architec_2': 'no label', 'Architec_3': 'no label', 'Architec_4': 'no label', 'Architec_5': 'no label', 'Contractor': 'no label', });
lyr_Building_5.set('fieldLabels', {'Applicant_': 'no label', 'SBI': 'no label', 'Building_N': 'inline label', 'Architect': 'no label', 'Contractor': 'no label', });
lyr_Applicant_6.set('fieldLabels', {'NP_advisor': 'no label', 'National_P': 'no label', 'Applicant_': 'inline label', 'Address': 'no label', 'Address_1': 'no label', 'Name': 'no label', 'Applican_2': 'no label', 'Building_N': 'no label', 'Architect': 'no label', });
lyr_Applicant_6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});