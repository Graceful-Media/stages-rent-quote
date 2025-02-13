
import React, { useEffect, useRef } from "react";

interface StageLayoutDiagramProps {
  width: number;
  depth: number;
  sections4x8: number;
  sections4x4: number;
}

const StageLayoutDiagram = ({ width, depth, sections4x8, sections4x4 }: StageLayoutDiagramProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate scale factor to fit the stage in canvas
    const padding = 40;
    const scale = Math.min(
      (canvas.width - padding * 2) / width,
      (canvas.height - padding * 2) / depth
    );

    // Draw background
    ctx.fillStyle = "#f3f4f6";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Center the drawing
    const startX = (canvas.width - width * scale) / 2;
    const startY = (canvas.height - depth * scale) / 2;

    // Draw stage outline
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.strokeRect(startX, startY, width * scale, depth * scale);

    // Calculate layout dimensions
    const numAcross = Math.ceil(width / 4); // Number of 4' sections across
    const fullRows = Math.floor(depth / 8);  // Number of full 8' rows
    const hasPartialRow = depth % 8 > 0;     // Whether we need a 4' row at the end

    // Draw 4x8 sections
    ctx.fillStyle = "#93c5fd";
    let remaining4x8 = sections4x8;

    // Draw full rows of 4x8 sections
    for (let row = 0; row < fullRows; row++) {
      for (let col = 0; col < numAcross && remaining4x8 > 0; col++) {
        // Draw 4x8 section
        ctx.fillRect(
          startX + col * 4 * scale,
          startY + row * 8 * scale,
          4 * scale,
          8 * scale
        );
        ctx.strokeRect(
          startX + col * 4 * scale,
          startY + row * 8 * scale,
          4 * scale,
          8 * scale
        );

        // Add text for 4x8 sections
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "4' × 8'",
          startX + (col * 4 + 2) * scale,
          startY + (row * 8 + 4) * scale
        );
        ctx.fillStyle = "#93c5fd";

        remaining4x8--;
      }
    }

    // Draw 4x4 sections in the last row
    if (hasPartialRow) {
      ctx.fillStyle = "#bfdbfe";
      const lastRowY = startY + fullRows * 8 * scale;

      // Draw all needed 4x4 sections across the width
      for (let col = 0; col < numAcross; col++) {
        // Draw 4x4 section
        ctx.fillRect(
          startX + col * 4 * scale,
          lastRowY,
          4 * scale,
          4 * scale
        );
        ctx.strokeRect(
          startX + col * 4 * scale,
          lastRowY,
          4 * scale,
          4 * scale
        );

        // Add text for 4x4 sections
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "4' × 4'",
          startX + (col * 4 + 2) * scale,
          lastRowY + 2 * scale
        );
        ctx.fillStyle = "#bfdbfe";
      }
    }

    // Add dimensions text
    ctx.fillStyle = "#000000";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText(
      `${width}' × ${depth}'`,
      canvas.width / 2,
      startY - 10
    );
  }, [width, depth, sections4x8, sections4x4]);

  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">Stage Layout:</h4>
      <div className="border rounded-lg p-2 bg-white">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default StageLayoutDiagram;
