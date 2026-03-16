// A simple login simulation

import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const AuthNode = ({ id }) => {
    const handles = [
        {type: 'target', position: Position.Left, id: 'user'},
        {type: 'source', position: Position.Right, id: 'success'}  
    ];

    return (
        <BaseNode id={id} label="Authentication" handles={handles}>
            <div style={{ fontSize: '11px' }}>
                Requires API key:
                <input type="password" placeholder="****" style={{width: '90%'}}/>
            </div>
        </BaseNode>
    );
};