import ToolForm from "../ToolForm"
import { useDispatch } from 'react-redux';
import { resetSingleTool } from "../../../store/tools";

const CreateTool = () => {
    const dispatch = useDispatch();
    dispatch(resetSingleTool());

    const tool = {
        address: '',
        city: '',
        state: '',
        country: '',
        lat: '',
        lng: '',
        name: '',
        description: '',
        price: ''
    }

    return (<ToolForm tool={tool} />);
}

export default CreateTool;
