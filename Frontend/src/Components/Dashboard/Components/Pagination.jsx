import React from "react";

function Pagination({totalPages,currentPage,onPageChange}) {

    return <>
        <ul className="pagination flex h-center unselectable">
            <li className={currentPage === 1 ? "pointer disabled" : "pointer"}>
                <span onClick={() => onPageChange(currentPage - 1)}>«</span>
            </li>
            {totalPages.map(page => (
                <li key={page} className={page === currentPage ? "pointer active" : "pointer"}>
                    <span onClick={() => onPageChange(page)}>{page}</span>
                </li>
            ))}
            <li className={currentPage === totalPages.length ? "pointer disabled" : "pointer"}>
                <span onClick={() => onPageChange(currentPage + 1)}>»</span>
            </li>
        </ul>
    </>;
}

export default Pagination