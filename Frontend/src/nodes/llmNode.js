// llmNode.js

import { BaseNode } from "./baseNode";
import { Position } from "reactflow";

export const LLMNode = ({ id, data }) => {
  const handles = [
    { type: 'target', position: Position.Left, id: 'system'},
    { type: 'target', position: Position.Left, id: 'prompt', style: {top: '70%'}},
    { type: 'source', position: Position.Right, id: 'response'},
  ];

  return (
    <BaseNode id={id} label="LLM" handles={handles}>
      <span>This is an LLM.</span>
    </BaseNode>
  );
}