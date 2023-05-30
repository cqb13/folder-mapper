<div align="center">

# Folder Mapper

[View Projects](https://foldermap.vercel.app/)

</div>

## About:
This website takes in a folder, and maps out the folder structure, in a tree like structure.

## Technologies:
- Vue 3
- Vite
- Tailwind CSS
- TypeScript
- Vercel


## Structure:
```
folder-mapper
└── tsconfig.node.json
└── tsconfig.json
└── tailwind.config.cjs
└── postcss.config.cjs
└── package.json
└── package-lock.json
└── index.html
└── README.md
└── .prettierrc
└── .prettierignore
└── .gitignore
├── public
│   └── icon.svg
├── src
│   └── style.css
│   └── main.ts
│   └── App.vue
│   ├── assets
│   │   └── icon.svg
│   │   └── github.svg
│   │   └── types
│   │       └── directoryMap.ts
│   │       └── file.ts
│   ├── components
│   │   └── CheckBox.vue
│   │   └── TextInputGroup.vue
│   ├── utils
│   │   └── getDirectoryMap.ts
│   │   └── createFileTree.ts
│   │   └── isIgnored.ts
│   └── vite-env.d.ts
└── vite.config.ts
```