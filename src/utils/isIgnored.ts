const isIgnored = (
  name: string,
  ignoredFolders: string[],
  ignoredFiles: string[],
) => {
  for (let i = 0; i < ignoredFolders.length; i++) {
    if (name === ignoredFolders[i]) {
      return true;
    }
  }

  for (let i = 0; i < ignoredFiles.length; i++) {
    const ignoredFile = ignoredFiles[i];
    if (
      ignoredFile.startsWith(".") &&
      name.endsWith(ignoredFile.substring(1))
    ) {
      return true;
    }
    if (name === ignoredFile) {
      return true;
    }
  }

  return false;
};

export default isIgnored;
