"use client";

import { useState } from "react";
import {
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeClose,
} from "react-icons/vsc";
import { HiCommandLine } from "react-icons/hi2";

const Terminal = ({ isClose = false, setIsClose }) => {
  const [path, setPath] = useState("https://gokulabisheak.dev");
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([]);
  const [isMaximize, setIsMaximize] = useState(false);
  const [isMinimize, setIsMinimize] = useState(false);

  const validPaths = [
    "home",
    "about",
    "experience",
    "education",
    "skills",
    "projects",
  ];

  const processInput = (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    let newPath = path;
    let output = "";
    let answer = "";

    if (trimmedInput.startsWith("cd")) {
      const arg = trimmedInput.slice(2).trim();

      if (arg === "..") {
        const baseUrl = "https://gokulabisheak.dev";
        if (path !== baseUrl) {
          newPath = baseUrl;
          window.location.hash = "#";
        } else {
          output = "already at root directory.";
        }
      } else if (validPaths.includes(arg)) {
        newPath = "https://gokulabisheak.dev/" + arg;
        window.location.hash = `#${arg}`;
      } else if (arg === "") {
        newPath = "https://gokulabisheak.dev";
        window.location.hash = "#";
      } else {
        output = `The system cannot find the path specified: ${arg}`;
      }
    } else if (trimmedInput.startsWith("pwd")) {
      answer = path;
    } else {
      output = `'${
        trimmedInput.split(" ")[0]
      }' is not recognized as an internal or external command, operable program or batch file.`;
    }

    setLogs((prevLogs) => [
      ...prevLogs,
      { path, command: trimmedInput, output, answer },
    ]);

    setPath(newPath);
    setInput("");
  };

  const clickMaximize = () => {
    setIsMaximize(!isMaximize);
  };

  const clickMinimize = () => {
    setIsMinimize(!isMinimize);
  };

  const resetTerminal = () => {
    setPath("https://gokulabisheak.dev");
    setInput("");
    setLogs([]);
    setIsMaximize(false);
    setIsMinimize(false);
    setIsClose(true);
  };

  return (
    <>
      {!isClose ? (
        <>
          {!isMinimize ? (
            <div
              className={`w-full h-screen bg-[rgba(0,0,0,0.5)] fixed top-0 flex justify-center items-center terminal text-white z-[100] ${
                isMaximize ? "" : "px-5"
              }`}
            >
              <div
                className={`bg-black rounded-lg overflow-hidden flex flex-col ${
                  isMaximize ? "w-full h-screen" : "w-[800px] h-[500px]"
                }`}
              >
                <div className="w-full bg-gray-600 flex justify-between items-center">
                  <div className="pl-2 flex gap-2 items-center">
                    <HiCommandLine />
                    <span className="text-xs">Command Prompt</span>
                  </div>
                  <div className="flex">
                    <button
                      onClick={() => {
                        clickMinimize();
                      }}
                      className="p-3 hover:bg-gray-400 duration-200"
                    >
                      <VscChromeMinimize />
                    </button>
                    <button
                      onClick={() => {
                        clickMaximize();
                      }}
                      className="p-3 hover:bg-gray-400 duration-200"
                    >
                      <VscChromeMaximize />
                    </button>
                    <button
                      onClick={() => {
                        resetTerminal();
                      }}
                      className="p-3 hover:bg-red-600 duration-200"
                    >
                      <VscChromeClose />
                    </button>
                  </div>
                </div>

                <div className="p-4 flex-1 overflow-y-auto font-mono text-sm space-y-1">
                  <div className="mb-4">
                    Gokul Abisheak Portfolio [Version 2.0]
                    <br />
                    (c) Gokul Abisheak. All rights reserved.
                  </div>

                  {logs.map((log, index) => (
                    <div key={index}>
                      <div>
                        <span className="text-green-400">{log.path}&gt;</span>
                        {log.command}
                      </div>
                      {log.output && (
                        <div className="text-red-400">{log.output}</div>
                      )}
                      {log.answer && <div>{log.answer}</div>}
                    </div>
                  ))}

                  <form onSubmit={processInput} className="flex">
                    <span className="text-green-400">{path}&gt;</span>
                    <input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      className="bg-black text-white focus:outline-none flex-1"
                      autoFocus
                    />
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full bg-blue-950 fixed bottom-0">
              {isMinimize ? (
                <button
                  onClick={() => {
                    clickMinimize();
                  }}
                  className="flex gap-2 items-center hover:bg-blue-900 p-2 duration-200 text-white"
                >
                  <HiCommandLine />
                  <span className="p2 text-white">Command Prompt</span>
                </button>
              ) : (
                <></>
              )}
            </div>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Terminal;
