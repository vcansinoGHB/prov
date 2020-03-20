import { authData } from '../helpers';

export const apiService = {
  Login,
  GetListadoZonas,
  ZonasByID,
  ZonasEditar,
  ZonasInsertar,
  TipoCambioInsertar,
  TipoCambioGetZonas,
  TipoCambioListado,
  TipoCambioGetByID,
  TipoCambioEditar,
  ValidacionCupon,
  ValidarCupones,
  CuponesFacturaGetList,
  CheckExistFactura,
  GetCuponProviderByID,
  CuponProviderInsert,
  CuponProviderEdit,
  Cupon_BuscaCuponValidado,
  Cupon_Agregar_CuponesSeleccionados,
  Usuario_Listar,
  Usuario_ListarEmpresas,
  Usuario_ListarLocaciones,
  Usuario_Proveedor_By_Empresa_Locacion,
  Usuario_Zonas,
  Usuario_Insertar,
  Usuario_GetAll,
  UsuarioGetByID,
  Usuariosditar,
  Factura_CuponPreview,
  CambioProveedor,
  Contrarecibo
};

async function Contrarecibo(tipo,fechainicial,fechafinal) {

  const infodata = authData();

var adProveedor = 0;
var adLocacion  = 0;
var adEmpresa   = 0

if (infodata.proveedorID !== undefined && infodata.proveedorID !==null) {
  adProveedor = parseInt(infodata.proveedorID);
} 

if (infodata.locacionID !== undefined && infodata.locacionID !==null) {
  adLocacion = parseInt(infodata.locacionID);
}

if (infodata.empresaID !== undefined && infodata.empresaID !==null) {
  adEmpresa = parseInt(infodata.empresaID);
}

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "tipo":tipo,"proveedorID":adProveedor,"fechainicial":fechainicial,"fechafinal":fechafinal,"locacionID":adLocacion,"empresaID":adEmpresa})
  };
  
  const response = await fetch('https://devsia.translamex.com/json/Proveedores/ContraRecibo', requestOptions);
  const user     = await handleResponse(response);

  return user;

}

async function CambioProveedor(empresaID,locacionID,proveedorID) {
    
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ "empresaID":empresaID,"locacionID":locacionID,"proveedorID":proveedorID})
  };
  
  const response = await fetch('https://devsia.translamex.com/json/Proveedores/CambioProveedor', requestOptions);
  const user     = await handleResponse(response);

  return user;

}

async function Factura_CuponPreview(zonaid,facturaid) {    
 const requestOptions = {
  method:'GET',
  headers: { 'Content-Type': 'application/json' }
 };

 const response     = await fetch('https://devsia.translamex.com/json/Proveedores/getCuponPreview?zonaID='+zonaid+'&facturaID='+ facturaid, requestOptions);
 const sendResponse = await handleResponse(response);
  
 return sendResponse;  
}

async function Usuariosditar(usuarioID,firstName,activo,email,password,
                             confirmPassword,empresa,locacion,proveedor,
                              zona,fcupon,fnocupon,admon,cambiop) {
    
  const requestOptions = {
    method:'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"provusr_nombre":firstName,
    "provusr_email":email,
    "provusr_clave":password,
    "provusr_clavechk":confirmPassword,
    "provusr_activo":activo,
    "provusr_admon":admon,
    "provusr_factura":fnocupon,
    "provusr_facturacupon":fcupon,
    "provusr_cambioprov":cambiop,
    "provusr_empresaID":empresa.value,
    "provusr_locacionID":locacion.value,
    "provusr_proveedorID":proveedor.value,
    "provusr_zonaID":zona.value})
  };

  
  const response      = await fetch('https://devsia.translamex.com/json/Proveedores/UpdateUsuario?usuarioID='+usuarioID, requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}


async function UsuarioGetByID(usuarioID) {
    
  const requestOptions = {
    method:'GET',
    headers: { 'Content-Type': 'application/json' }
  };
  
  const response      = await fetch('https://devsia.translamex.com/json/Proveedores/getUserByID?usuarioid=' + usuarioID , requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}

async function Usuario_GetAll(pagina,
                              search,
                              empresaID,
                              locacionID,
                              proveedorID) {

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"pagina":pagina,"busqueda":search,"id_empresa":empresaID,"id_locacion":locacionID,"id_proveedor":proveedorID})
  };
  
  const response      = await fetch('https://devsia.translamex.com/json/Proveedores/ListUsuarios', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}


