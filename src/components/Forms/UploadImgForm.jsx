import React, { useState } from 'react'
import SubmitImgForm from './SubmitImgForm'
import classes from './UploadImgForm.module.scss'

const UploadImgForm = ({setVisible}) => {

  const [drag, setDrag] = useState(false)
  const [isDrop, setIsDrop] = useState(false)
  const [photo, setPhoto] = useState(null)
  
  const dragStart = (e) => {
    e.preventDefault()
    setDrag(true)
  }

  const dragLeave = (e) => {
    e.preventDefault()
    setDrag(false)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setPhoto(e.dataTransfer.files)
    console.log(photo)
    setIsDrop(true)
  }

  return (
    <div className={classes.upload_img_form}>
      {
        drag
        ? isDrop
          ? <SubmitImgForm photo={photo} setPhoto={setPhoto} setDrag={setDrag} setIsDrop={setIsDrop} setVisible={setVisible}/>
          : <div className={classes.drop_area}
              onDragStart={e => dragStart(e)}
              onDragLeave={e => dragLeave(e)}
              onDragOver={e => dragStart(e)}
              onDrop={e => onDrop(e)}
            >Отпустите фото</div>
        : <div className={classes.drag_area}
            onDragStart={e => dragStart(e)}
            onDragLeave={e => dragLeave(e)}
            onDragOver={e => dragStart(e)}
          >Перетащите фото <br/><span>PNG, JPG, SVG</span></div>
      }
    </div>
    
  )
}

export default UploadImgForm