import UpdateToolForm from '../UpdateToolForm';
import { useDispatch } from 'react-redux';
import { readTool } from "../../../store/tools";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';

const UpdateTool = () => {
    const { id } = useParams();
    const currTool = useSelector(state => state.tools.tool);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(readTool(id));
    }, []);

    if (currTool && currTool.id == id) {
        const tool = {
            id: currTool.id,
            address: currTool.address,
            city: currTool.city,
            state: currTool.state,
            country: currTool.country,
            lat: currTool.lat,
            lng: currTool.lng,
            name: currTool.name,
            description: currTool.description,
            price: currTool.price
        }

        const toolImages = currTool.ToolImages;
        for (let i = currTool.ToolImages.length; i < 5; i++) {
            toolImages.push({ id: null, url: "" })
        }
        
        return (<UpdateToolForm tool={tool} toolImages={toolImages} />);
    }
}

export default UpdateTool;
