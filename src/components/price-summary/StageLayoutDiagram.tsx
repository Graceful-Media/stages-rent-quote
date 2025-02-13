
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

    // Draw 4x8 sections
    ctx.fillStyle = "#93c5fd";
    const max4x8InWidth = Math.floor(width / 8);
    const max4x8InDepth = Math.floor(depth / 8);

    for (let i = 0; i < max4x8InWidth; i++) {
      for (let j = 0; j < max4x8InDepth; j++) {
        ctx.fillRect(
          startX + i * 8 * scale,
          startY + j * 8 * scale,
          8 * scale,
          8 * scale
        );
        ctx.strokeRect(
          startX + i * 8 * scale,
          startY + j * 8 * scale,
          8 * scale,
          8 * scale
        );

        // Add text for 4x8 sections
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "4' × 8'",
          startX + (i * 8 + 4) * scale,
          startY + (j * 8 + 4) * scale
        );
        ctx.fillStyle = "#93c5fd";
      }
    }

    // Draw 4x4 sections
    ctx.fillStyle = "#bfdbfe";
    const remainingWidth = width % 8;
    const remainingDepth = depth % 8;

    // Fill remaining width
    if (remainingWidth > 0) {
      for (let j = 0; j < Math.ceil(depth / 4); j++) {
        ctx.fillRect(
          startX + max4x8InWidth * 8 * scale,
          startY + j * 4 * scale,
          4 * scale,
          4 * scale
        );
        ctx.strokeRect(
          startX + max4x8InWidth * 8 * scale,
          startY + j * 4 * scale,
          4 * scale,
          4 * scale
        );

        // Add text for 4x4 sections
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "4' × 4'",
          startX + (max4x8InWidth * 8 + 2) * scale,
          startY + (j * 4 + 2) * scale
        );
        ctx.fillStyle = "#bfdbfe";
      }
    }

    // Fill remaining depth
    if (remainingDepth > 0) {
      for (let i = 0; i < Math.floor(width / 4); i++) {
        if (i >= max4x8InWidth * 2) continue; // Skip if already filled by remaining width
        ctx.fillRect(
          startX + i * 4 * scale,
          startY + max4x8InDepth * 8 * scale,
          4 * scale,
          4 * scale
        );
        ctx.strokeRect(
          startX + i * 4 * scale,
          startY + max4x8InDepth * 8 * scale,
          4 * scale,
          4 * scale
        );

        // Add text for 4x4 sections
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "10px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "4' × 4'",
          startX + (i * 4 + 2) * scale,
          startY + (max4x8InDepth * 8 + 2) * scale
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
