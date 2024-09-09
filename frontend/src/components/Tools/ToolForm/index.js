import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTool, updateTool } from '../../../store/tools';
import { useDispatch } from 'react-redux';
import "./index.css";

function ToolForm({ tool }) {
    const idx = useSelector(state => state.tools.tool);
    const navigate = useNavigate();
    const [address, setAddress] = useState(tool.address);
    const [city, setCity] = useState(tool.city);
    const [state, setState] = useState(tool.state);
    const [country, setCountry] = useState(tool.country);
    const [lat, setLat] = useState(tool.lat);
    const [lng, setLng] = useState(tool.lng);
    const [name, setName] = useState(tool.name);
    const [description, setDescription] = useState(tool.description);
    const [price, setPrice] = useState(tool.price);
    const [mainImg, setMainImg] = useState('');
    const [img2, setImg2] = useState('');
    const [img3, setImg3] = useState('');
    const [img4, setImg4] = useState('');
    const [img5, setImg5] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [successfulSubmit, setSuccessfullSubmit] = useState(false);
    const [postErrors, setPostErrors] = useState([]);

    const dispatch = useDispatch();



    useEffect(() => {
        const errors = {};

        if (!address.length) errors.address = 'Address is required';
        if (!city.length) errors.city = 'City is required';
        if (!state.length) errors.state = 'State is required';
        if (!country.length) errors.country = 'Country is required';
        if (!lat.length) errors.latitude = 'Latitude is required';
        if (!lng.length) errors.longitude = 'Longitude is required';
        if (!name.length) errors.name = 'Name is required';
        if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters';
        if (!price.length) errors.price = 'Price is required';
        if (!mainImg.length) errors.image = 'Preview image is required';
        setValidationErrors(errors);
    }, [address, city, state, country, lat, lng, name, description, price, mainImg])


    const onSubmit = e => {
        e.preventDefault();
        setPostErrors(validationErrors)
        setSuccessfullSubmit(false)
        tool = { ...tool, address, city, state, country, lat, lng, name, description, price };
        const tool2 = {
            address: "1542"
            , city: "dallas"
            , state: "tx"
            , country: "usa"
            , lat: 76.5
            , lng: 67.8
            , name: "alex"
            , description: "tool"
            , price: 400

        }
        const toolImages = [mainImg, img2, img3, img4, img5]
       const toolImages2 = ["/api/images/lendit.png"]
       // if (!Object.keys(postErrors).length) dispatch(createTool(tool, toolImages))
            dispatch(createTool(tool2, toolImages2))
    }

    if (idx) {
        navigate(`/tools/${idx.id}`);
    }

    return (
        <div className='toolForm'>
            <h1>Create A New Tool</h1>
            <h2>Where's your place located?</h2>
            <h3>Guests will only get your exact address once they booked a reservation.</h3>
            <form onSubmit={onSubmit}>
                <div className='toolLocation'>
                    <div className='country'>
                        <label >Country</label>
                        {'country' in validationErrors && <label className='errorLabel'>{postErrors.country}</label>}
                        <input
                            placeholder="Country"
                            type='text'
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                        />
                    </div>
                    <div className='address'>
                        <label >Street Address</label>
                        {'address' in validationErrors && <label className='errorLabel'>{postErrors.address}</label>}
                        <input
                            placeholder="Address"
                            type='text'
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                    <div className='city'>
                        <label>City</label>
                        {'city' in validationErrors && <label className='errorLabel'>{postErrors.city}</label>}
                        <input
                            placeholder="City"
                            type='text'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                        />
                    </div>
                    <div className='state'>
                        <label >State</label>
                        {'state' in validationErrors && <label className='errorLabel'>{postErrors.state}</label>}
                        <input
                            placeholder="STATE"
                            type='text'
                            onChange={e => setState(e.target.value)}
                            value={state}
                        />
                    </div>
                    <div className='lat'>
                        <label>Latitude</label>
                        {'latitude' in validationErrors && <label className='errorLabel'>{postErrors.latitude}</label>}
                        <input
                            placeholder="Latitude"
                            type='text'
                            onChange={e => setLat(e.target.value)}
                            value={lat}
                        />
                    </div>
                    <div className='lng'>
                        <label >Longitude</label>
                        {'longitude' in validationErrors && <label className='errorLabel'>{postErrors.longitude}</label>}
                        <input
                            placeholder="Longitude"
                            type='text'
                            onChange={e => setLng(e.target.value)}
                            value={lng}
                        />
                    </div>
                </div>
                <div className='toolDescription'>
                    <h2>Describe your place to guests</h2>
                    <h3>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood.</h3>
                    <textarea
                        placeholder="Description"
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    />
                    {'description' in validationErrors && <label className='errorLabel'>{postErrors.description}</label>}

                </div>
                <div className='toolTitle'>
                    <h2>Create a title for your tool</h2>
                    <h3>Catch guests' attention with a tool title that highlights what makes your place special.</h3>
                    <textarea
                        placeholder="Name of your tool"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
                    {'name' in validationErrors && <label className='errorLabel'>{postErrors.name}</label>}

                </div>
                <div className='toolPrice'>
                    <h2>Set a base price for your tool</h2>
                    <h3>Competitive pricing can help your listing stand out and rank higher in search results.</h3>
                    <div>
                        <h4>$</h4>
                        <textarea
                            placeholder="Price per night (USD)"
                            name='comments'
                            onChange={e => setPrice(e.target.value)}
                            value={price}
                        />

                    </div>
                    {'price' in validationErrors && <label className='errorLabel'>{postErrors.price}</label>}

                </div>
                <div className='toolPhotos'>
                    <h2>Liven up your tool with photos</h2>
                    <h3>Submit a link to at least one photo to publish your tool.</h3>
                    <textarea
                        placeholder="Preview Image URL"
                        onChange={e => setMainImg(e.target.value)}
                        value={mainImg}
                    />
                    {'image' in validationErrors && <label className='errorLabel'>{postErrors.image}</label>}

                    <textarea
                        placeholder="Image URL"
                        onChange={e => setImg2(e.target.value)}
                        value={img2}
                    />
                    <textarea
                        placeholder="Image URL"
                        onChange={e => setImg3(e.target.value)}
                        value={img3}
                    />
                    <textarea
                        placeholder="Image URL"
                        onChange={e => setImg4(e.target.value)}
                        value={img4}
                    />
                    <textarea
                        placeholder="Image URL"
                        onChange={e => setImg5(e.target.value)}
                        value={img5}
                    />
                </div>
                <div className='submitUpdate'>
                    <button>Create Tool</button>
                </div>
            </form>
        </div>
    );
}

export default ToolForm;


/*


*/