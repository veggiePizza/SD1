import { csrfFetch } from "./csrf";
import { addImage, updateImage, deleteImage } from "./images";

const LOAD = 'tools/LOAD';
const CREATE = 'tools/CREATE';
const READ = 'tools/READ';
const UPDATE = 'tools/UPDATE'
const DELETE = 'tools/DELETE';
const RESET_TOOL = 'tools/RESET_TOOL'

const resetTool = () => ({
    type: RESET_TOOL,
});

const loadTools = tools => ({
    type: LOAD,
    tools
});
const createOneTool = tool => ({
    type: CREATE,
    tool
});
const readOneTool = tool => ({
    type: READ,
    tool
});
const updateOneTool = tool => ({
    type: UPDATE,
    tool
});
const deleteOneTool = id => ({
    type: DELETE,
    id
});

export const resetSingleTool = () => async dispatch => {
    dispatch(resetTool())
}
export const getTools = () => async dispatch => {
    const response = await csrfFetch(`/api/tools`);
    if (response.ok) {
        const tools = await response.json();
        dispatch(loadTools(tools.Tools));
    }
};
export const createTool = (tool,images) => async dispatch => {
    console.log(tool)
    const response = await csrfFetch(`/api/tools`, {
        method: 'POST',
        body: JSON.stringify(tool)
    });
    if (response.ok) {
        const newTool = await response.json();
        dispatch(createOneTool(newTool))

        images.forEach(img => {
            if(img)
                dispatch(addImage(newTool.id,img))
        });
    }
}

export const readTool = (id) => async dispatch => {
    const response = await csrfFetch(`/api/tools/${id}`);
    if (response.ok) {
        const tool = await response.json();
        dispatch(readOneTool(tool));
    }
};

export const updateTool = (id, tool, images) => async dispatch => {
    const response = await csrfFetch(`/api/tools/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tool)
    });
    
    if (response.ok) {
        images.forEach(img => {
            if(img.url){
                if(img.id) dispatch(updateImage(img.id, img.url))
                else dispatch(addImage(id,img.url))
            }else if(img.id) dispatch(deleteImage(img.id))
        });
    }
    dispatch(readTool(id))
};


export const deleteTool = (id) => async dispatch => {
    const response = await csrfFetch(`/api/tools/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        dispatch(deleteOneTool(id));
    }
};
export const getUserTools = () => async dispatch => {
    const response = await csrfFetch(`/api/tools/current`);
    if (response.ok) {
        const tools = await response.json();
        dispatch(loadTools(tools));
    }
};

const initialState = { tools: [], isLoading: true };

const tools = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const allTools = {}
            action.tools.forEach(tool => {
                allTools[tool.id] = tool
            });
            return {
                ...state, tools: allTools
            };
        case READ:
            const newState = { ...state, tool: action.tool };
            return newState;
        case DELETE:
           
            const newState2 = { ...state };
            console.log(newState2.tools)
            console.log(newState2.tools[action.id])
            delete newState2.tools[action.id];
            return newState2;
        case CREATE:
            const addedToolState = { ...state, tool: action.tool };
            //newState[action.id];
            return addedToolState;
        case RESET_TOOL:
            return initialState
        default:
            return state;
    }

}

export default tools;