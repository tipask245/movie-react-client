import React from 'react'
import nf from '../nf.jpg'

const AccountInfo = () => {
  return (
    <div className="account__info">
      <div className="account__avatar_wrap">
        <img className='account__avatar' src={nf} alt="" />
        <button className="account__change_avatar">Изменить аватар</button>
      </div>
      <h1 className='account_name'>{localStorage.getItem('name')}</h1>
    </div>
  )
}

export default AccountInfo