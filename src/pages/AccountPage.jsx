import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AccountInfo from '../components/AccountInfo'
import AccountList from '../components/AccountList'
import AccountReview from '../components/Cards/Account/AccountReviewCard'
import './AccountPage.scss'
import './AccountBody.scss'
import AccountPageTitle from '../components/AccountPageTitle'
import { AuthContext } from '../context'
import AccountMovieCard from '../components/Cards/Account/AccountMovieCard'

const AccountPage = () => {

  const {userInf, setUserInf, isUserInfLoaded} = useContext(AuthContext)
  const [currentList, setCurrentList] = useState('reviews')
  
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

  const deleteReview = (filmId, _id) => {
    setUserInf({...userInf, reviews: userInf.reviews.filter(el => el.id !== _id)})
    axios.delete('http://localhost:5000/movie/delete_review', { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: {
        filmId,
        _id 
      }
    }).catch((e) => console.log(e))
  }
  
  const deleteMovieInList = (filmId, listName) => {
    setUserInf({...userInf, [listName]: userInf[listName].filter(el => el.id !== filmId)})
    axios.delete('http://localhost:5000/movie/remove_from_list', { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: { 
        id: filmId,
        listName
      }
    }).catch((e) => console.log(e))
  }

  return (
    
    isUserInfLoaded &&
    <section className="AccountPage">
      <AccountInfo/>
      <hr />
      <div className="account__body_wrap">
        <div className="account__body">
          <AccountPageTitle title={currentList} />
          {
            // isLoaded &&
              userInf[currentList].length !== 0 
                ? userInf[currentList].reverse().map(el => (
                  currentList === 'reviews'
                  ? 
                    <AccountReview 
                      filmImg={el.img}
                      filmTitle={el.filmTitle}
                      filmRating={el.filmRating} 
                      reviewTitle={el.reviewTitle} 
                      reviewBody={el.reviewBody}
                      reviewId={el._id}
                      filmId={el.filmId}  
                      deleteReview={deleteReview}
                      key={el.id} 
                    />
                  : <AccountMovieCard 
                      filmImg={el.img}
                      filmTitle={el.title}
                      filmRating={el.rating}
                      filmId={el.id} 
                      deleteMovie={true}
                      deleteMovieInList={deleteMovieInList}
                      listName={currentList}
                      key={el.id} 
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