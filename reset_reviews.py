import re
import os

files_to_update = [
    r'e:\booking\index.html',
    r'e:\booking\rooms.html',
    r'e:\booking\index-v1.html',
    r'e:\booking\room-details.html'
]

def reset_reviews(file_path):
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Replace star icons
    content = content.replace('bi-star-fill', 'bi-star')

    # 2. Replace rating and review patterns like (9.8 · 120 reviews) or (4.92 · 128 Reviews)
    # Pattern: (number · number reviews)
    content = re.sub(r'\(\d+\.\d+\s*·\s*\d+\s*[Rr]eviews\)', '(0.0 · 0 reviews)', content)
    
    # 3. Target room-details.html specific patterns
    # Profile/Sidebar counts
    content = re.sub(r'(?<=\s)\d+\s+[Rr]eviews(?=\s|<)', '0 reviews', content)
    content = re.sub(r'(?<=id="reviews-tab-linkss">)\d+\.\d+\s*·\s*\d+\s*Reviews', '0.0 · 0 Reviews', content)
    content = re.sub(r'(?<=<h3 class="fw-bold mb-3">)\d+\s+reviews', '0 reviews', content)
    
    # Tab button text
    content = content.replace('id="reviews-tab-link" type="button">Reviews</button>', 'id="reviews-tab-link" type="button">Reviews (0)</button>')

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    print(f"Updated {file_path}")

for file_path in files_to_update:
    reset_reviews(file_path)
