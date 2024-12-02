import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addImage } from '../../store/images';
import { createTool, updateTool, getTools, readTool } from '../../store/tools';

function CreateImage() {
    const tool = useSelector(state => state.tools.tool);
    console.log("crating image")
    console.log(tool)
    console.log("crating image")

}

export default CreateImage