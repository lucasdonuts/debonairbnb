import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import ItemCard from "../item/ItemCard";
import Loading from '../Loading';

const UserItems = () => {
  const { currentUser: user, isLoading } = useSelector( state => state.user );
  const [ itemCards, setItemCards ] = useState([]);
  const [ currentRentals, setCurrentRentals ] = useState([]);
  const [ pastRentals, setPastRentals ] = useState([]);

  useEffect( () => {
    setItemCards(user.rentals.map( rental => <ItemCard item={rental.item} current={rental.current} key={uuid()} /> ))
  }, [])

  useEffect( () => {
    setCurrentRentals(itemCards.filter( card => card.props.current ))
    setPastRentals(itemCards.filter( card => !card.props.current ))
  }, [itemCards])

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <h1 className="is-size-2 is-honeydew-color is-brand-font has-text-left">Current</h1>
      <hr className="divider"></hr>
      <div className="columns is-multiline is-centered is-variable is-1">
        {currentRentals}
      </div>
      <h1 className="is-size-2 is-honeydew-color is-brand-font has-text-left">Past Rentals</h1>
      <hr className="divider"></hr>
      <div className="columns is-multiline is-centered is-variable is-1">
        {pastRentals}
      </div>
    </>
  );
};

export default UserItems;
