import React,{useEffect , useCallback} from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../../hooks/use-stores'
import './ValidaPage.css';
import Validacion from '../../models';
import Breadcrumb from '../../components/Breadcrumb';
import Loading from '../../components/Loading';
import { authData } from '../../helpers';

const ValidaPage = observer(() => {

const {validaStore} = useStores();
const navpermiso    = authData();

   useEffect(() => {
     validaStore.resetInformacion();

     
   }, [validaStore]);

   const handleBuscarChange = (e) => {
    validaStore.setClave(e.target.value);
   };

   const addCuponArray = (serie,rescode,adultos,menores,costo,tour,tourclave,validacupon,resTourID) => {
      
     const tmpCupon = Object.create(Validacion, {serie:{value:serie},
                                                 rescode:{value:rescode},
                                                 adultos:{value:adultos},
                                                 menores:{value:menores},
                                                 costo:{value:costo},
                                                 tour:{value:tour},
                                                 tourclave:{value:tourclave},
                                                 validacupon:{value:validacupon},
                                                 resTourID:{value:resTourID} 
                                                });
     validaStore.addCupon(tmpCupon);

   };

   const DeleteCupon = (tour) => {
      validaStore.deleteCupon(tour);
   }

   const Validar = () => {
      validaStore.ValidaCupones();
   }

   return (<div>
                <Breadcrumb titulo="Valida Cupones"/>
                 {
                   validaStore.errores && validaStore.errores === 'cuponvalidado' ?
                     <div className="alert alert-primary" role="alert">
                       El cupón fue validado con éxito
                     </div>
                     :
                     ''
                 }
               <div id="main">
                   <div className="busqueda container">  
                  <form onSubmit={ e=> {                           
                           e.preventDefault();                           
                           validaStore.BuscarCupon(navpermiso.proveedorID);
                      }}>
                    <div className="form-group row">
                      <div className="col-12 col-sm-12 col-md-9 col-lg-10"> 
                         <input type="text" 
                                className="form-control form-control-sm winput" 
                                id="buscar" 
                                placeholder="Ingrese numero de cupón..."
                                value={validaStore.clave}
                                onChange={handleBuscarChange}/>
                      </div> 
                      <div className="col-12 col-sm-12 col-md-3 col-lg-2">
                          <button type="submit" className="btn btn-outline-info btn-sm wbtn btnd">
                            Buscar
                          </button>
                      </div> 
                    </div> 
                  </form>         
              {
             validaStore.cargacupon === true ? <Loading /> :
              <table className="table table-sm">
               <thead>
                <tr>
                 <th>Rescode</th>
                 <th>Serie</th>
                 <th>Adultos</th>
                 <th>Menores</th>
                 <th>Costo Total</th>
                 <th></th>
                </tr>
               </thead>
              <tbody>
            { 
            validaStore.listCupones.map((cupon,key) => 
              <tr key={cupon.resTourID}> 
                <td>{cupon.rescode}</td>
                <td>{key + 1 }</td>
                <td>{cupon.adultos}</td>
                <td>{cupon.menores}</td>
                <td>${cupon.costo}</td>
                <td>
                   {
                     cupon.validacupon === 0 ?
                    <i className="fa fa-check-square fa-lg coloricon" title="Agregar" onClick={() => addCuponArray(cupon.serie,
                                                                                                  cupon.rescode,
                                                                                                  cupon.adultos,
                                                                                                  cupon.menores,
                                                                                                  cupon.costo,
                                                                                                  cupon.tour,
                                                                                                  cupon.tourclave,
                                                                                                  cupon.validacupon,
                                                                                                  cupon.resTourID)}>
                    </i>
                    : <span className='colorvalidado'>Cupón Validado</span>
                   }
                </td>
              </tr>)
            }                    
            </tbody>
         </table>
}

                   </div>
      <div className="validar container">
       <div className="row">
          <div className="col-sm-5 col-md-5">
            <h6 className="d-flex justify-content-between align-items-center mb-3">
               <span className="text-muted">Cupones</span>
                 {
                  (validaStore.CuponesCount > 0) ?
                   <span className="badge badge-secondary badge-pill">
                       { validaStore.CuponesCount }
                   </span>
                  :''
                 }
            </h6>

            {
         validaStore.CuponesCount > 0 ?
             <button type="submit" 
                     className="btn btn-outline-success btn-sm wbtn btnvalida" 
                     onClick={()=>Validar()}>
                            Validar
              </button> : ''
        }
          
            <ul className="list-group centro">
             <li className="list-group-item d-flex justify-content-between bg-light">
                 <div className="text-success">
                  <span>Total (USD)</span>
                 </div>
                 {
                   validaStore.CuponesCount > 0 ?
                 <span className="text-success"><strong>$ { validaStore.SumaCostos}</strong></span>
                 : ''
                 }
             </li>
             {
                validaStore.CuponesCount === 0 ?
                 <li className="list-group-item d-flex justify-content-between lh-condensed">
                   <small className="text-muted">Sin cupones para validar</small>
                 </li>
                 :''
             }
            {
            validaStore.listValida.map(cupon => (
              <li key={cupon.rescode} className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                 <h6 className="my-0">
                   <i className="fa fa-times-circle fa-lg coloricondelete" title="Quitar Cupón" onClick={()=>DeleteCupon(cupon)}></i> {cupon.serie} {cupon.rescode}
                 </h6>
            <small className="text-muted">Adulto {cupon.adultos} Menores {cupon.menores}</small><br/>
            <small className="text-muted">{cupon.tour}</small>
              </div>
              <span className="text-muted">${cupon.costo} </span>
              </li>
             ))
             }
          
        </ul>
      </div>

      </div>
        
        </div>
      </div>          
  </div>);
});

export default ValidaPage;