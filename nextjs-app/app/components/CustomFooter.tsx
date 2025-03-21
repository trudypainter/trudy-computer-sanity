"use client";

import { useEffect, useState } from "react";

export const CustomFooter = () => {
  return (
    <footer className="container mx-auto px-4 py-8 max-w-content">
      <div className="flex justify-between">
        <div className="text-sm text-gray-200">
          <p>© {new Date().getFullYear()} Trudy Painter</p>
        </div>
        <div className="text-sm text-gray-200">
          <p>
            Coded by me + Claude / Cursor (
            <a
              href="https://github.com/trudypainter/clean-sanity"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-400 transition-colors"
            >
              source
            </a>
            )
          </p>
        </div>
      </div>
      <div className="text-sm font-cursive my-12 text-gray-200 mx-auto w-full text-center">
        <div>♡ Thanks for scrolling</div>
        <div>
          If you made it this far, we probably have some shared interests.{" "}
          <br></br>Feel free to check out my{" "}
          <a
            href="https://www.are.na/trudy-painter"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-400 transition-colors"
          >
            Are.na
          </a>{" "}
          or say{" "}
          <a
            href="mailto:hello@trudy.computer"
            className="underline hover:text-gray-400 transition-colors"
          >
            hello@trudy.computer
          </a>
          .
        </div>
      </div>
    </footer>
  );
};
