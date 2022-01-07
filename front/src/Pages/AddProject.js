import React from "react";

export default function AddProject(){
    return(
        <div>
            <input type="text" placeholder="Project Name"></input>
            <input type="text" placeholder="Repozitory Link"></input>
           {/* TODO  https://redux-form.com/8.3.0/examples/fieldarrays/*/}
           <button type="submit">Send</button>
        </div>
    )
}