// textNode.js
// TASK 1: Refactored to use BaseNode abstraction
// TASK 2: Added auto-resize and dynamic {{variable}} handle detection

import { useState, useRef, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './baseNode';

export const TextNode = ({ id, data }) => {
  // Starting with {{input}} as a default so the node has a connection point
  // right out of the box!
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [variables, setVariables] = useState([]);
  const textAreaRef = useRef(null);

  // I used a regex here to grab anything inside double curly braces {{like_this}}
  // This lets user to create inputs on the fly!
  useEffect(() => {
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)].map(match => match[1]);
    setVariables([...new Set(matches)]);
  }, [currText]);

  // To auto-resize height
  const adjustHeight = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;

    }
  };

  // To create handles (one source on right, dynamic targets on left)
  const handles = [
    {type: 'source', position: Position.Right, id: `${id}-output` },
    ...variables.map((varName, index) => ({
      type: 'target',
      position: Position.Left,
      id: `${id}-${varName}`,
      style: { top: `${(index+1) * (100 / (variables.length + 1))}%`}
    }))
  ];
  
  return (
    <BaseNode id={id} label="Text" handles={handles}>
      <label style={{ display: 'flex', flexDirection: 'column'}}>
        Text Content:
        <textarea
        ref={textAreaRef}
        value={currText}
        onChange={(e) => { setCurrText(e.target.value); adjustHeight(); }}
        style={{ width: '100%', overflow: 'hidden', resize: 'none' }}
        />
      </label>
    </BaseNode>
  );
};