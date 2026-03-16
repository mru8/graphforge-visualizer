// to represent storage

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const DatabaseNode = ({ id }) => {
    const handles = [{ type: 'target', position: Position.Left, id: 'data '}];

    return (
        <BaseNode id={id} label="Database" handles={handles}>
            <select style={{ width: '100%'}}>
                <option>MySQL</option>
                <option>PostgreSQL</option>
                <option>MongoDB</option>
            </select>
            <div style={{ fontSize: '10px', marginTop: '5px' }}>Save incoming data</div>
        </BaseNode>
    );
};