import React from 'react';
import { Box } from '@mui/material';
import { useDrag, useDragDropManager } from 'react-dnd';
import { useRafLoop } from 'react-use';

import ModuleInterface from '../types/ModuleInterface';
import { isOutOfBounds, localX2ModuleX, localY2ModuleY, moduleW2LocalWidth, moduleX2LocalX, moduleY2LocalY, newPlaceholderHeight, newPlaceholderLeft, newPlaceholderTop, newPlaceholderWidth } from '../helpers';
import PlaceholderInterface from '../types/PlaceholderInterface';

type ModuleProps = {
  data: ModuleInterface;
  moveModule: (module: ModuleInterface) => void;
  containerHeight: number;
};

const Module = (props: ModuleProps) => {
  const { data: { id, coord: { x, y, w, h } }, moveModule, containerHeight } = props;

  const isValidMove = React.useCallback((placeholder: PlaceholderInterface) => {
    // Check if the placeholder is within the grid boundaries
    if (isOutOfBounds(placeholder, containerHeight)) {
      return false;
    }
    return true;
  }, [containerHeight, id, h, w]);
  
  // Transform x, y to left, top
  const [{ top, left }, setPosition] = React.useState(() => ({
    top: moduleY2LocalY(y),
    left: moduleX2LocalX(x),
  }));

  const dndManager = useDragDropManager();
  const initialPosition = React.useRef<{ top: number; left: number }>();

  // Use request animation frame to process dragging
  const [stop, start] = useRafLoop(() => {
    const movement = dndManager.getMonitor().getDifferenceFromInitialOffset();

    if (!initialPosition.current || !movement) {
      return;
    }

    // Get the new position of the placeholder
    const placeholder: PlaceholderInterface = {
      top: newPlaceholderTop(initialPosition.current.top, movement.y),
      left: newPlaceholderLeft(initialPosition.current.left, movement.x),
      height: newPlaceholderHeight(initialPosition.current.top, movement.y, h),
      width: newPlaceholderWidth(initialPosition.current.left, movement.x, w),
    };

    console.log('check', initialPosition.current.top + movement.y, placeholder.top, localY2ModuleY(placeholder.top));
    
    if (isValidMove(placeholder)) {
      // Update new position of the module
      setPosition({
        top: placeholder.top,
        left: placeholder.left,
      });
  
      moveModule({
        id,
        coord: { x: localX2ModuleX(placeholder.left), y: localY2ModuleY(placeholder.top), w, h },
      });
    }
  }, false);

  // Wire the module to DnD drag system
  const [, drag] = useDrag(() => ({
    type: 'module',
    item: () => {
      // Track the initial position at the beginning of the drag operation
      initialPosition.current = { top, left };

      // Start raf
      start();
      return { id };
    },
    end: stop,
  }), [top, left]);

  return (
    <Box
      ref={drag}
      display="flex"
      position="absolute"
      border={1}
      borderColor="grey.500"
      padding="10px"
      bgcolor="rgba(0, 0, 0, 0.5)"
      top={top}
      left={left}
      width={moduleW2LocalWidth(w)}
      height={h}
      sx={{
        transitionProperty: 'top, left',
        transitionDuration: '0.1s',
        '& .resizer': {
          opacity: 0,
        },
        '&:hover .resizer': {
          opacity: 1,
        },
      }}
    >
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize={40}
        color="#fff"
        sx={{ cursor: 'move' }}
        draggable
      >
        <Box sx={{ userSelect: 'none', pointerEvents: 'none' }}>{id}</Box>
      </Box>
    </Box>
  );
};

export default React.memo(Module);
