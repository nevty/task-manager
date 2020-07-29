import React from "react";
import {Link} from "react-router-dom";
import {Card} from "../../styled/Components";


const DeskCard = ({ title,id }) => {
    return (
        <Card>
            <h3>{title}</h3>
            <Link to={`desk/${id}`} className="desk_link"/>
        </Card>
    )
}

export default DeskCard