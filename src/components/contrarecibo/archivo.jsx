import React from "react";
import { authData } from '../../helpers';
import { Document, Page,Text, StyleSheet, View } from "@react-pdf/renderer";

const styles = StyleSheet.create({ 
 table: { display: "table", width: "auto", borderStyle: "solid", borderWidth: 0, borderRightWidth: 0, borderBottomWidth: 0 }, 
 tableRow: { margin: "auto", flexDirection: "row" }, 
 tableCol: { width: "12%", borderStyle: "solid", borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0,borderBottomWidth: 1 }, 
 tableColitem: { width: "12%", borderStyle: "solid", borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0,borderBottomWidth: 0 }, 
 tableColhead: { width: "50%", borderStyle: "solid", borderWidth: 0, borderLeftWidth: 0, borderTopWidth: 0,borderBottomWidth: 0 }, 
 tableCell: { margin: "auto", marginTop: 5, fontSize: 9 },
 tableCellm: { margin: "auto", marginTop: 5, fontSize: 9,textAlign :"right" },
 tableCellh:{margin:"auto",marginTop:5,fontSize:8}
});

export function PdfDocument(props) {

   const infodata = authData();

   var adEmpresa   = "";
   var adRFC       = "";
   var adDomicilio = "";

   if (infodata.empresanombre !== undefined && infodata.empresanombre !==null) {
      adEmpresa = infodata.empresanombre;
    } 
    
    if (infodata.empresarfc !== undefined && infodata.empresarfc !==null) {
      adRFC = infodata.empresarfc;
    }
    
    if (infodata.domicilio !== undefined && infodata.domicilio !==null) {
      adDomicilio = infodata.domicilio;
    }

   // console.log("pdf props", props.data);
    return (<Document>
             <Page>
                <View style={styles.table}>

                 <View style={styles.tableRow}> 
                    <View style={styles.tableColhead}> 
                      <Text style={styles.tableCellh}></Text> 
                    </View>                
                 </View>
                 <View style={styles.tableRow}> 
                   <View style={styles.tableColhead}> 
                      <Text style={styles.tableCellh}>{adEmpresa}</Text> 
                   </View>                
                 </View> 
                <View style={styles.tableRow}> 
                   <View style={styles.tableColhead}> 
                     <Text style={styles.tableCellh}>RFC: {adRFC}</Text> 
                   </View>                
                </View>
                <View style={styles.tableRow}> 
                   <View style={styles.tableColhead}> 
                     <Text style={styles.tableCellh}>{adDomicilio}</Text> 
                   </View>                
                </View> 
              
                <View style={styles.tableRow}> 
                   <View style={styles.tableColhead}> 
                     <Text style={styles.tableCell}></Text> 
                   </View>                
                </View>              
                <View style={styles.tableRow}> 
                   <View style={styles.tableColhead}> 
                     <Text style={styles.tableCell}>CONTRARECIBO</Text> 
                   </View>                
                </View>
                <View style={styles.tableRow}> 
                   <View style={styles.tableColhead}> 
                     <Text style={styles.tableCell}></Text> 
                   </View>                
                </View>

                <View style={styles.tableRow}> 
                     <View style={styles.tableCol}> 
                         <Text style={styles.tableCell}>Factura</Text> 
                     </View> 
                     <View style={styles.tableCol}> 
                         <Text style={styles.tableCell}>Cupones </Text> 
                     </View> 
                     <View style={styles.tableCol}> 
                                       <Text style={styles.tableCell}>Fecha</Text> 
                                    </View> 
                                    <View style={styles.tableCol}> 
                                       <Text style={styles.tableCell}>Fecha Factura</Text> 
                                    </View>
                                    <View style={styles.tableCol}> 
                                       <Text style={styles.tableCell}>Concepto</Text> 
                                    </View>
                                    <View style={styles.tableCol}> 
                                       <Text style={styles.tableCell}>Tipo Cambio</Text> 
                                    </View>
                                    <View style={styles.tableCol}> 
                                       <Text style={styles.tableCell}>Monto</Text> 
                                    </View>
                                    <View style={styles.tableCol}> 
                                       <Text style={styles.tableCell}>Moneda</Text> 
                                    </View> 
                           </View>
                {
                 props.data
                    ? props.data.map((a, index) => {
                            return (<View style={styles.tableRow} key={index}> 
                                 <View style={styles.tableColitem}> 
                                    <Text style={styles.tableCell}>{a.facprov_factura}{a.facprov_facturanum}</Text> 
                                 </View> 
                                 <View style={styles.tableColitem}> 
                                    <Text style={styles.tableCell}>{a.cupones}</Text> 
                                 </View> 
                                 <View style={styles.tableColitem}> 
                                    <Text style={styles.tableCell}>{a.facprov_fechaRegistro}</Text> 
                                 </View> 
                                 <View style={styles.tableColitem}> 
                                    <Text style={styles.tableCell}>{a.facprov_fecha}</Text> 
                                 </View>
                                 <View style={styles.tableColitem}> 
                                    <Text style={styles.tableCell}>{a.gastos}</Text> 
                                 </View>
                                 <View style={styles.tableColitem}> 
                                    <Text style={styles.tableCell}>{a.facprov_tipocambio}</Text> 
                                 </View>
                                 <View style={styles.tableColitem}> 
                                    <Text style={styles.tableCell}>${a.facprov_montototal}</Text> 
                                 </View>
                                 <View style={styles.tableColitem}> 
                                    <Text style={styles.tableCell}>{a.facprov_moneda}</Text> 
                                 </View> 
                           </View>);
                           })                 
                           : ""
                        }              
            </View>
         </Page>
      </Document> );
}
