import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createTool, updateTool } from '../../../store/tools';
import { useDispatch } from 'react-redux';
import { addImage } from '../../../store/images';
import { getTools } from '../../../store/tools';
import { readTool } from '../../../store/tools';
import CreateImage from '../../Images/CreateImage'
import { resetSingleTool } from '../../../store/tools';

function UpdateToolForm({ tool, toolImages }) {
    //const idx = useSelector(state => state.tools.tool);
    const navigate = useNavigate();
    const idx = tool.id
    const [address, setAddress] = useState(tool.address);
    const [city, setCity] = useState(tool.city);
    const [state, setState] = useState(tool.state);
    const [country, setCountry] = useState(tool.country);
    const [name, setName] = useState(tool.name);
    const [description, setDescription] = useState(tool.description);
    const [price, setPrice] = useState(tool.price);
    const [mainImg, setMainImg] = useState(toolImages[0].url);
    const [img2, setImg2] = useState(toolImages[1].url);
    const [img3, setImg3] = useState(toolImages[2].url);
    const [img4, setImg4] = useState(toolImages[3].url);
    const [img5, setImg5] = useState(toolImages[4].url);
    const [validationErrors, setValidationErrors] = useState([]);
    const [successfulSubmit, setSuccessfullSubmit] = useState(false);
    const [postErrors, setPostErrors] = useState([]);

    const dispatch = useDispatch();



    useEffect(() => {
        const errors = [];

        if (!address.length) errors.push(' is required');
        if (!city.length) errors.push(' is required');
        if (!state.length) errors.push(' is required');
        if (!country.length) errors.push(' is required');
        if (!name.length) errors.push(' is required');
        if (!description.length) errors.push(' is required');
        if (!price.length) errors.push(' is required');
        if (!mainImg.length) errors.push(' is required');
        setValidationErrors(errors);
    }, [address, city, state, country, name, description, price, mainImg])


    const onSubmit = e => {

        e.preventDefault();
        setSuccessfullSubmit(false)
        //if (validationErrors.length) return alert(`Cannot Submit`);

        const updatedTool = { address, city, state, country, name, description, price };
        const updatedImages = [{ id: toolImages[0].id, url: mainImg },
        { id: toolImages[1].id, url: img2 },
        { id: toolImages[2].id, url: img3 },
        { id: toolImages[3].id, url: img4 },
        { id: toolImages[4].id, url: img5 }]
        dispatch(updateTool(idx, updatedTool, updatedImages))

        navigate(`/tools/${idx}`);

    }
    return (
        <div className='toolForm'>
            <h1>Update Your Tool</h1>
            <h2>Where's your place located?</h2>
            <h3>Guests will only get your exact address once they booked a reservation.</h3>
            <form onSubmit={onSubmit}>
                <div className='toolLocation'>
                    <div className='country'>
                        <label >Country</label>
                        <input
                            placeholder="Country"
                            type='text'
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                        />
                    </div>
                    <div className='address'>
                        <label >Street Address</label>
                        <input
                            placeholder="Address"
                            type='text'
                            onChange={e => setAddress(e.target.value)}
                            value={address}
                        />
                    </div>
                    <div className='city'>
                        <label>City</label>
                        <input
                            placeholder="City"
                            type='text'
                            onChange={e => setCity(e.target.value)}
                            value={city}
                        />
                    </div>
                    <div className='state'>
                        <label >State</label>
                        <input
                            placeholder="STATE"
                            type='text'
                            onChange={e => setState(e.target.value)}
                            value={state}
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
                </div>
                <div className='toolTitle'>
                    <h2>Create a title for your tool</h2>
                    <h3>Catch guests' attention with a tool title that highlights what makes your place special.</h3>
                    <textarea
                        placeholder="Name of your tool"
                        onChange={e => setName(e.target.value)}
                        value={name}
                    />
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
                </div>
                <div className='toolPhotos'>
                    <h2>Liven up your tool with photos</h2>
                    <h3>Submit a link to at least one photo to publish your tool.</h3>
                    <textarea
                        placeholder="Preview Image URL"
                        onChange={e => setMainImg(e.target.value)}
                        value={mainImg}
                    />
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
                    <button>Update Tool</button>
                </div>
            </form>
        </div>
    );

}

export default UpdateToolForm;