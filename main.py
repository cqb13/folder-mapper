# python main.py "/path/to/directory" "/path/to/output/file"

import os
import argparse

IGNORED_DIRECTORIES = ['node_modules', 'venv', '.git', '.next']

def create_directory_map(path, indent=''):
    file_tree = ""
    files = os.listdir(path)
    files.sort()
    
    standalone_files = []
    
    for i, file in enumerate(files):
        file_path = os.path.join(path, file)
        if os.path.isdir(file_path):
            if file not in IGNORED_DIRECTORIES:
                file_tree += f"{indent}|\n"
                file_tree += f"{indent}|───{file}\n"
                file_tree += create_directory_map(file_path, indent + '|   ')
        else:
            standalone_files.append(file)
            
    if standalone_files:
        for file in standalone_files:
            file_tree = f"{indent}|   {file}\n{file_tree}"        
            
    return file_tree

def write_directory_map_to_file(path, output_file):
    file_tree = create_directory_map(path)

    parent_directory = os.path.basename(path)
    parent_directory = parent_directory.replace('_', ' ')
    parent_directory = parent_directory.replace('-', ' ')
    parent_directory = parent_directory.title()
    
    file_tree = f"{parent_directory}\n{file_tree}"
    
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(file_tree)

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Generate directory map.')
    parser.add_argument('directory_path', help='Path to the directory to map')
    parser.add_argument('output_file', help='Output file to write the directory map')

    args = parser.parse_args()

    directory_path = args.directory_path
    output_file = args.output_file

    write_directory_map_to_file(directory_path, output_file)
