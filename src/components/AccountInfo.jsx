import { useContext, useState } from 'react'
import { AuthContext } from '../context'
import nf from '../nf.jpg'
import UploadImgForm from './Forms/UploadImgForm'
import Modal from './UI/modals/Modal'
import { apiUrl } from '../config'

const AccountInfo = () => {

  const [modal, setModal] = useState(false)
  const {userInf} = useContext(AuthContext)

  console.log('info render');
  return (
    <section className="account__info">
      <div className="account__avatar_wrap">
        <img className='account__avatar' src={userInf.avatar ? `${apiUrl}/${userInf.avatar}` : nf} alt="" />
        <button className="account__change_avatar" onClick={() => setModal(true)}>Изменить аватар</button>
        <Modal visible={modal} setVisible={setModal}>
          <UploadImgForm setVisible={setModal}/>
        </Modal>
      </div>
      <h1 className='account_name'>{localStorage.getItem('name')}</h1>
    </section>
  )
}

export default AccountInfo