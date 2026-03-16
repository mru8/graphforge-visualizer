import { BaseNode } from "./baseNode";

export const NoteNode = ({ id }) => {
    return (
        <BaseNode id={id} label="Note" handles={[]}>
            <div styles={{ padding: '5px'}}>
                <textarea
                placeholder="Write a reminder to yourself here.."
                style={{width: '100%', fontSize: '12px'}}
                />
            </div>
        </BaseNode>
    );
};