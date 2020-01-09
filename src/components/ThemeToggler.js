import React from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../hooks/use-stores'

const ThemeToggler = observer(() => {
    const { themeStore } = useStores()
  
    return (
      <>
        <div>{themeStore.theme}</div>
        <button onClick={() => themeStore.setTheme('light')}>
          set theme: light
        </button>
        <button onClick={() => themeStore.setTheme('dark')}>
          set theme: dark
        </button>
      </>
    )
  });

  export default ThemeToggler;