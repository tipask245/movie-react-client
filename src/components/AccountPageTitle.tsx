import React from 'react'

interface TitleProps {
  title: string
}

const AccountPageTitle: React.FC<TitleProps>= ({title}: TitleProps) => {
  
  const titleObj: object = {
    will_watch: 'Буду смотреть',
    watched: 'Просмотрено',
    reviews: 'Рецензии',
    marks: 'Оценки'
  }

  return (
    <h3 className="account__title">{titleObj[title as keyof typeof titleObj]}</h3>
  )
}

export default AccountPageTitle