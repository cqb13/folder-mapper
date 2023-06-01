import DirectoryMap from "../assets/types/directoryMap.ts";

const createFileTree = (
  directoryMap: DirectoryMap,
  endings: boolean,
  root: boolean,
  name: string,
  sort: boolean,
  indent: string = "",
): string => {
  let fileTree = "";

  const files = Object.keys(directoryMap).sort((a, b) => {
    if (sort) {
      return a.localeCompare(b);
    }
    return 0;
  });

  const standaloneFiles: string[] = [];
  let isRoot: boolean = false;

  for (let i = 0; i < files.length; i++) {
    if (files[i] === name) {
      isRoot = true;
    }

    let file = files[i];
    const fileData = directoryMap[file];

    if (!endings && file.indexOf(".") !== 0) {
      const lastDot = file.lastIndexOf(".");

      if (lastDot !== -1) {
        file = file.substring(0, lastDot);
      }
    }

    if (i === files.length - 1) {
      fileTree += `${indent}${isRoot ? "" : "└── "}${file}\n`;
      fileTree += createFileTree(
        fileData,
        endings,
        false,
        name,
        sort,
        `${indent}${isRoot ? "" : "    "}`,
      );
      break;
    }

    if (Object.keys(fileData).length > 0) {
      fileTree += `${indent}├── ${file}\n`;
      fileTree += createFileTree(
        fileData,
        endings,
        false,
        name,
        sort,
        `${indent}│   `,
      );
    } else {
      standaloneFiles.push(file);
    }
  }

  standaloneFiles.forEach((file) => {
    fileTree = `${indent}└── ${file}\n${fileTree}`;
  });

  if (!root) {
    fileTree = fileTree.replace(new RegExp(`^${name}\n`), "");
  }

  return fileTree;
};

export default createFileTree;
