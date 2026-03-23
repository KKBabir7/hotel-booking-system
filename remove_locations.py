import re
import os

files_to_update = [
    r'e:\booking\index.html',
    r'e:\booking\rooms.html',
    r'e:\booking\index-v1.html',
    r'e:\booking\room-details.html'
]

def remove_locations(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Regex to match <p class="offer-location ...">...</p> including multi-line
    # We use re.DOTALL to match across lines if necessary, 
    # but based on grep they are mostly single line or simple blocks.
    pattern = re.compile(r'<p class="offer-location[^">]*">.*?</p>', re.DOTALL)
    
    new_content = pattern.sub('', content)

    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Updated {file_path}")
    else:
        print(f"No match in {file_path}")

for file_path in files_to_update:
    remove_locations(file_path)
