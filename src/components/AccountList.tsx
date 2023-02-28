import React from 'react'

interface IAccountListProps {
  setCurrentList: React.Dispatch<React.SetStateAction<string>>;
  currentList: string
}

const AccountList: React.FC<IAccountListProps> = ({setCurrentList, currentList}) => {

  const isCurrent = (param: string) => {
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
        <button className={isCurrent('will_watch')} onClick={() => setCurrentList('will_watch')}>Буду смотреть</button>
      </li>
    </ul>
  )
}

export default AccountList