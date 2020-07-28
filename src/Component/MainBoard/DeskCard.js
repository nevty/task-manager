import React from "react";
import {Link} from "react-router-dom";
import {Card} from "../../styled/Components";


const DeskCard = ({ title,id }) => {
    return (
        <Link to={`desk/${id}`}>
            <Card>
                <h3>{title}</h3>
            </Card>
        </Link>
    )
}

export default DeskCard