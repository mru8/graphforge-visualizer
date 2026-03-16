import { Position } from "reactflow";
import { BaseNode } from "./baseNode";

export const AlertNode = ({id}) => {
    const handles = [{ type: 'target', position: Position.Left, id: 'trigger'}];

    return (
        <BaseNode id={id} label="Alert" handles={handles}>
            <div style={{fontSize: '12px', color: 'red'}}>
                Sends a browser alert when triggereed.
            </div>
        </BaseNode>
    );
};