import { useState } from "react";
import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

// Defaulting to 5 seconds so the user has time to see what's happening
export const TimerNode = ({ id }) => {
    const [seconds, setSeconds] = useState(5);
    const handles = [
        { type: 'target', position: Position.Left, id: 'in'},
        { type: 'source', position: Position.Right, id: 'out'}
    ];

    return (
        <BaseNode id={id} label="Timer" handles={handles}>
            <label style={{ fontSize: '12px' }}>
                Wait (sec):
                <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                style={{width: '50px', marginLeft: '5px'}}
            />
            </label>
        </BaseNode>
    );
};