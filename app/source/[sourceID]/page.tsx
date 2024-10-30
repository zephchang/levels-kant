'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface NodeData {
  path: number[];
  content: string;
}

type NodeLevel = NodeData[];
type NodeMultiLevel = NodeLevel[];

const RenderLevels = ({ levelSelections }: { levelSelections: number[] }) => {
  // note: levelSelections share the same format as the node paths (num array) but have totally different meanings.
  const [nodeLevelsAll, setNodeLevelsAll] = useState<NodeMultiLevel | null>(
    null
  );

  const params = useParams();
  const sourceID = params.sourceID as string;
  console.log('SOURCE ID', sourceID);

  // load node data based on levelSelections
  useEffect(() => {
    const fetchNodeLevels = async () => {
      const nodeLevels: NodeMultiLevel = await Promise.all(
        levelSelections.map(async (level) => {
          const response = await fetch(
            `/api/fetch-nodes?sourceID=${sourceID}&level=${level}`
          );
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
    if (!nodeLevelsAll) {
      return <div>loading zeph, patience!...</div>;
    }
    const topLevel = remainingNodes[0];
    const topSection = topLevel.filter((nodeData) => {
      return pathPrefix.every((value, index) => value === nodeData.path[index]);
    });

    //
    return (
      <div className="flex flex-col border-l-[.5px] border-neutral-400 min-w-fit">
        {topSection.map((nodeData) => (
          <div
            key={nodeData.path.join('-')}
            className="flex flex-row min-w-fit"
          >
            <div className="w-[33vw] pt-5 px-10">
              <p className="font-serif font-medium text-black text-[17px]">
                {nodeData.content}
              </p>
            </div>
            {remainingNodes.length > 1 &&
              helper({
                remainingNodes: remainingNodes.slice(1),
                pathPrefix: nodeData.path,
              })}
          </div>
        ))}
      </div>
    );
  };

  return helper({ remainingNodes: nodeLevelsAll, pathPrefix: [0] });
};

const App = () => {
  return (
    <div className="overflow-x-auto p-5">
      <RenderLevels levelSelections={[5, 4, 3, 2, 1, 0]} />;
    </div>
  );
};

export default App;
