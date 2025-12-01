import React, { useRef, useEffect, useState } from 'react';
import { fabric } from 'fabric';
import useStore from '../hooks/useStore';
// import './CanvasPlan.css'; // Removed: styles are in index.css

const CanvasPlan = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const { canvasData, setCanvasData } = useStore();
  const [activeTool, setActiveTool] = useState('brush'); // brush, line, point, text, erase

  useEffect(() => {
    // Initialize Fabric.js canvas
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      backgroundColor: '#fff',
      selection: true, // Allow selection of objects
    });
    fabricCanvasRef.current = canvas;

    // Load saved canvas data if available
    if (canvasData) {
      canvas.loadFromJSON(canvasData, () => {
        canvas.renderAll();
      });
    }

    // Event listener for canvas changes to save data
    const handleCanvasChange = () => {
      setCanvasData(canvas.toJSON());
    };
    canvas.on('object:added', handleCanvasChange);
    canvas.on('object:modified', handleCanvasChange);
    canvas.on('object:removed', handleCanvasChange);
    canvas.on('mouse:up', handleCanvasChange);


    // Set initial brush properties
    canvas.freeDrawingBrush.width = 5;
    canvas.freeDrawingBrush.color = '#000';

    return () => {
      // Clean up canvas on unmount
      canvas.off('object:added', handleCanvasChange);
      canvas.off('object:modified', handleCanvasChange);
      canvas.off('object:removed', handleCanvasChange);
      canvas.off('mouse:up', handleCanvasChange);
      canvas.dispose();
    };
  }, []); // Run only once on mount

  useEffect(() => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    canvas.isDrawingMode = activeTool === 'brush';

    // Disable selection when drawing
    canvas.selection = activeTool !== 'brush';
    canvas.forEachObject(obj => {
        obj.selectable = activeTool !== 'brush';
    });
    canvas.renderAll(); // Re-render to apply changes

    // Tool-specific settings
    switch (activeTool) {
      case 'brush':
        canvas.freeDrawingBrush.color = '#000';
        canvas.freeDrawingBrush.width = 5;
        break;
      case 'line':
        // Handle line drawing (more complex, requires mouse events)
        canvas.isDrawingMode = false;
        let line, isDown;

        const handleMouseDownLine = (o) => {
          isDown = true;
          const pointer = canvas.getPointer(o.e);
          const points = [ pointer.x, pointer.y, pointer.x, pointer.y ];
          line = new fabric.Line(points, {
            strokeWidth: 5,
            fill: '#000',
            stroke: '#000',
            originX: 'center',
            originY: 'center',
            selectable: false
          });
          canvas.add(line);
        };

        const handleMouseMoveLine = (o) => {
          if (!isDown) return;
          const pointer = canvas.getPointer(o.e);
          line.set({ x2: pointer.x, y2: pointer.y });
          canvas.renderAll();
        };

        const handleMouseUpLine = (o) => {
          isDown = false;
          // After drawing, convert to selectable for future edits if needed, then save.
          line.set('selectable', true);
          setCanvasData(canvas.toJSON());
          canvas.off('mouse:down', handleMouseDownLine);
          canvas.off('mouse:move', handleMouseMoveLine);
          canvas.off('mouse:up', handleMouseUpLine);
        };

        canvas.on('mouse:down', handleMouseDownLine);
        canvas.on('mouse:move', handleMouseMoveLine);
        canvas.on('mouse:up', handleMouseUpLine);
        break;
      case 'text':
        canvas.isDrawingMode = false;
        const handleMouseDownText = (o) => {
          const pointer = canvas.getPointer(o.e);
          const text = new fabric.IText('Texto', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: 'sans-serif',
            fill: '#000',
            fontSize: 20,
            selectable: true,
          });
          canvas.add(text);
          setCanvasData(canvas.toJSON());
          canvas.off('mouse:down', handleMouseDownText); // Remove event after adding one text
        };
        canvas.on('mouse:down', handleMouseDownText);
        break;
      case 'erase':
        canvas.isDrawingMode = false;
        canvas.selection = true; // Allow selecting objects to delete
        const handleMouseDownErase = (o) => {
            if (canvas.getActiveObject()) {
                canvas.remove(canvas.getActiveObject());
                setCanvasData(canvas.toJSON());
            }
        };
        canvas.on('mouse:down', handleMouseDownErase);
        break;
      case 'point': // Representing a point as a circle
        canvas.isDrawingMode = false;
        const handleMouseDownPoint = (o) => {
          const pointer = canvas.getPointer(o.e);
          const circle = new fabric.Circle({
            radius: 5,
            fill: 'red',
            left: pointer.x,
            top: pointer.y,
            selectable: true,
          });
          canvas.add(circle);
          setCanvasData(canvas.toJSON());
          canvas.off('mouse:down', handleMouseDownPoint);
        };
        canvas.on('mouse:down', handleMouseDownPoint);
        break;
      default:
        break;
    }

    return () => {
      // Clean up tool-specific event listeners
      canvas.off('mouse:down');
      canvas.off('mouse:move');
      canvas.off('mouse:up');
    };
  }, [activeTool, setCanvasData]);

  const clearCanvas = () => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.clear();
      fabricCanvasRef.current.backgroundColor = '#fff';
      setCanvasData(null); // Clear stored data
    }
  };

  const saveAsPNG = () => {
    if (fabricCanvasRef.current) {
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1,
      });
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'gasistapro-plan.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="canvas-plan-container card">
      <h2>Plano de Instalación</h2>
      <div className="canvas-tools">
        <button onClick={() => setActiveTool('brush')} className={activeTool === 'brush' ? 'active' : ''}>Brush</button>
        <button onClick={() => setActiveTool('line')} className={activeTool === 'line' ? 'active' : ''}>Line</button>
        <button onClick={() => setActiveTool('point')} className={activeTool === 'point' ? 'active' : ''}>Point</button>
        <button onClick={() => setActiveTool('text')} className={activeTool === 'text' ? 'active' : ''}>Text</button>
        <button onClick={() => setActiveTool('erase')} className={activeTool === 'erase' ? 'active' : ''}>Erase</button>
        <button onClick={clearCanvas}>Clear</button>
        <button onClick={saveAsPNG}>Save PNG</button>
      </div>
      <canvas ref={canvasRef} id="canvas" width="400" height="300" className="drawing-canvas"></canvas>
    </div>
  );
};

export default CanvasPlan;
