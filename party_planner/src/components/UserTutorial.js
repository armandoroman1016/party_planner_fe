import React, { useState } from "react";
import { Button } from "semantic-ui-react";
const messages = {
    firstEvent: "Welcome to Celebratr! Click here to create your first event.",
};

export default function UserTutorial({ actionType }) {
    const [show, setShow] = useState(true);
    const message = messages[`${actionType}`];

    return (
        <div className="tutorial">
            {show && message && (
                <div className="inner">
                    <p>{message}</p>
                    <Button>Close</Button>
                </div>
            )}
        </div>
    );
}
