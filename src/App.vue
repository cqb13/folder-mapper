<script>
import TextInputGroup from "./components/TextInputGroup.vue";
import CheckBox from "./components/CheckBox.vue";

import getDirectoryMap from "./utils/getDirectoryMap.ts";
import createFileTree from "./utils/createFileTree.ts";

export default {
  components: {
    TextInputGroup,
    CheckBox,
  },
  data() {
    return {
      ignoredFolders: [
        ".gradle",
        ".idea",
        "node_modules",
        "build",
        "dist",
        ".venv",
        ".git",
        "venv",
        ".vscode",
        ".settings",
        ".next",
        ".bin",
        "target"
      ],
      ignoredFiles: [],
      endings: true,
      root: true,
      sort: true,
      name: "",
      fileTree: "",
    };
  },
  methods: {
    handleAddFolder(inputValue) {
      this.ignoredFolders.push(inputValue);
    },
    handleRemoveFolder(value) {
      this.ignoredFolders.splice(this.ignoredFolders.indexOf(value), 1);
    },
    handleAddFile(inputValue) {
      this.ignoredFiles.push(inputValue);
    },
    handleRemoveFile(value) {
      this.ignoredFiles.splice(this.ignoredFiles.indexOf(value), 1);
    },
    handleEndingsChange(checked) {
      this.endings = checked;
    },
    handleRootChange(checked) {
      this.root = checked;
    },
    handleSortChange(checked) {
      this.sort = checked;
    },
    getTree() {
      this.fileTree = "";
      const folderInput = this.$refs.folderInput;
      const files = folderInput.files;

      this.name = files[0].webkitRelativePath.split("/")[0];

      const directoryMap = getDirectoryMap(
        files,
        this.ignoredFolders,
        this.ignoredFiles,
      );
      const tree = createFileTree(
        directoryMap,
        this.endings,
        this.root,
        this.name,
        this.sort,
      );
      this.fileTree = tree;
    },
    copy() {
      const el = document.createElement("textarea");
      el.value = this.fileTree;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    },
  },
};
</script>

<template>
  <div class="flex min-h-screen flex-col bg-zinc-100 text-gray-800 max-sm:px-5">
    <header class="pt-10">
      <h1 class="mb-6 text-center text-5xl font-bold">Folder Mapper</h1>
      <p className="text-center mb-6 text-xl">
        Maps out a folders structure and creates a tree view of it.
      </p>
    </header>
    <hr class="mx-auto w-9/12 pb-5" />
    <main class="flex-1">
      <section class="flex flex-col items-center">
        <input ref="folderInput" type="file" class="file-input-bordered file-input w-full max-w-xs" webkitdirectory
          mozdirectory />
        <div>
          <TextInputGroup @add-value="handleAddFolder" @remove-value="handleRemoveFolder" placeholder="Folder Name"
            label="Ignored Folders" :listVals="ignoredFolders" />
          <TextInputGroup @add-value="handleAddFile" @remove-value="handleRemoveFile" placeholder="File Name/Ending"
            label="Ignored Files/Endings" :listVals="ignoredFiles" />
        </div>
        <div>
          <CheckBox @update-value="handleEndingsChange" defaultChecked="checked" label="Include Endings"
            tip=".txt, .py, etc..." />
          <CheckBox @update-value="handleRootChange" defaultChecked="checked" label="Include Root Name"
            tip="name of passed in folder" />
          <CheckBox @update-value="handleSortChange" defaultChecked="checked" label="Sort Tree"
            tip="sorts tree alphabetically" />
        </div>
        <button @click="getTree" class="btn">Generate Tree</button>
      </section>
      <article v-if="fileTree"
        class="mx-auto mt-10 flex w-fit min-w-[calc(60vw)] flex-col items-center rounded-lg bg-neutral px-20 py-5">
        <div class="flex w-full items-center justify-between text-gray-300">
          <img src="./assets/icon.svg" alt="icon" />
          <h2 class="text-2xl">Map of {{ name }}</h2>
          <button @click="copy" class="tooltip tooltip-top" data-tip="Copy Tree">
            <svg width="50" height="45" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M5 2V1H10V2H5ZM4.75 0C4.33579 0 4 0.335786 4 0.75V1H3.5C2.67157 1 2 1.67157 2 2.5V12.5C2 13.3284 2.67157 14 3.5 14H11.5C12.3284 14 13 13.3284 13 12.5V2.5C13 1.67157 12.3284 1 11.5 1H11V0.75C11 0.335786 10.6642 0 10.25 0H4.75ZM11 2V2.25C11 2.66421 10.6642 3 10.25 3H4.75C4.33579 3 4 2.66421 4 2.25V2H3.5C3.22386 2 3 2.22386 3 2.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V2.5C12 2.22386 11.7761 2 11.5 2H11Z"
                fill="currentColor" />
            </svg>
          </button>
        </div>
        <pre class="text-left text-gray-300">{{ fileTree }}</pre>
      </article>
    </main>
    <footer class="flex shrink-0 items-center justify-between px-2 py-1">
      <a href="https://maksimstraus.dev" target="_blank">Folder Mapper | By: Maksim Straus</a>
      <a href="https://github.com/cqb13/folder-mapper">
        <img src="./assets/github.svg" class="h-7 w-7" alt="github" />
      </a>
    </footer>
  </div>
</template>
