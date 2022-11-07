import React, { useCallback, useContext  } from 'react'
import classes from './SubmitImgForm.module.scss'
import axios from 'axios'
import { AuthContext } from '../../context'

const SubmitImgForm = ({photo, setDrag, setPhoto, setIsDrop, setVisible}) => {
  
  const {setUserInf, userInf} = useContext(AuthContext)

  console.log(photo[0])
  const fileName = photo[0].name.split('.')
  console.log(fileName[fileName.length - 1]);
  const submitImg = useCallback(async () => {
    try {
      const data = new FormData()
      data.append('avatar', photo[0], `${localStorage.getItem('name')}.${fileName[fileName.length - 1]}`)
      console.log(data)
      let res = await axios.post(
        'http://localhost:5000/auth/upload_image', 
        data,  
        {headers: {
          'content-type': 'multipart/form-data',
          username: localStorage.getItem('name')
        }}
      )
      setUserInf({...userInf, avatar: res.data})
      setDrag(false)
      setPhoto(null)
      setIsDrop(false)
      setVisible(false)
    } catch(e) {
      console.log(e)
      throw e
    }
  })

  return (
    <>
      <img src={URL.createObjectURL(photo[0])} alt="" className={classes.img_preview}/>
      <div className={classes.buttons}>
        <button className={classes.submit_button} onClick={() => submitImg()}>Сохранить</button>
        <button className={classes.cancel_button} onClick={() => {
          setDrag(false)
          setPhoto(null)
          setIsDrop(false)
        }}>Отмена</button>
      </div>
    </>
  )
}

export default SubmitImgForm