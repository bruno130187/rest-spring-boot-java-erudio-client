import React from 'react';

export default function Header(props) {
    return (
        <header>
            {(props.title !== null && props.title !== "") ? props.title : "Client Rest Udemy Default"}
            <br/>
            Counter: {props.counter}
        </header>
    );
}