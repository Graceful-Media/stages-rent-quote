
import React, { useEffect, useRef } from "react";

interface StageLayoutDiagramProps {
  width: number;
  depth: number;
  sections4x8: number;
  sections4x4: number;
  sections2x8: number;
  sections8x2: number;
  sections2x6: number;
  sections6x2: number;
  sections2x4: number;
  sections4x2: number;
  sections2x2: number;
}

const StageLayoutDiagram = ({ 
  width, 
  depth, 
  sections4x8, 
  sections4x4,
  sections2x8,
  sections8x2,
  sections2x6,
  sections6x2,
  sections2x4,
  sections4x2,
  sections2x2 
}: StageLayoutDiagramProps) => {
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

    // Colors for different section types
    const colors = {
      section4x8: "#93c5fd",  // Blue
      section4x4: "#bfdbfe",  // Lighter blue
      section2x8: "#FFDEE2",  // Darker pink
      section8x2: "#FFDEE2",  // Darker pink
      section2x6: "#FFE5E8",  // Lighter pink
      section6x2: "#FFE5E8",  // Lighter pink
      section2x4: "#dbeafe",  // Very light blue
      section4x2: "#dbeafe",  // Very light blue
      section2x2: "#eff6ff"   // Lightest blue
    };

    // Helper function to draw a section
    const drawSection = (x: number, y: number, w: number, h: number, color: string, text: string) => {
      ctx.fillStyle = color;
      ctx.fillRect(x, y, w * scale, h * scale);
      ctx.strokeRect(x, y, w * scale, h * scale);

      // Add text
      ctx.fillStyle = "#1e3a8a";
      const fontSize = Math.min(12, Math.max(8, Math.min(w, h) * 3));
      ctx.font = `${fontSize}px Arial`;
      ctx.textAlign = "center";
      ctx.fillText(
        text,
        x + (w * scale / 2),
        y + (h * scale / 2)
      );
    };

    // Calculate layout
    const numFull4ftAcross = Math.floor(width / 4);
    const remaining2ftWidth = (width % 4) >= 2 ? 1 : 0;
    const fullRows8ft = Math.floor(depth / 8);
    const remaining4ftDepth = Math.floor((depth % 8) / 4);
    const remaining2ftDepth = ((depth % 8) % 4) >= 2 ? 1 : 0;

    // Draw 4x8 sections
    let remaining4x8 = sections4x8;
    for (let row = 0; row < fullRows8ft; row++) {
      for (let col = 0; col < numFull4ftAcross && remaining4x8 > 0; col++) {
        drawSection(
          startX + col * 4 * scale,
          startY + row * 8 * scale,
          4,
          8,
          colors.section4x8,
          "4' × 8'"
        );
        remaining4x8--;
      }
    }

    // Draw 2x8 sections
    let remaining2x8 = sections2x8;
    for (let row = 0; row < fullRows8ft && remaining2x8 > 0; row++) {
      drawSection(
        startX + numFull4ftAcross * 4 * scale,
        startY + row * 8 * scale,
        2,
        8,
        colors.section2x8,
        "2' × 8'"
      );
      remaining2x8--;
    }

    // Draw 2x6 sections
    let remaining2x6 = sections2x6;
    if (remaining2x6 > 0) {
      drawSection(
        startX + numFull4ftAcross * 4 * scale,
        startY + fullRows8ft * 8 * scale,
        2,
        6,
        colors.section2x6,
        "2' × 6'"
      );
    }

    // Draw 4x4 sections
    if (remaining4ftDepth) {
      const y = startY + fullRows8ft * 8 * scale;
      for (let col = 0; col < numFull4ftAcross; col++) {
        drawSection(
          startX + col * 4 * scale,
          y,
          4,
          4,
          colors.section4x4,
          "4' × 4'"
        );
      }
    }

    // Draw 2x4 sections
    if (remaining2ftWidth && remaining4ftDepth) {
      const y = startY + fullRows8ft * 8 * scale;
      drawSection(
        startX + numFull4ftAcross * 4 * scale,
        y,
        2,
        4,
        colors.section2x4,
        "2' × 4'"
      );
    }

    // Draw 4x2 sections
    if (remaining2ftDepth) {
      const y = startY + (fullRows8ft * 8 + (remaining4ftDepth * 4)) * scale;
      for (let col = 0; col < numFull4ftAcross; col++) {
        drawSection(
          startX + col * 4 * scale,
          y,
          4,
          2,
          colors.section4x2,
          "4' × 2'"
        );
      }
    }

    // Draw 2x2 sections
    if (remaining2ftWidth && remaining2ftDepth) {
      const y = startY + (fullRows8ft * 8 + (remaining4ftDepth * 4)) * scale;
      drawSection(
        startX + numFull4ftAcross * 4 * scale,
        y,
        2,
        2,
        colors.section2x2,
        "2' × 2'"
      );
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
  }, [width, depth, sections4x8, sections4x4, sections2x8, sections8x2, sections2x6, sections6x2, sections2x4, sections4x2, sections2x2]);

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
