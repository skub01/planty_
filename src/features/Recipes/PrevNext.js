import React from "react";

const PrevNext = ({
  currentPage,
  totalPages,
  totalEvents,
  onPageClick,
  onNextClick,
  onPreviousClick,
}) => {
  // Function to render page buttons
  const renderPageButtons = () => {
    const pageButtons = [];
    const visiblePages = 5;

    // Calculate the range of visible page numbers
    let startPage = currentPage - 2;
    let endPage = currentPage + 2;

    // Adjust startPage and endPage to fit within total page range
    if (startPage < 1) {
      startPage = 1;
      endPage = Math.min(visiblePages, totalPages);
    }
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, totalPages - visiblePages + 1);
    }

    // Create page buttons within the visible range
    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) {
      pageButtons.push(
        <button
          onClick={() => onPageClick(pageNumber)}
          className={currentPage === pageNumber ? "active" : ""}
        >
          {currentPage === pageNumber ? (
            <strong>{pageNumber}</strong>
          ) : (
            pageNumber
          )}
        </button>
      );
    }
    return pageButtons;
  };

  // Calculate start and end results for the current page
  const startResult = (currentPage - 1) * 8 + 1;
  const endResult = Math.min(currentPage * 8, totalEvents);

  return (
    <div className="pagination-container" style={{ marginBottom: "5rem" }}>
      {totalEvents > 0 ? (
        <>
          <p className="pagination-info" style={{ fontSize: "16px" }}>
            Viewing results {startResult}-{endResult} of {totalEvents}
          </p>
          <div className="pagination-buttons">
          {currentPage !== 1 && (
              <button
                onClick={onPreviousClick}
                disabled={currentPage === 1}
                variant="outline-light"
                style={{}}
              >
                Previous
              </button>
            )}
            {renderPageButtons()}
            {currentPage !== totalPages && totalPages !== 0 && (
              <button
                onClick={onNextClick}
                disabled={currentPage === totalPages || totalPages === 0}
                variant="outline-light"
                style={{}}
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PrevNext;
