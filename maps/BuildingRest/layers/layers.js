var wms_layers = [];

var format_Drop_HE2_0 = new ol.format.GeoJSON();
var features_Drop_HE2_0 = format_Drop_HE2_0.readFeatures(json_Drop_HE2_0, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Drop_HE2_0 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Drop_HE2_0.addFeatures(features_Drop_HE2_0);
var lyr_Drop_HE2_0 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Drop_HE2_0, 
                style: style_Drop_HE2_0,
                interactive: true,
                title: '<img src="styles/legend/Drop_HE2_0.png" /> Drop_HE2'
            });
var format_Drop_PA1_1 = new ol.format.GeoJSON();
var features_Drop_PA1_1 = format_Drop_PA1_1.readFeatures(json_Drop_PA1_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Drop_PA1_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Drop_PA1_1.addFeatures(features_Drop_PA1_1);
var lyr_Drop_PA1_1 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Drop_PA1_1, 
                style: style_Drop_PA1_1,
                interactive: true,
                title: '<img src="styles/legend/Drop_PA1_1.png" /> Drop_PA1'
            });
var format_Drop_PA2_2 = new ol.format.GeoJSON();
var features_Drop_PA2_2 = format_Drop_PA2_2.readFeatures(json_Drop_PA2_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Drop_PA2_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Drop_PA2_2.addFeatures(features_Drop_PA2_2);
var lyr_Drop_PA2_2 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Drop_PA2_2, 
                style: style_Drop_PA2_2,
                interactive: true,
                title: '<img src="styles/legend/Drop_PA2_2.png" /> Drop_PA2'
            });
var format_Rest_Completed_3 = new ol.format.GeoJSON();
var features_Rest_Completed_3 = format_Rest_Completed_3.readFeatures(json_Rest_Completed_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Rest_Completed_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Rest_Completed_3.addFeatures(features_Rest_Completed_3);
var lyr_Rest_Completed_3 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Rest_Completed_3, 
                style: style_Rest_Completed_3,
                interactive: true,
                title: '<img src="styles/legend/Rest_Completed_3.png" /> Rest_Completed'
            });
var format_Building_Rest_All_4 = new ol.format.GeoJSON();
var features_Building_Rest_All_4 = format_Building_Rest_All_4.readFeatures(json_Building_Rest_All_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Building_Rest_All_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Building_Rest_All_4.addFeatures(features_Building_Rest_All_4);
var lyr_Building_Rest_All_4 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Building_Rest_All_4, 
                style: style_Building_Rest_All_4,
                interactive: true,
                title: '<img src="styles/legend/Building_Rest_All_4.png" /> Building_Rest_All'
            });
var format_GB_Only_No_NI_5 = new ol.format.GeoJSON();
var features_GB_Only_No_NI_5 = format_GB_Only_No_NI_5.readFeatures(json_GB_Only_No_NI_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_GB_Only_No_NI_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_GB_Only_No_NI_5.addFeatures(features_GB_Only_No_NI_5);
var lyr_GB_Only_No_NI_5 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_GB_Only_No_NI_5, 
                style: style_GB_Only_No_NI_5,
                interactive: false,
                title: '<img src="styles/legend/GB_Only_No_NI_5.png" /> GB_Only_No_NI'
            });
