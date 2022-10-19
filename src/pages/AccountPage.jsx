import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import AccountList from '../components/AccountList'
import AccountReview from '../components/Cards/AccountReviewCard'
import './AccountPage.scss'
import './AccountBody.scss'
import AccountPageTitle from '../components/AccountPageTitle'
import { AuthContext } from '../context'

const AccountPage = () => {

  const {userInf, setUserInf, userInfIsLoaded} = useContext(AuthContext)
  const [currentList, setCurrentList] = useState('reviews')
  // const [isLoaded, setIsLoaded] = useState(false)
  
  // const fetchUserInfo = async () => {
  //   const config = {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem('token')}`
  //     }
  //   }
  //   await axios.post('http://localhost:5000/auth/getUserInformation', {id: localStorage.getItem('id')}, config).then((res) => setUserInf(res.data)).catch(() => {
  //     console.log('error');
  //   })
  //   setIsLoaded(true)
  // }

  // useEffect(() => {
  //   fetchUserInfo()
  // }, [])
  console.log(userInfIsLoaded);

  return (
    
    userInfIsLoaded &&
    <section className="AccountPage">
      <AccountInfo/>
      <hr />
      <div className="account__body_wrap">
        <div className="account__body">
          <AccountPageTitle title={currentList} />
          {
            // isLoaded &&
              userInf.userInf[currentList].length !== 0 
                ? userInf.userInf[currentList].map(el => ( 
                    // <div className="abc">
                    //   <h4>{el.reviewTitle}</h4>
                    // </div>
                    <AccountReview 
                      filmImg={el.filmImg}
                      filmTitle={el.filmTitle}
                      filmRating={el.filmRating} 
                      reviewTitle={el.reviewTitle} 
                      reviewBody={el.reviewBody}
                      _id={el.filmId}  
                      key={el._id} 
                    />
                  ))
                : <p className="account__body__not_found">Ничего не найдено</p>
          }
        </div>
        <AccountList setCurrentList={setCurrentList} currentList={currentList}/>
      </div>

    </section>
        
  )
}

export default AccountPage