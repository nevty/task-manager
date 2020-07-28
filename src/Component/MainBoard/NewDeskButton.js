import React, {useRef, useState} from "react";
import {storageAPI} from "../../api/api";
import {Button, Card} from "../../styled/Components";


const NewDeskButton = ({ setDesks }) => {
    const newDeskInput = useRef(null);
    const [toggleState, toggle] = useState(false);

    const handleCreateDesk = () => {
        let value = newDeskInput.current.value;
        if (value && value.trim()) {
            storageAPI.createDesk({ title: value});
            setDesks(storageAPI.getDesks())
        }
        newDeskInput.current.value = "";
    }

    return (
        <Card className="desk desk_create">
            {
                !toggleState && <>

                    <Button onClick={() => toggle(true)}>
                        Создать доску
                    </Button>
                </>
            }
            {
                toggleState && <>
                    <input placeholder="Название доски" ref={newDeskInput}
                           onKeyDown={(event => event.key === "Enter" ? handleCreateDesk() : null)}/>
                    <Button onClick={() => toggle(false)}>
                        Отменить
                    </Button>
                    <Button  onClick={handleCreateDesk}>
                        Создать
                    </Button>
                </>
            }
        </Card>
    )
}

export default NewDeskButton