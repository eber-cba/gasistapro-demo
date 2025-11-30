import React, { useRef, useState } from 'react';
import CanvasDraw from 'react-canvas-draw';

const CanvasPlan = () => {
    const canvasRef = useRef(null);
    const [brushColor, setBrushColor] = useState('#000000');
    const [brushRadius, setBrushRadius] = useState(4);

    const handleClear = () => {
        canvasRef.current.clear();
    };

    const handleUndo = () => {
        canvasRef.current.undo();
    };

    const handleSave = () => {
        const data = canvasRef.current.getSaveData();
        localStorage.setItem('canvas-drawing', data);
        
        // Also provide a way to download it
        const canvas = canvasRef.current.canvas.drawing;
        const image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        const link = document.createElement('a');
        link.download = 'plano.png';
        link.href = image;
        link.click();
    };

    return (
        <div>
            <h4>Plano de la Instalación</h4>
            <div>
                <button onClick={handleClear}>Limpiar</button>
                <button onClick={handleUndo}>Deshacer</button>
                <label htmlFor="brushColor">Color:</label>
                <input
                    type="color"
                    id="brushColor"
                    value={brushColor}
                    onChange={(e) => setBrushColor(e.target.value)}
                />
                <label htmlFor="brushRadius">Grosor:</label>
                <input
                    type="range"
                    id="brushRadius"
                    min="1"
                    max="20"
                    value={brushRadius}
                    onChange={(e) => setBrushRadius(Number(e.target.value))}
                />
                 <button onClick={handleSave}>Guardar</button>
            </div>
            <CanvasDraw
                ref={canvasRef}
                brushColor={brushColor}
                brushRadius={brushRadius}
                lazyRadius={0}
                canvasWidth={400}
                canvasHeight={400}
                style={{ border: '1px solid #ccc' }}
            />
        </div>
    );
};

export default CanvasPlan;
