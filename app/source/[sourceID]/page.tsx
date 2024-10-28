'use client';

import { useState, useEffect } from 'react';

interface NodeData {
  path: number[];
  content: string;
}

type NodeLevel = NodeData[];
type NodeMultiLevel = NodeLevel[];

const RenderLevels = ({ levelSelections }: { levelSelections: number[] }) => {
  // note: levelSelections share the same format as the node paths (num array) but have totally different meanings.
  const [nodeLevelsAll, setNodeLevelsAll] = useState<NodeMultiLevel>([[]]);

  // load node data based on levelSelections
  useEffect(() => {
    const fetchNodeLevels = async () => {
      const nodeLevels: NodeMultiLevel = await Promise.all(
        levelSelections.map(async (level) => {
          const response = await fetch(`/api/levels${level}`);
          return (await response.json()) as NodeLevel;
        })
      );
      setNodeLevelsAll(nodeLevels);
    };

    fetchNodeLevels();
  }, [levelSelections]);

  const helper = ({
    remainingNodes,
    pathPrefix,
  }: {
    remainingNodes: NodeMultiLevel;
    pathPrefix: number[];
  }) => {
    const topLevel = remainingNodes[0];
    const topSection = topLevel.filter((nodeData) => {
      return pathPrefix.every((value, index) => value === nodeData.path[index]);
    });

    return topSection.map((nodeData) => {
      //Ok so we have our list of top level nodes, and fundamentally we're going to create a list of exactly that many divs and that's exactly what we're returning
      return (
        <div key={nodeData.path.join('-')} className="flex flex-row">
          <div>
            <p>{nodeData.content}</p>
          </div>
          {remainingNodes.length > 1 &&
            helper({
              remainingNodes: remainingNodes.slice(1),
              pathPrefix: nodeData.path,
            })}
        </div>
      );
    });
  };

  return helper({ remainingNodes: nodeLevelsAll, pathPrefix: [0] });
};

const App = () => {
  return <RenderLevels levelSelections={[3, 2, 0]} />;
};

export default App;
