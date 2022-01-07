import React from 'react';

export default function LogIn(){

    return(
        <div className='container'>
            <form>
                <input type="text" placeholder='Nume'></input>
                <input type="text" placeholder='Password'></input>
                <button type="submit">LogIn</button>
                <a href="/register">Creaza-ti cont!</a>
            </form>
        </div>
    )
}