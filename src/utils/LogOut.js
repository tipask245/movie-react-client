export const logOut = (setRole, setUserInf, setIsUserInfLoaded, setIsAuth) => {
  localStorage.removeItem('token')
  setRole('')
  setIsUserInfLoaded(false)
  setUserInf([])
  localStorage.removeItem('name')
  localStorage.removeItem('id')
  setIsAuth(false)
} 