async function Usuario_Insertar(firstName,activo,email,password,
                                confirmPassword,empresa,locacion,proveedor,
                                zona,fcupon,fnocupon,admon,cambiop) {    
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"provusr_nombre":firstName,
                          "provusr_email":email,
                          "provusr_clave":password,
                          "provusr_clavechk":confirmPassword,
                          "provusr_activo":activo,
                          "provusr_admon":admon,
                          "provusr_factura":fnocupon,
                          "provusr_facturacupon":fcupon,
                          "provusr_cambioprov":cambiop,
                          "provusr_empresaID":{"value":empresa.value,"label":empresa.label},
                          "provusr_locacionID":{"value":locacion.value,"label":locacion.label},
                          "provusr_proveedorID":{"value":proveedor.value,"label":proveedor.label},
                          "provusr_zonaID":{"value":zona.value,"label":zona.label}})
  };
  
  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/insertProveedorUsuario', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
  
}

async function Usuario_Zonas() {    

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' }
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getProveedoresZonaGetAll', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;  
}


async function Usuario_Proveedor_By_Empresa_Locacion(locacion,empresa) {    

  const requestOptions = {
    method:'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getProveedorByLocacionID?locacionID='+locacion+'&empresaID=' + empresa, requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;  
}

async function Usuario_ListarLocaciones() {    

  const requestOptions = {
    method:'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getLocaciones', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;  
}

async function Usuario_ListarEmpresas() {    

  const requestOptions = {
    method:'GET',
    headers: { 'Content-Type': 'application/json' }
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getEmpresas', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
  
}


async function Usuario_Listar(pagina,search) {    

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"paginaActual":pagina,"Busqueda":search})
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getProveedoresUserGetAll', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;

}

async function Cupon_Agregar_CuponesSeleccionados(facturaID,
                                                  listacuponsel) {

  let cadena = '';
  // ---------------------------------------------------------------------------
  // 11 de febrero del 2020
  // ------------------------------------------------------------------------
  // Se recibe arreglo de cupones para guardarlos en la factura seleccionada
  // ------------------------------------------------------------------------
  listacuponsel.map((item, key) =>
    cadena +=  item.resTourID + ","
  );

  var newStr = cadena.substring(0, cadena.length - 1);

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({"facturaID":facturaID,"sqlCommand":newStr})
  };

  //const response      = await fetch('https://devnode.translamex.com/api/saveCuponFactura', requestOptions);
  const response      = await fetch('https://devsia.translamex.com/json/Proveedores/InsertFacturaCupones', requestOptions);
  const sendResponse  = await handleResponse(response);
 
  return sendResponse;
}


async function Cupon_BuscaCuponValidado(paramSerie,paramFolio,paramSerieID) {

  const infodata  = authData();
  var adProveedor = 0;
  var adZona      = 0;
  
  if (infodata.proveedorID !== undefined && infodata.proveedorID !==null) {
    adProveedor = parseInt(infodata.proveedorID);
  } 

  if (infodata.zonaID !== undefined && infodata.zonaID !==null) {
    adZona = parseInt(infodata.zonaID);
  } 

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"serie":paramSerie,"folio":paramFolio,"serieID":paramSerieID,"proveedorID":adProveedor,"zonaID":adZona})
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getCuponValidado', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}

async function CuponProviderEdit(facprov_UUID,
                                 facprov_xml,
                                 facprov_pdf,
                                 facprov_fechaRegistro,
                                 facprov_fecha,
                                 facprov_factura,
                                 facprov_facturanum,
                                 facprov_tipocambio,
                                 facprov_montototal,
                                 facprov_moneda,
                                 facprov_zonaparidad,
                                 facprov_descuento,
                                 facprov_subtotal,
                                 facprov_IVA,
                                 facprov_retIVA,
                                 facprov_ISR,
                                 facprov_retISR,
                                 facprov_IEPS,
                                 facprov_retotros,
                                 facprov_otros,
                                 facprov_tipo,
                                 facprov_pagado,
                                 idfactura) {

const infodata = authData();

var adProveedor = 0;
var adLocacion  = 0;
var adEmpresa   = 0

var id        = parseInt(idfactura);
var descuento = parseFloat(facprov_descuento);
var subtotal  = parseFloat(facprov_subtotal);                                    
var total     = parseFloat(facprov_montototal);
var iva       = parseFloat(facprov_IVA);
var retiva    = parseFloat(facprov_retIVA);
var isr       = parseFloat(facprov_ISR);
var retisr    = parseFloat(facprov_retISR);
var ieps      = parseFloat(facprov_IEPS);
var retotros  = parseFloat(facprov_retotros);
var otros     = parseFloat(facprov_otros); 
var tcam      = parseFloat(facprov_tipocambio);

if (infodata.proveedorID !== undefined && infodata.proveedorID !==null) {
  adProveedor = parseInt(infodata.proveedorID);
} 

if (infodata.locacionID !== undefined && infodata.locacionID !==null) {
  adLocacion = parseInt(infodata.locacionID);
}

if (infodata.empresaID !== undefined && infodata.empresaID !==null) {
  adEmpresa = parseInt(infodata.empresaID);
}

const requestOptions = {
 method:'PUT',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({"facprov_id": id,
                      "facprov_UUID":facprov_UUID ,
                      "facprov_xml": facprov_xml,
                      "facprov_pdf": facprov_pdf,
                      "facprov_fechaRegistro": facprov_fechaRegistro,
                      "facprov_fecha": facprov_fecha,
                      "facprov_factura": facprov_factura,
                      "facprov_facturanum": facprov_facturanum,
                      "facprov_tipocambio": tcam,
                      "facprov_montototal": total,
                      "facprov_moneda": facprov_moneda,
                      "facprov_zonaparidad": facprov_zonaparidad,
                      "facprov_descuento": descuento,
                      "facprov_subtotal": subtotal,
                      "facprov_IVA": iva,
                      "facprov_retIVA": retiva,
                      "facprov_ISR": isr,
                      "facprov_retISR":retisr,
                      "facprov_IEPS": ieps,
                      "facprov_retotros": retotros,
                      "facprov_otros": otros,
                      "facprov_tipo": facprov_tipo,
                      "facprov_proveedorID": adProveedor,
                      "facprov_locacionID": adLocacion,
                      "facprov_empresaID": adEmpresa,
                      "facprov_pagado": facprov_pagado})
                    };

/*console.log({"facprov_UUID":facprov_UUID ,
"facprov_xml": facprov_xml,
"facprov_pdf": facprov_pdf,
"facprov_fechaRegistro": facprov_fechaRegistro + "T00:00:00.000Z",
"facprov_fecha": facprov_fecha + "T00:00:00.000Z",
"facprov_factura": facprov_factura,
"facprov_facturanum": facprov_facturanum,
"facprov_tipocambio": facprov_tipocambio,
"facprov_montototal": facprov_montototal,
"facprov_moneda": facprov_moneda,
"facprov_zonaparidad": facprov_zonaparidad,
"facprov_descuento": facprov_descuento,
"facprov_subtotal": facprov_subtotal,
"facprov_IVA": facprov_IVA,
"facprov_retIVA": facprov_retIVA,
"facprov_ISR": facprov_ISR,
"facprov_retISR": facprov_retISR,
"facprov_IEPS": facprov_IEPS,
"facprov_retotros": facprov_retotros,
"facprov_otros": facprov_otros,
"facprov_tipo": facprov_tipo,
"facprov_proveedorID": facprov_proveedorID,
"facprov_locacionID": facprov_locacionID,
"facprov_empresaID": facprov_empresaID,
"facprov_pagado": facprov_pagado});*/

//const response      = await fetch('https://devnode.translamex.com/facturas-proveedores/' + idfactura, requestOptions);
const response      = await fetch('https://devsia.translamex.com/json/Proveedores/UpdateFactura?facturaID=' + idfactura, requestOptions);
const sendResponse  = await handleResponse(response);

return sendResponse;
}

