import React, { useState, useEffect } from 'react';


function Form(){

    useEffect(() => {
        fetch('api')
        .then((response) =>{

        })
        .catch((error) =>{
            
        }
    },

    [])

    return(
        <form>
            <label>Username</label>
            <input type="text" />
        </form>
    )
}


export default Form