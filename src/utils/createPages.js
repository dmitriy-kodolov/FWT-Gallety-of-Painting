const createPages = (pages, allPages, currentPage) => {
  if (currentPage > 2) {
    if (currentPage <= allPages - 1) {
      for (let i = currentPage - 1; i < currentPage + 2; i += 1) {
        pages.push(i);
        if (currentPage === allPages) break;
      }
    } else {
      for (let i = currentPage - 2; i <= allPages; i += 1) {
        pages.push(i);
      }
    }
  } else {
    for (let i = 1; i <= 3; i += 1) {
      pages.push(i);
    }
  }
};
export default createPages;
