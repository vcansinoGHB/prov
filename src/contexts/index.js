import React from 'react'
import { CounterStore } from '../stores/counter-store';
import { ThemeStore } from '../stores/theme-store';
import { AuthStore } from '../stores/AuthStore';

export const storesContext = React.createContext({
  counterStore: new CounterStore(),
  themeStore: new ThemeStore(),
  authStore: new AuthStore()
})