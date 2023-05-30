import DirectoryMap from "../assets/types/directoryMap.ts";

const createFileTree = (
  directoryMap: DirectoryMap,
  endings: boolean,
  root: boolean,
  name: string,
  indent: string = "",
): string => {
  let fileTree = "";

  const files = Object.keys(directoryMap).sort();
  const standaloneFiles: string[] = [];

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    const fileData = directoryMap[file];

    if (!endings && file.indexOf(".") !== 0) {
      const lastDot = file.lastIndexOf(".");

      if (lastDot !== -1) {
        file = file.substring(0, lastDot);
      }
    }

    if (i === files.length - 1) {
      fileTree += `${indent}└── ${file}\n`;
      fileTree += createFileTree(fileData, endings, root, name, `${indent}    `);
      break;
    }

    if (Object.keys(fileData).length > 0) {
      fileTree += `${indent}├── ${file}\n`;
      fileTree += createFileTree(fileData, endings, root, name, `${indent}│   `);
    } else {
      standaloneFiles.push(file);
    }
  }

  standaloneFiles.forEach((file) => {
    fileTree = `${indent}└── ${file}\n${fileTree}`;
  });

  fileTree = fileTree.replace(/^└── /, "");
  fileTree = fileTree.replace(/^    /gm, "");
  
  if (!root) {
    fileTree = fileTree.replace(new RegExp(`^${name}\n`), "");
  }

  return fileTree;
};

export default createFileTree;
