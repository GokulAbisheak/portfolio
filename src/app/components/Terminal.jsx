"use client";

import { useState } from "react";
import {
  VscChromeMaximize,
  VscChromeMinimize,
  VscChromeClose,
  VscChromeRestore,
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
    "contact",
  ];

  const processInput = (e) => {
    e.preventDefault();

    const trimmedInput = input.trim();
    let newPath = path;
    let output = "";
    let answer = "";
    let shouldClear = false;

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
    } else if (trimmedInput === "ls" || trimmedInput === "dir") {
      answer = `Available sections:\n  ${validPaths.join("\n  ")}`;
    } else if (trimmedInput === "clear" || trimmedInput === "cls") {
      shouldClear = true;
    } else if (trimmedInput === "whoami") {
      answer = "Gokul Abisheak\nSoftware Engineer | Full Stack Developer | Problem Solver | Tech Enthusiast";
    } else if (trimmedInput === "date") {
      answer = new Date().toLocaleString();
    } else if (trimmedInput.startsWith("echo")) {
      const text = trimmedInput.slice(4).trim();
      answer = text || "";
    } else if (trimmedInput === "contact") {
      newPath = "https://gokulabisheak.dev/contact";
      window.location.hash = "#contact";
    } else if (trimmedInput === "resume") {
      window.open("/cv/Gokul-Abisheak-Srirajan-SE.pdf", "_blank");
      answer = "Opening resume...";
    } else if (trimmedInput === "github") {
      window.open("https://github.com/GokulAbisheak", "_blank");
      answer = "Opening GitHub profile...";
    } else if (trimmedInput === "linkedin") {
      window.open("https://linkedin.com/in/gokulabisheak", "_blank");
      answer = "Opening LinkedIn profile...";
    } else if (trimmedInput === "instagram") {
      window.open("https://instagram.com/gokulabisheak", "_blank");
      answer = "Opening Instagram profile...";
    } else if (trimmedInput === "medium") {
      window.open("https://medium.com/@gokulabisheak", "_blank");
      answer = "Opening Medium profile...";
    } else if (trimmedInput === "help" || trimmedInput === "--help" || trimmedInput === "-h" || trimmedInput === "?") {
      answer = `Available commands:
  cd [section]  - Navigate to a section (home, about, experience, education, skills, projects, contact)
  cd ..         - Navigate back to home
  pwd           - Display current path
  ls / dir      - List available sections
  clear / cls   - Clear the terminal
  whoami        - Display user information
  date          - Display current date and time
  echo [text]   - Echo text to the terminal
  contact       - Navigate to contact section
  resume        - Open resume PDF
  github        - Open GitHub profile
  linkedin      - Open LinkedIn profile
  instagram     - Open Instagram profile
  medium        - Open Medium profile
  help          - Show this help message
  --help        - Show this help message
  -h            - Show this help message
  ?             - Show this help message

Available sections:
  ${validPaths.join(", ")}`;
    } else {
      output = `'${
        trimmedInput.split(" ")[0]
      }' is not recognized as an internal or external command, operable program or batch file.
Type 'help' or '--help' for a list of available commands.`;
    }

    if (shouldClear) {
      setLogs([]);
    } else {
      setLogs((prevLogs) => [
        ...prevLogs,
        { path, command: trimmedInput, output, answer },
      ]);
    }

    setPath(newPath);
    setInput("");
  };

  const clickMaximize = () => {
    setIsMaximize(!isMaximize);
  };

  const clickMinimize = () => {
    setIsMinimize(!isMinimize);
    setIsClose(!isClose);
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
                    className="p-3 hover:bg-gray-400 duration-200 cursor-pointer"
                  >
                    <VscChromeMinimize />
                  </button>
                  <button
                    onClick={() => {
                      clickMaximize();
                    }}
                    className="p-3 hover:bg-gray-400 duration-200 cursor-pointer"
                  >
                    {isMaximize ? <VscChromeRestore /> : <VscChromeMaximize />}
                  </button>
                  <button
                    onClick={() => {
                      resetTerminal();
                    }}
                    className="p-3 hover:bg-red-600 duration-200 cursor-pointer"
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
                  <br />
                  <br />
                  type <span className="text-blue-400">help</span> for more information
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
                    {log.answer && <div className="whitespace-pre-wrap">{log.answer}</div>}
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
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Terminal;
