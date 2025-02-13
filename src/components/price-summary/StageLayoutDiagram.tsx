
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

    // Draw the total number of 4x8 sections first
    ctx.fillStyle = "#93c5fd";
    let remainingDecksToDraw = sections4x8;
    let currentX = startX;
    let currentY = startY;

    // Try to fill horizontally first
    while (remainingDecksToDraw > 0) {
      // Check if we can fit an 8' wide section
      if (currentX + 8 * scale <= startX + width * scale) {
        // Draw 4x8 section
        ctx.fillRect(currentX, currentY, 8 * scale, 4 * scale);
        ctx.strokeRect(currentX, currentY, 8 * scale, 4 * scale);

        // Add text for 4x8 sections
        ctx.fillStyle = "#1e3a8a";
        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "4' × 8'",
          currentX + 4 * scale,
          currentY + 2 * scale
        );
        ctx.fillStyle = "#93c5fd";

        currentX += 8 * scale;
        remainingDecksToDraw--;
      } else {
        // Move to next row
        currentX = startX;
        currentY += 4 * scale;
        if (currentY >= startY + depth * scale) {
          break;
        }
      }
    }

    // Draw 4x4 sections in remaining space
    ctx.fillStyle = "#bfdbfe";
    remainingDecksToDraw = sections4x4;
    currentX = startX;
    currentY = startY;

    // Fill any remaining space with 4x4 sections
    while (remainingDecksToDraw > 0) {
      if (currentX + 4 * scale <= startX + width * scale &&
          currentY + 4 * scale <= startY + depth * scale) {
        // Check if this space is already occupied by a 4x8 section
        let isOccupied = false;
        for (let i = 0; i < sections4x8; i++) {
          const x8Start = startX + (i % Math.floor(width / 8)) * 8 * scale;
          const y8Start = startY + Math.floor(i / Math.floor(width / 8)) * 4 * scale;
          if (currentX >= x8Start && currentX < x8Start + 8 * scale &&
              currentY >= y8Start && currentY < y8Start + 4 * scale) {
            isOccupied = true;
            break;
          }
        }

        if (!isOccupied) {
          // Draw 4x4 section
          ctx.fillRect(currentX, currentY, 4 * scale, 4 * scale);
          ctx.strokeRect(currentX, currentY, 4 * scale, 4 * scale);

          // Add text for 4x4 sections
          ctx.fillStyle = "#1e3a8a";
          ctx.font = "10px Arial";
          ctx.textAlign = "center";
          ctx.fillText(
            "4' × 4'",
            currentX + 2 * scale,
            currentY + 2 * scale
          );
          ctx.fillStyle = "#bfdbfe";

          remainingDecksToDraw--;
        }

        currentX += 4 * scale;
      } else {
        // Move to next row
        currentX = startX;
        currentY += 4 * scale;
        if (currentY >= startY + depth * scale) {
          break;
        }
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
