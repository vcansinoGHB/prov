import React from 'react'
import { CounterStore } from '../stores/counter-store';
import { ThemeStore } from '../stores/theme-store';
import { AuthStore } from '../stores/AuthStore';
import { ZonaStore } from '../stores/ZonaStore';
import { TipoCambioStore } from '../stores/TipoCambioStore';
import { ValidaStore } from '../stores/ValidaStore';
import { CuponStore } from '../stores/CuponStore';
import { CuponProviderStore } from '../stores/CuponProviderStore';
import { UsuarioStore } from '../stores/UsuarioStore';
import { CambioStore } from '../stores/CambioStore';

export const storesContext = React.createContext({
   counterStore: new CounterStore(),
   themeStore: new ThemeStore(),
   authStore: new AuthStore(),
   zonastore : new ZonaStore(),
   tipocambioStore: new TipoCambioStore(),
   validaStore: new ValidaStore(),
   cuponStore: new CuponStore(),
   cuponproviderStore : new CuponProviderStore(),
   usuarioStore: new UsuarioStore(),
   cambioStore: new CambioStore()
})