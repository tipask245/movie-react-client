import { useContext, useState } from 'react'
import { AuthContext } from '../context'
import AccountInfo from '../components/AccountInfo'
import AccountList from '../components/AccountList'
import AccountReview from '../components/Cards/Account/AccountReviewCard'
import AccountPageTitle from '../components/AccountPageTitle'
import AccountMovieCard from '../components/Cards/Account/AccountMovieCard'
import movieAPI from '../api/movieAPI'
import './AccountPage.scss'
import './AccountBody.scss'

const AccountPage = () => {

  const {userInf, setUserInf, isUserInfLoaded} = useContext(AuthContext)
  const [currentList, setCurrentList] = useState('reviews')
  

  const deleteReview = (reviewId) => {
    setUserInf({...userInf, reviews: userInf.reviews.filter(el => el.id !== reviewId)})
    movieAPI.delete('/movie/delete_review', { 
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      data: {
        reviewId
      }
    }).catch((e) => console.log(e))
  }
  
  const deleteMovieInList = (filmId, listName) => {
    setUserInf({...userInf, [listName]: userInf[listName].filter(el => el.id !== filmId)})
    movieAPI.delete('/movie/remove_from_list', { 
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
                      filmTitle={el.title}
                      filmRating={el.rating} 
                      reviewTitle={el.review_title} 
                      reviewBody={el.review_body}
                      reviewId={el.id}
                      filmId={el.film_id}  
                      deleteReview={deleteReview}
                      key={el.id} 
                    />
                  : <AccountMovieCard 
                      filmImg={el.img}
                      filmTitle={el.title}
                      filmRating={el.rating}
                      filmId={el.id} 
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