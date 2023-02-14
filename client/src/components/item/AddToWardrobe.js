import { useState, useEffect } from 'react';
import NewItemForm from './NewItemForm';
import NewItemPreview from './NewItemPreview';

const AddToWardrobe = () => {


  return(
    <div className="box columns is-centered">
      <div className="column">
        <NewItemForm />
      </div>
        {/* Vertical Divider */}
      <div className="vertical-divider">
        <div className="center-element"></div>
      </div>
      <div className="column">
        <NewItemPreview />
      </div>
    </div>
  )
}

export default AddToWardrobe;