import React from 'react';

export default function Register(){
    return(
        <div>
            <form>
                <input type="text" placeholder='Nume'></input>
                <input type="text" placeholder='Password'></input>
                <input type="text" placeholder='email'></input>
                <button type="submit">Register</button>
                
            </form>
        </div>
    )
}