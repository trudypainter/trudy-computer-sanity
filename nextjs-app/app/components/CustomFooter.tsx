"use client";

import { useEffect, useState } from "react";

export const CustomFooter = () => {
  return (
    <footer className="container mx-auto px-4 py-8 max-w-content">
      <div className="text-sm text-gray-200">
        <p>© {new Date().getFullYear()} Trudy Painter</p>
      </div>
    </footer>
  );
};