async function CuponProviderInsert(facprov_UUID,
                                   facprov_xml,
                                   facprov_pdf,
                                   facprov_fechaRegistro,
                                   facprov_fecha,
                                   facprov_factura,
                                   facprov_facturanum,
                                   facprov_tipocambio,
                                   facprov_montototal,
                                   facprov_moneda,
                                   facprov_zonaparidad,
                                   facprov_descuento,
                                   facprov_subtotal,
                                   facprov_IVA,
                                   facprov_retIVA,
                                   facprov_ISR,
                                   facprov_retISR,
                                   facprov_IEPS,
                                   facprov_retotros,
                                   facprov_otros,
                                   facprov_tipo,
                                   facprov_pagado) {

  const infodata  = authData();
  var adProveedor = 0;     
  var adLocacion  = 0;
  var adEmpresa   = 0                               
 
  var descuento = parseFloat(facprov_descuento);
  var subtotal  = parseFloat(facprov_subtotal);                                    
  var total     = parseFloat(facprov_montototal);
  var iva       = parseFloat(facprov_IVA);
  var retiva    = parseFloat(facprov_retIVA);
  var isr       = parseFloat(facprov_ISR);
  var retisr    = parseFloat(facprov_retISR);
  var ieps      = parseFloat(facprov_IEPS);
  var retotros  = parseFloat(facprov_retotros);
  var otros     = parseFloat(facprov_otros); 

  if (infodata.proveedorID !== undefined && infodata.proveedorID !==null) {
    adProveedor = parseInt(infodata.proveedorID);
  } 

  if (infodata.locacionID !== undefined && infodata.locacionID !==null) {
    adLocacion = parseInt(infodata.locacionID);
  }

  if (infodata.empresaID !== undefined && infodata.empresaID !==null) {
    adEmpresa = parseInt(infodata.empresaID);
  }

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"facprov_UUID":facprov_UUID ,
                          "facprov_xml": facprov_xml,
                          "facprov_pdf": facprov_pdf,
                          "facprov_fechaRegistro": facprov_fechaRegistro,
                          "facprov_fecha": facprov_fecha,
                          "facprov_factura": facprov_factura,
                          "facprov_facturanum": facprov_facturanum,
                          "facprov_tipocambio": facprov_tipocambio,
                          "facprov_montototal": total,
                          "facprov_moneda": facprov_moneda,
                          "facprov_zonaparidad": facprov_zonaparidad,
                          "facprov_descuento": descuento,
                          "facprov_subtotal": subtotal,
                          "facprov_IVA": iva,
                          "facprov_retIVA": retiva,
                          "facprov_ISR": isr,
                          "facprov_retISR":retisr,
                          "facprov_IEPS": ieps,
                          "facprov_retotros": retotros,
                          "facprov_otros": otros,
                          "facprov_tipo": facprov_tipo,
                          "facprov_proveedorID": adProveedor,
                          "facprov_locacionID": adLocacion,
                          "facprov_empresaID": adEmpresa,
                          "facprov_pagado": facprov_pagado})
  };
/*
  console.log({"facprov_UUID":facprov_UUID ,
  "facprov_xml": facprov_xml,
  "facprov_pdf": facprov_pdf,
  "facprov_fechaRegistro": facprov_fechaRegistro + "T00:00:00.000Z",
  "facprov_fecha": facprov_fecha + "T00:00:00.000Z",
  "facprov_factura": facprov_factura,
  "facprov_facturanum": facprov_facturanum,
  "facprov_tipocambio": facprov_tipocambio,
  "facprov_montototal": facprov_montototal,
  "facprov_moneda": facprov_moneda,
  "facprov_zonaparidad": facprov_zonaparidad,
  "facprov_descuento": facprov_descuento,
  "facprov_subtotal": facprov_subtotal,
  "facprov_IVA": facprov_IVA,
  "facprov_retIVA": facprov_retIVA,
  "facprov_ISR": facprov_ISR,
  "facprov_retISR": facprov_retISR,
  "facprov_IEPS": facprov_IEPS,
  "facprov_retotros": facprov_retotros,
  "facprov_otros": facprov_otros,
  "facprov_tipo": facprov_tipo,
  "facprov_proveedorID": facprov_proveedorID,
  "facprov_locacionID": facprov_locacionID,
  "facprov_empresaID": facprov_empresaID,
  "facprov_pagado": facprov_pagado});*/

   const response      = await fetch('https://devsia.translamex.com/json/Proveedores/InsertFactura', requestOptions);
   const sendResponse  = await handleResponse(response);
  
   return sendResponse;
}

async function GetCuponProviderByID(facturaID){

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"FacturaID":facturaID})
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/facturaCuponesProviderByID', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}


async function CheckExistFactura(uuid,tipo) {

  const infodata  = authData();
  var adProveedor = 0;

  if (infodata.proveedorID !== undefined && infodata.proveedorID !==null) {
    adProveedor = parseInt(infodata.proveedorID);
  } 

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"tipo":tipo,"uuid":uuid,"proveedorID":adProveedor})
  };
  
  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/checkFactura', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;

}

