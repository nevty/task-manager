import React, {useState} from 'react';
import './App.css';
import MainBoard from "./Component/MainBoard/MainBoard";
import {Route} from "react-router-dom";
import DeskBoard from "./Component/DeskBoard/DeskBoard";

function App({ history }) {
    const [collapse,toggleCollapse] = useState(false);
    const handleCollapse = collapsed=>toggleCollapse(collapsed);
    return (
        <div className="Layout">
            <div className="Layout">
                <div className="Sider">
                    <div className="Menu">

                    </div>
                </div>
                <div className="Content">
                    <Route path="/" exact component={MainBoard}/>
                    <Route path="/desk/:id" component={DeskBoard}/>
                </div>
            </div>
        </div>
    );
}

export default App;
