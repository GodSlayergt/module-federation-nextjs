import HtmlToReact from "html-to-react";
import React from "react";

const parse = (html)=>{
const isValidNode = function () {
  return true;
};

// Order matters. Instructions are processed in the order they're defined
const processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
const processingInstructions = [
  {
    // Custom <h1> processing
    shouldProcessNode: function (node) {
      return node.name === "script";
    },
    processNode: function (node, children) {
      console.log(node, "process");
      if (typeof document != "undefined") {
        var script = document.createElement("script");
        script.src = node.attribs.src;
        script.onload = function () {
          console.log("jQuery loaded:");
        };
        document.head.appendChild(script);
      }
      return;
    },
  },
  {
    // Anything else
    shouldProcessNode: function (node) {
      return true;
    },
    processNode: processNodeDefinitions.processDefaultNode,
  },
];

const reactComponent = HtmlToReact.Parser().parseWithInstructions(
  html,
  isValidNode,
  processingInstructions
);
return reactComponent
}
export default parse