var format_Nat_Parks_5_6 = new ol.format.GeoJSON();
var features_Nat_Parks_5_6 = format_Nat_Parks_5_6.readFeatures(json_Nat_Parks_5_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_Nat_Parks_5_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_Nat_Parks_5_6.addFeatures(features_Nat_Parks_5_6);
var lyr_Nat_Parks_5_6 = new ol.layer.Vector({
                declutter: true,
                source:jsonSource_Nat_Parks_5_6, 
                style: style_Nat_Parks_5_6,
                interactive: false,
                title: '<img src="styles/legend/Nat_Parks_5_6.png" /> Nat_Parks_5'
            });
var group_AGREEMENTHOLDERS = new ol.layer.Group({
                                layers: [lyr_Drop_HE2_0,lyr_Drop_PA1_1,lyr_Drop_PA2_2,lyr_Rest_Completed_3,lyr_Building_Rest_All_4,],
                                title: "AGREEMENT HOLDERS"});

lyr_Drop_HE2_0.setVisible(true);lyr_Drop_PA1_1.setVisible(true);lyr_Drop_PA2_2.setVisible(true);lyr_Rest_Completed_3.setVisible(true);lyr_Building_Rest_All_4.setVisible(true);lyr_GB_Only_No_NI_5.setVisible(true);lyr_Nat_Parks_5_6.setVisible(true);
var layersList = [group_AGREEMENTHOLDERS,lyr_GB_Only_No_NI_5,lyr_Nat_Parks_5_6];
lyr_Drop_HE2_0.set('fieldAliases', {'SBI': 'SBI', 'Nam___2': 'Nam___2', 'Map_Ref': 'Map_Ref', 'Nat_Prk': 'Nat_Prk', 'Drp_PA1': 'Drp_PA1', 'Drp_PA2': 'Drp_PA2', 'Drp_HE2': 'Drp_HE2', 'Invt_YN': 'Invt_YN', 'Nam___9': 'Nam___9', 'Buildng': 'Buildng', 'Address': 'Address', 'Telephn': 'Telephn', 'Mp_R_N1': 'Mp_R_N1', 'Mp_R_N2': 'Mp_R_N2', 'Mp_R_N3': 'Mp_R_N3', 'Mp_R_N4': 'Mp_R_N4', 'Mp_Rf_N': 'Mp_Rf_N', 'x_coord': 'x_coord', 'y_coord': 'y_coord', });
lyr_Drop_PA1_1.set('fieldAliases', {'SBI': 'SBI', 'Nam___2': 'Nam___2', 'Map_Ref': 'Map_Ref', 'Nat_Prk': 'Nat_Prk', 'Drp_PA1': 'Drp_PA1', 'Drp_PA2': 'Drp_PA2', 'Drp_HE2': 'Drp_HE2', 'Invt_YN': 'Invt_YN', 'Nam___9': 'Nam___9', 'Buildng': 'Buildng', 'Address': 'Address', 'Telephn': 'Telephn', 'Mp_R_N1': 'Mp_R_N1', 'Mp_R_N2': 'Mp_R_N2', 'Mp_R_N3': 'Mp_R_N3', 'Mp_R_N4': 'Mp_R_N4', 'Mp_Rf_N': 'Mp_Rf_N', 'x_coord': 'x_coord', 'y_coord': 'y_coord', });
lyr_Drop_PA2_2.set('fieldAliases', {'SBI': 'SBI', 'Nam___2': 'Nam___2', 'Map_Ref': 'Map_Ref', 'Nat_Prk': 'Nat_Prk', 'Drp_PA1': 'Drp_PA1', 'Drp_PA2': 'Drp_PA2', 'Drp_HE2': 'Drp_HE2', 'Invt_YN': 'Invt_YN', 'Nam___9': 'Nam___9', 'Buildng': 'Buildng', 'Address': 'Address', 'Telephn': 'Telephn', 'Mp_R_N1': 'Mp_R_N1', 'Mp_R_N2': 'Mp_R_N2', 'Mp_R_N3': 'Mp_R_N3', 'Mp_R_N4': 'Mp_R_N4', 'Mp_Rf_N': 'Mp_Rf_N', 'x_coord': 'x_coord', 'y_coord': 'y_coord', });
lyr_Rest_Completed_3.set('fieldAliases', {'SBI': 'SBI', 'Nam___2': 'Nam___2', 'Map_Ref': 'Map_Ref', 'Nat_Prk': 'Nat_Prk', 'Drp_PA1': 'Drp_PA1', 'Drp_PA2': 'Drp_PA2', 'Drp_HE2': 'Drp_HE2', 'Invt_YN': 'Invt_YN', 'Nam___9': 'Nam___9', 'Buildng': 'Buildng', 'Address': 'Address', 'Telephn': 'Telephn', 'Mp_R_N1': 'Mp_R_N1', 'Mp_R_N2': 'Mp_R_N2', 'Mp_R_N3': 'Mp_R_N3', 'Mp_R_N4': 'Mp_R_N4', 'Mp_Rf_N': 'Mp_Rf_N', 'x_coord': 'x_coord', 'y_coord': 'y_coord', });
lyr_Building_Rest_All_4.set('fieldAliases', {'SBI': 'SBI', 'Nam___2': 'Nam___2', 'Map_Ref': 'Map_Ref', 'Nat_Prk': 'Nat_Prk', 'Drp_PA1': 'Drp_PA1', 'Drp_PA2': 'Drp_PA2', 'Drp_HE2': 'Drp_HE2', 'Invt_YN': 'Invt_YN', 'Nam___9': 'Nam___9', 'Buildng': 'Buildng', 'Address': 'Address', 'Telephn': 'Telephn', 'Mp_R_N1': 'Mp_R_N1', 'Mp_R_N2': 'Mp_R_N2', 'Mp_R_N3': 'Mp_R_N3', 'Mp_R_N4': 'Mp_R_N4', 'Mp_Rf_N': 'Mp_Rf_N', 'x_coord': 'x_coord', 'y_coord': 'y_coord', });
lyr_GB_Only_No_NI_5.set('fieldAliases', {'ctry18cd': 'ctry18cd', 'ctry18nm': 'ctry18nm', 'ctry18nmw': 'ctry18nmw', 'bng_e': 'bng_e', 'bng_n': 'bng_n', 'long': 'long', 'lat': 'lat', 'GlobalID': 'GlobalID', });
lyr_Nat_Parks_5_6.set('fieldAliases', {'FID': 'FID', 'CODE': 'CODE', 'NAME': 'NAME', 'MEASURE': 'MEASURE', 'DESIG_DATE': 'DESIG_DATE', 'HOTLINK': 'HOTLINK', 'STATUS': 'STATUS', 'SHAPE_Leng': 'SHAPE_Leng', 'SHAPE_Area': 'SHAPE_Area', });
lyr_Drop_HE2_0.set('fieldImages', {'SBI': 'TextEdit', 'Nam___2': '', 'Map_Ref': 'TextEdit', 'Nat_Prk': '', 'Drp_PA1': '', 'Drp_PA2': '', 'Drp_HE2': '', 'Invt_YN': '', 'Nam___9': '', 'Buildng': '', 'Address': 'TextEdit', 'Telephn': '', 'Mp_R_N1': '', 'Mp_R_N2': '', 'Mp_R_N3': '', 'Mp_R_N4': '', 'Mp_Rf_N': '', 'x_coord': 'TextEdit', 'y_coord': 'TextEdit', });
lyr_Drop_PA1_1.set('fieldImages', {'SBI': 'TextEdit', 'Nam___2': '', 'Map_Ref': 'TextEdit', 'Nat_Prk': '', 'Drp_PA1': '', 'Drp_PA2': '', 'Drp_HE2': '', 'Invt_YN': '', 'Nam___9': '', 'Buildng': '', 'Address': 'TextEdit', 'Telephn': '', 'Mp_R_N1': '', 'Mp_R_N2': '', 'Mp_R_N3': '', 'Mp_R_N4': '', 'Mp_Rf_N': '', 'x_coord': 'TextEdit', 'y_coord': 'TextEdit', });
lyr_Drop_PA2_2.set('fieldImages', {'SBI': 'TextEdit', 'Nam___2': '', 'Map_Ref': 'TextEdit', 'Nat_Prk': '', 'Drp_PA1': '', 'Drp_PA2': '', 'Drp_HE2': '', 'Invt_YN': '', 'Nam___9': '', 'Buildng': '', 'Address': 'TextEdit', 'Telephn': '', 'Mp_R_N1': '', 'Mp_R_N2': '', 'Mp_R_N3': '', 'Mp_R_N4': '', 'Mp_Rf_N': '', 'x_coord': 'TextEdit', 'y_coord': 'TextEdit', });
lyr_Rest_Completed_3.set('fieldImages', {'SBI': 'TextEdit', 'Nam___2': '', 'Map_Ref': 'TextEdit', 'Nat_Prk': '', 'Drp_PA1': '', 'Drp_PA2': '', 'Drp_HE2': '', 'Invt_YN': '', 'Nam___9': '', 'Buildng': '', 'Address': 'TextEdit', 'Telephn': '', 'Mp_R_N1': '', 'Mp_R_N2': '', 'Mp_R_N3': '', 'Mp_R_N4': '', 'Mp_Rf_N': '', 'x_coord': 'TextEdit', 'y_coord': 'TextEdit', });
lyr_Building_Rest_All_4.set('fieldImages', {'SBI': 'TextEdit', 'Nam___2': '', 'Map_Ref': 'TextEdit', 'Nat_Prk': '', 'Drp_PA1': '', 'Drp_PA2': '', 'Drp_HE2': '', 'Invt_YN': '', 'Nam___9': '', 'Buildng': '', 'Address': 'TextEdit', 'Telephn': '', 'Mp_R_N1': '', 'Mp_R_N2': '', 'Mp_R_N3': '', 'Mp_R_N4': '', 'Mp_Rf_N': '', 'x_coord': 'TextEdit', 'y_coord': 'TextEdit', });
lyr_GB_Only_No_NI_5.set('fieldImages', {'ctry18cd': 'TextEdit', 'ctry18nm': 'TextEdit', 'ctry18nmw': 'TextEdit', 'bng_e': 'TextEdit', 'bng_n': 'TextEdit', 'long': 'TextEdit', 'lat': 'TextEdit', 'GlobalID': 'TextEdit', });
lyr_Nat_Parks_5_6.set('fieldImages', {'FID': 'Range', 'CODE': 'Range', 'NAME': 'TextEdit', 'MEASURE': 'TextEdit', 'DESIG_DATE': 'DateTime', 'HOTLINK': 'TextEdit', 'STATUS': 'TextEdit', 'SHAPE_Leng': 'TextEdit', 'SHAPE_Area': 'TextEdit', });
lyr_Drop_HE2_0.set('fieldLabels', {});
lyr_Drop_PA1_1.set('fieldLabels', {});
lyr_Drop_PA2_2.set('fieldLabels', {});
lyr_Rest_Completed_3.set('fieldLabels', {});
lyr_Building_Rest_All_4.set('fieldLabels', {});
lyr_GB_Only_No_NI_5.set('fieldLabels', {'ctry18cd': 'no label', 'ctry18nm': 'no label', 'ctry18nmw': 'header label', 'bng_e': 'no label', 'bng_n': 'no label', 'long': 'no label', 'lat': 'no label', 'GlobalID': 'no label', });
lyr_Nat_Parks_5_6.set('fieldLabels', {'FID': 'no label', 'CODE': 'no label', 'NAME': 'no label', 'MEASURE': 'no label', 'DESIG_DATE': 'no label', 'HOTLINK': 'no label', 'STATUS': 'no label', 'SHAPE_Leng': 'no label', 'SHAPE_Area': 'no label', });
lyr_Nat_Parks_5_6.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});