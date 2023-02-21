import { useState, useEffect } from 'react';
import NewItemForm from './NewItemForm';
import NewItemPreview from './NewItemPreview';

const AddToWardrobe = () => {
  const [previewData, setPreviewData] = useState({
    name: "",
    sex: "",
    category: "",
    size: "",
    price: 0,
    image: ""
  })

  const updatePreviewData = (name, value) => {
    setPreviewData({
      ...previewData,
      [name]: value
    })
  }

  return(
    <div className="box columns is-centered">
      <div className="column">
        <NewItemForm updatePreviewData={ updatePreviewData } />
      </div>
        {/* Vertical Divider */}
      {/* <div className="vertical-divider">
        <div className="center-element"></div>
      </div> */}
      <div className="column">
        <NewItemPreview previewData={ previewData } />
      </div>
    </div>
  )
}

export default AddToWardrobe;