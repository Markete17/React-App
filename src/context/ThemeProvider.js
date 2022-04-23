import React from 'react'

export const ThemeContext = React.createContext()

const ThemeProvider = (props) => {

    const themes = {
        color: '#000',
        background: '#fff'
    }
    const [theme,setTheme] = React.useState(themes)

    React.useEffect( () => {
        if(localStorage.getItem('localTheme')){
            const localTheme = JSON.parse(localStorage.getItem('localTheme'))
            setTheme(localTheme)
        }
    },[])

    const changeColor = value => {
        setTheme(value)
        localStorage.setItem('localTheme',JSON.stringify(value))
    }

  return (
    <ThemeContext.Provider value={{theme,changeColor}}>
        {props.children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider