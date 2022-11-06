import React, { useState } from 'react'
import nf from '../nf.jpg'
import Modal from './UI/Modals/Modal'

const AccountInfo = () => {
   const [modal, setModal] = useState(false)

  return (
    <div className="account__info">
      <div className="account__avatar_wrap">
        <img className='account__avatar' src={nf} alt="" />
        <button className="account__change_avatar" onClick={() => setModal(true)}>Изменить аватар</button>
        <Modal visible={modal} setVisible={setModal}>

        </Modal>
      </div>
      <h1 className='account_name'>{localStorage.getItem('name')}</h1>
    </div>
  )
}

export default AccountInfo