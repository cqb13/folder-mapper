import FileObject from "../assets/types/file";
import isIgnored from "./isIgnored";

const getDirectoryMap = (
  files: FileObject[],
  ignoredFolders: string[],
  ignoredFiles: string[],
) => {
  const directoryMap = {};

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = file.webkitRelativePath;
    const pathParts = filePath.split("/");

    let currentDir: { [key: string]: any } = directoryMap;
    let isIgnoredDirectory = false; // Flag to track if current directory or any parent directory is ignored

    for (let j = 0; j < pathParts.length - 1; j++) {
      const directory = pathParts[j];
      if (!isIgnoredDirectory && !isIgnored(directory, ignoredFolders, ignoredFiles)) {
        if (!currentDir.hasOwnProperty(directory)) {
          currentDir[directory] = {};
        }
        currentDir = currentDir[directory];
      } else {
        isIgnoredDirectory = true; // Set the flag to true if any parent directory is ignored
      }
    }

    const fileName = pathParts[pathParts.length - 1];
    if (!isIgnoredDirectory && !isIgnored(fileName, ignoredFolders, ignoredFiles)) {
      currentDir[fileName] = file;
    }
  }

  return directoryMap;
};


export default getDirectoryMap;
