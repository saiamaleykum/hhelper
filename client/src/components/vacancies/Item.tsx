import './style.css';
import React from "react";
import {formatSalary} from '../../utils/main.ts'


const Item = (props) => {
    const goToProfile = () => {
        if (!props.modalActive) {
            props.setModalContent(props)
            props.setModalActive(true)
        }
    }

    return (
        <div className="item" onClick={goToProfile}>
            <div className="item-body">
                <div className="item-details">
                        <div className="item-name">
                            <p>{props.name}</p>
                        </div>
                    <div className="item-salary">
                         <p>{formatSalary(props.salary)}</p>
                    </div>
                </div>
            </div>
            {props.employer.logo_urls?.original && (
                <img 
                    src={props.employer.logo_urls.original} 
                    alt="Employer Photo" 
                    className="item-img" 
                />
            )}
            <div className="separator"/>
        </div>
    )
};

export default Item;
