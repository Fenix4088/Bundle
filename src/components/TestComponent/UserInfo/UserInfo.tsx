import React from 'react';
import { useDispatch } from 'react-redux';
import { InitialState as NewInfo } from '@/store/UserInfo/userInfo.reducer';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import styles from './UserInfo.module.scss';

const UserInfo: React.FC = () => {
  const dispatch = useDispatch();
  const currentUserInfo = useTypedSelector((state) => state.userInfo);

  const isUserInfoEmpty = !!currentUserInfo.name && !!currentUserInfo.favouriteFood && !!currentUserInfo.age;

  const [newInfo, setNewInfo] = React.useState<NewInfo>({
    name: '',
    favouriteFood: '',
    age: 0,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'SET_USER_INFO', info: { ...newInfo } });
  };

  const onChangeHandler = ({ currentTarget: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    setNewInfo((info) => ({ ...info, [name]: value }));
  };

  return (
    <>
      <form onSubmit={onSubmit} className={styles['form']}>
        <h3>Edit user Info</h3>
        <div className={styles['fields']}>
          <label>
            <span>Name</span>
            <input value={newInfo.name} type="text" name="name" onChange={onChangeHandler} />
          </label>
          <label>
            <span>Favourite Food</span>
            <input value={newInfo.favouriteFood} type="text" name="favouriteFood" onChange={onChangeHandler} />
          </label>
          <label>
            <span>Age</span>
            <input value={newInfo.age} type="number" name="age" onChange={onChangeHandler} />
          </label>
        </div>
        <div className={styles['btn-group']}>
          <button className={styles['btn']}>Submit</button>
          <button className={styles['btn']} type="button">
            Clear
          </button>
          <button className={styles['btn']} type="button">
            Delete Info
          </button>
        </div>
      </form>
      <div className={styles['info']}>
        <h4>Current info</h4>
        {isUserInfoEmpty && (
          <ul>
            <li>Name: {currentUserInfo.name}</li>
            <li>Favourite Food: {currentUserInfo.favouriteFood}</li>
            <li>Age: {currentUserInfo.age}</li>
          </ul>
        )}
      </div>
    </>
  );
};

UserInfo.displayName = UserInfo.name;

export { UserInfo };
