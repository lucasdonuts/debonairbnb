import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from 'uuid';
import ItemCard from "../item/ItemCard";
import Loading from '../Loading';

const UserItems = () => {
  const { currentUser: user, isLoading } = useSelector( state => state.user );
  const [ currentRentals, setCurrentRentals ] = useState([]);
  const [ pastRentals, setPastRentals ] = useState([]);

  useEffect( () => {
    setCurrentRentals(user.rentals.map( rental =>{
      if(rental.current){
        return <ItemCard item={rental.item} key={uuid()} />
      }
    }))

    setPastRentals(user.rentals.map( rental =>{
      if(!rental.current){
        return <ItemCard item={rental.item} key={uuid()} />
      }
    }))
  }, [user])

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
