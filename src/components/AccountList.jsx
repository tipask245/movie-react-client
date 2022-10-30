import React from 'react'

const AccountList = ({setCurrentList, currentList}) => {

  const isCurrent = (param) => {
    if (currentList === param) {
      return 'account__body_list__active'
    } 
  }

  return (
    <ul className="account__body_list">
      <li>
        <button className={isCurrent('reviews')} onClick={() => setCurrentList('reviews')}>Рецензии</button>
      </li>
      <li>
        <button className={isCurrent('marks') }onClick={() => setCurrentList('marks')}>Оценки</button>
      </li>
      <li>
        <button className={isCurrent('watched')} onClick={() => setCurrentList('watched')}>Просмотрено</button>
      </li>
      <li>
        <button className={isCurrent('willWatch')} onClick={() => setCurrentList('willWatch')}>Буду смотреть</button>
      </li>
    </ul>
  )
}

export default AccountList