import React from 'react'

const AccountPageTitle = ({title}) => {

  const titleObj = {
    willWatch: 'Буду смотреть',
    watched: 'Просмотрено',
    reviews: 'Рецензии',
    marks: 'Оценки'
  }

  return (
    <h3 className="account__title">{titleObj[title]}</h3>
  )
}

export default AccountPageTitle