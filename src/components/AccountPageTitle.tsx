import React from 'react'


interface ITitleObj {
  will_watch: string,
  watched: string,
  reviews: string,
  marks: string
}

interface IAccountPageTitleProp {
  title: keyof ITitleObj
}

const AccountPageTitle: React.FC<IAccountPageTitleProp>= ({title}: IAccountPageTitleProp) => {
  
  const titleObj: ITitleObj = {
    will_watch: 'Буду смотреть',
    watched: 'Просмотрено',
    reviews: 'Рецензии',
    marks: 'Оценки'
  }

  return (
    <h3 className="account__title">{titleObj[title]}</h3>
  )
}

export default AccountPageTitle