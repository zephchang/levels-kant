const RenderLevels = (levelSelections: number[]) => {
  // note: levelSelections share the same format as the node paths (num array) but have totally different meanings.

  const rawNodeLevels = levelSelections.map((level) => {
    // to do: api route here that fetches a given level
  });

  //so we start at the top requested level, in this case 5
  const helper = ({ remainingNodes, pathFilter }) => {
    const topLevel = remainingNodes[0];
    const topSection = topLevel.filter((nodeData) => {
      return pathFilter.every((value, index) => value === nodeData.path[index]);
    });

    return topSection.map((nodeData) => {
      //Ok so we have our list of top level nodes, and fundamentally we're going to create a list of exactly that many divs and that's exactly what we're returning
      return (
        <div className="flex flex-row">
          <div>
            <p>{nodeData.content}</p>
          </div>
          {remainingNodes.length > 1 &&
            helper({
              remainingNodes: remainingNodes.slice(1),
              pathFilter: nodeData.path,
            })}
        </div>
      );
    });
  };

  return helper({ remainingNodes: rawNodeLevels, pathFilter: [0] });
};

const App = () => {
  return <RenderLevels levelSelection={[3, 2, 0]} />;
};
