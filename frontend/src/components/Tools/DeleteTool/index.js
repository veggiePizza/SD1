import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTool } from "../../../store/tools";
import { useModal } from "../../../context/Modal";
import { getUserTools } from "../../../store/tools";

function DeleteTool(id){
    const [confirm, setConfirm] = useState("");
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    if (confirm === "delete") {
        dispatch(deleteTool(id.id)).then(closeModal);
        dispatch(getUserTools())
    }
    else if (confirm === "keep") {
        closeModal()
    }


    return(
        <div className="confirmDelete">
            <h1>Confirm Delete</h1>
            <h2>Are you sure you want to remove this tool from the listings?</h2>
            <button className = "confirmDelete" onClick={() => setConfirm("delete")}>Yes (Delete Tool)</button>
            <button className = "cancelDelete"onClick={() => setConfirm("keep")}>No (Keep Tool)</button>
        </div>
    )
}

export default DeleteTool