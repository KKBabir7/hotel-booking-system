/* ==========================================================================
   Rooms Page Interaction (Nice Guest House)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Filter Toggle
    const filterBtn = document.querySelector('.mobile-filter-btn');
    const sidebar = document.querySelector('.filter-sidebar');
    
    if (filterBtn && sidebar) {
        filterBtn.addEventListener('click', function() {
            sidebar.classList.toggle('show');
            this.textContent = sidebar.classList.contains('show') ? 'Hide Filters' : 'Show Filters';
        });
    }

    // --- Expanded Filter & Pagination Logic ---
    const itemsPerPage = 6;
    let currentPage = 1;
    let filteredCards = [];

    const roomCards = Array.from(document.querySelectorAll('.rooms-grid > div'));
    const paginationContainer = document.getElementById('rooms-pagination');
    const resultsCount = document.querySelector('.results-header strong');

    function updateDisplay() {
        const activeBadges = Array.from(document.querySelectorAll('.filter-sidebar input[id^="badge-"]:checked'))
            .map(cb => cb.id.replace('badge-', '').toLowerCase());
        const activeTypes = Array.from(document.querySelectorAll('.filter-sidebar input[id^="type-"]:checked'))
            .map(cb => cb.id.replace('type-', '').toLowerCase());
        const maxPrice = parseInt(document.getElementById('priceRange').value);

        // 1. Filter
        filteredCards = roomCards.filter(card => {
            const badgeText = card.querySelector('.offer-badge')?.textContent.toLowerCase() || '';
            const typeText = card.getAttribute('data-room-type')?.toLowerCase() || '';
            const price = parseInt(card.getAttribute('data-price') || '0');

            const badgeMatch = activeBadges.length === 0 || activeBadges.some(b => badgeText.includes(b));
            const typeMatch = activeTypes.length === 0 || activeTypes.some(t => typeText.includes(t));
            const priceMatch = price <= maxPrice;

            return badgeMatch && typeMatch && priceMatch;
        });

        // 2. Paginate
        const totalItems = filteredCards.length;
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        
        // Ensure currentPage is valid
        if (currentPage > totalPages) currentPage = totalPages || 1;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        // 3. Render Grid
        roomCards.forEach(card => card.classList.add('d-none'));
        filteredCards.slice(start, end).forEach(card => card.classList.remove('d-none'));

        // 4. Update Header
        if (resultsCount) resultsCount.textContent = totalItems;

        // 5. Render Pagination
        renderPagination(totalPages);
    }

    function renderPagination(totalPages) {
        if (!paginationContainer) return;
        paginationContainer.innerHTML = '';

        if (totalPages <= 1) return;

        // Previous
        const prevLi = document.createElement('li');
        prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
        prevLi.innerHTML = `<a class="page-link" href="#"><i class="bi bi-chevron-left"></i></a>`;
        prevLi.onclick = (e) => { e.preventDefault(); if(currentPage > 1) { currentPage--; updateDisplay(); window.scrollTo(0, 400); } };
        paginationContainer.appendChild(prevLi);

        // Pages
        for (let i = 1; i <= totalPages; i++) {
            const pageLi = document.createElement('li');
            pageLi.className = `page-item ${currentPage === i ? 'active' : ''}`;
            pageLi.innerHTML = `<a class="page-link" href="#">${i}</a>`;
            pageLi.onclick = (e) => { e.preventDefault(); currentPage = i; updateDisplay(); window.scrollTo(0, 400); };
            paginationContainer.appendChild(pageLi);
        }

        // Next
        const nextLi = document.createElement('li');
        nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
        nextLi.innerHTML = `<a class="page-link" href="#"><i class="bi bi-chevron-right"></i></a>`;
        nextLi.onclick = (e) => { e.preventDefault(); if(currentPage < totalPages) { currentPage++; updateDisplay(); window.scrollTo(0, 400); } };
        paginationContainer.appendChild(nextLi);
    }

    // Event Listeners
    document.querySelectorAll('.filter-item input, .form-range').forEach(input => {
        input.addEventListener('change', () => {
            currentPage = 1;
            updateDisplay();
        });
    });

    // Initial Display
    updateDisplay();

    // Mock Sort logic
    const sortSelect = document.querySelector('.sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            console.log('Sorting by:', this.value);
            // Real sort would re-order roomCards array then call updateDisplay()
        });
    }
});