async function CuponesFacturaGetList(pagina,busqueda,tipofactura) {

  const infodata = authData();
  var adProveedor = 0;
  var adLocacion  = 0;
  var adEmpresa   =  0

  if (infodata.proveedorID !== undefined && infodata.proveedorID !==null) {
    adProveedor = parseInt(infodata.proveedorID);
  } 

  if (infodata.locacionID !== undefined && infodata.locacionID !==null) {
    adLocacion = parseInt(infodata.locacionID);
  }

  if (infodata.empresaID !== undefined && infodata.empresaID !==null) {
    adEmpresa = parseInt(infodata.empresaID);
  }

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"paginaActual":pagina,"Busqueda":busqueda,"Tipofactura":tipofactura,"proveedorID":adProveedor,"locationID":adLocacion,"companyID":adEmpresa})
  };
  
  //const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getFacturasCupones', requestOptions);
  const response      = await fetch('https://devsia.translamex.com/json/Proveedores/ListFacturas', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}

async function Login(usuario, clave) {
    
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario, clave })
  };
  
  //const response = await fetch('https://wssia.translamex.com/servicios/cuenta/Login', requestOptions);
  const response = await fetch('https://devsia.translamex.com/json/Proveedores/LoginProveedor', requestOptions);
  const user     = await handleResponse(response);

  return user;

}

async function GetListadoZonas() {
    
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"paginaActual":1,"Busqueda":"","empresaID":1})
  };
  
  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getZonaTipoCambio', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}

async function ZonasByID(zonaID) {
    
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' }
  };
  
  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getZonaTipoCambioByID?zonaID=' + zonaID + '&empresaID=1', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}

async function ZonasEditar(zonaid,zona,activo) {
    
  const requestOptions = {
    method:'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"zontc_nombre":zona,"zontc_activo":activo,"zontc_empresaID":1})
  };

  
  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/editZonaTipoCambio?zonaID='+zonaid, requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}


async function ZonasInsertar(zona,activo,empresaID) {
    
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"zontc_nombre":zona,"zontc_activo":activo,"zontc_empresaID":empresaID})
  };
  
  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/insertZonaTipoCambio', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
  
}

async function TipoCambioEditar(zonaid,monto,activo,fechainicio,fechafinal,tcid) {

  const requestOptions = {
    method:'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"zontc_id":zonaid,"tc_monto":monto,"tc_activo":activo,"tc_fechainicio":fechainicio,"tc_fechafin":fechafinal,"EmpresaID":1})
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/editTipoCambio?tcID='+tcid, requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;

}

async function TipoCambioInsertar(zonaid,monto,activo,fechainicio,fechafinal) {
    
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"zontc_id":zonaid,"tc_monto":monto,"tc_activo":activo,"tc_fechainicio":fechainicio,"tc_fechafin":fechafinal,"EmpresaID":1})
  };
  
  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/insertTipoCambio', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
  
}

async function TipoCambioGetZonas() {

  // si hay que obtener datos de la cookie se aginaran desde aqui
  // ------------------------------------------------------------
  
  const requestOptions = {
     method:'POST',
     headers: { 'Content-Type': 'application/json' }  
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getTCZona?empresaID=1', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}

async function TipoCambioListado() {

  const requestOptions = {
     method:'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({"paginaActual":1,"Busqueda":"","empresaID":1})
  };
  
  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getTipoCambioGetAll', requestOptions);
  const sendResponse  = await handleResponse(response);
  
  return sendResponse;
}

async function TipoCambioGetByID(tcid) {
  
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' }
  };
 
  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getTipoCambioByID?tcID='+tcid+'&empresaID=1', requestOptions);
  const sendResponse  = await handleResponse(response);
 
  return sendResponse;
}

async function ValidacionCupon(serie,folio,serieID,proveedorID) {
  
  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({"serie":serie,"folio":folio,"serieID":serieID,"proveedorID":proveedorID})
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/getCupon', requestOptions);
  const sendResponse  = await handleResponse(response);
 
  return sendResponse;
}

async function ValidarCupones(listacupones) {

  let cadena='';
  // 23 de enero del 2020
  // se reciben uno o mas cupones y se actualiza la bandera res_validacupon de cada cupón en la tabla
  // MgrDatadetail 

  listacupones.map((item, key) =>
    cadena += "{'tourid':"+ item.resTourID + "},"
  );

  cadena = "[" + cadena + "]"; 

  const requestOptions = {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:(cadena)
  };

  const response      = await fetch('https://wssia.translamex.com/wsservicios/api/validaCupon', requestOptions);
  const sendResponse  = await handleResponse(response);
 
  return sendResponse;

}


function handleResponse(response) {

  let error ='';

    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok) {

            if (response.status === 401) {
               // auto logout if 401 response returned from api
               // logout();
               //location.reload(true);
               console.log(response.status);
               error = "Usuario no autorizado";
            }

            // error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });

}