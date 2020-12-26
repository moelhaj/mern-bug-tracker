import React, { useContext, useEffect, useState } from "react";
import { Global } from "../../Contexts/Global";
import Tasks from "../Project/Components/Tasks";
import Loader from "../Shared/Loader";

function Todos() {

    const { todos } = useContext(Global);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, [])

    return <>
        {loading ? <Loader /> : <div className="todos p1">
            <h1>Todos</h1>
            { todos.length <= 0 && <h3 className="mt-1 mb-1">Nothing to todo :)</h3>}
            {todos.length > 0 && <Tasks onFormSubmit={loading => setLoading(loading)} tasks={todos} />}
        </div>
        }
    </>;
}

export default Todos