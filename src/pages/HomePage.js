import React from 'react';
import { authData } from '../helpers';

const HomePage = () => {

    const navpermiso = authData();

return (<div> Bienvenido {navpermiso.usuario}</div>);
    
}

export default HomePage;