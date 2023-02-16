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
var format_Applicant_1 = new ol.format.GeoJSON();
var features_Applicant_1 = format_Applicant_1.readFeatures(json_Applicant_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Applicant_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Applicant_1.addFeatures(features_Applicant_1);
var lyr_Applicant_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Applicant_1, 
                style: style_Applicant_1,
                interactive: true,
                title: '<img src="styles/legend/Applicant_1.png" /> Applicant'
            });

lyr_GoogleHybrid_0.setVisible(true);lyr_Applicant_1.setVisible(true);
var layersList = [lyr_GoogleHybrid_0,lyr_Applicant_1];
lyr_Applicant_1.set('fieldAliases', {'NP_advisor': 'NP_advisor', 'National_Park': 'National_Park', 'NP_Office_Pcode': 'NP_Office_Pcode', 'NP_X': 'NP_X', 'NP_Y': 'NP_Y', 'Building score sheet': 'Building score sheet', 'Management Plan': 'Management Plan', 'Total_clained': 'Total_clained', 'Applicant_Name': 'Applicant_Name', 'Applicant_Address': 'Applicant_Address', 'App_Pcode': 'App_Pcode', 'App_X': 'App_X', 'App_Y': 'App_Y', 'Applicant Tel. No.': 'Applicant Tel. No.', 'Applicant Email': 'Applicant Email', 'SBI': 'SBI', 'Building_Name': 'Building_Name', 'Building_GridRef': 'Building_GridRef', 'Building_X': 'Building_X', 'Building_Y': 'Building_Y', 'Architect': 'Architect', 'Architect_address': 'Architect_address', 'Architect_Pcode': 'Architect_Pcode', 'Architect_X': 'Architect_X', 'Architect_Y': 'Architect_Y', 'Architect_Tel': 'Architect_Tel', 'Architect_email': 'Architect_email', 'Contractor': 'Contractor', 'Contractor_address': 'Contractor_address', 'Contractor_Pcode': 'Contractor_Pcode', 'Contractor_X': 'Contractor_X', 'Contractor_Y': 'Contractor_Y', 'Contractor Tel. No.': 'Contractor Tel. No.', 'Contractor email': 'Contractor email', });
lyr_Applicant_1.set('fieldImages', {'NP_advisor': 'TextEdit', 'National_Park': 'TextEdit', 'NP_Office_Pcode': 'TextEdit', 'NP_X': 'Range', 'NP_Y': 'Range', 'Building score sheet': 'TextEdit', 'Management Plan': 'TextEdit', 'Total_clained': 'TextEdit', 'Applicant_Name': 'TextEdit', 'Applicant_Address': 'TextEdit', 'App_Pcode': 'TextEdit', 'App_X': 'Range', 'App_Y': 'Range', 'Applicant Tel. No.': 'TextEdit', 'Applicant Email': 'TextEdit', 'SBI': 'Range', 'Building_Name': 'TextEdit', 'Building_GridRef': 'TextEdit', 'Building_X': 'Range', 'Building_Y': 'Range', 'Architect': 'TextEdit', 'Architect_address': 'TextEdit', 'Architect_Pcode': 'TextEdit', 'Architect_X': 'Range', 'Architect_Y': 'Range', 'Architect_Tel': 'TextEdit', 'Architect_email': 'TextEdit', 'Contractor': 'TextEdit', 'Contractor_address': 'TextEdit', 'Contractor_Pcode': 'TextEdit', 'Contractor_X': 'Range', 'Contractor_Y': 'Range', 'Contractor Tel. No.': 'TextEdit', 'Contractor email': 'TextEdit', });
lyr_Applicant_1.set('fieldLabels', {'NP_advisor': 'no label', 'National_Park': 'no label', 'NP_Office_Pcode': 'no label', 'NP_X': 'no label', 'NP_Y': 'no label', 'Building score sheet': 'no label', 'Management Plan': 'no label', 'Total_clained': 'no label', 'Applicant_Name': 'inline label', 'Applicant_Address': 'no label', 'App_Pcode': 'no label', 'App_X': 'no label', 'App_Y': 'no label', 'Applicant Tel. No.': 'no label', 'Applicant Email': 'no label', 'SBI': 'no label', 'Building_Name': 'no label', 'Building_GridRef': 'no label', 'Building_X': 'no label', 'Building_Y': 'no label', 'Architect': 'no label', 'Architect_address': 'no label', 'Architect_Pcode': 'no label', 'Architect_X': 'no label', 'Architect_Y': 'no label', 'Architect_Tel': 'no label', 'Architect_email': 'no label', 'Contractor': 'no label', 'Contractor_address': 'no label', 'Contractor_Pcode': 'no label', 'Contractor_X': 'no label', 'Contractor_Y': 'no label', 'Contractor Tel. No.': 'no label', 'Contractor email': 'no label', });
lyr_Applicant_1.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});