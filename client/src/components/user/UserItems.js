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

  console.log( "Item Cards: ", itemCards )
  console.log( "Current Rentals: ", currentRentals )

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <h1 className="title has-text-white has-text-centered">Currently Renting</h1>
      <div className="columns is-multiline is-centered">
        {currentRentals}
      </div>
      <h1 className="title has-text-white has-text-centered">Past Rentals</h1>
      <div className="columns is-multiline is-centered">
        {pastRentals}
      </div>
    </>
  );
};

export default UserItems;
