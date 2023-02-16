import React from 'react';

const Paginate = ({ postsPerPage, totalPosts, paginate, previousPage, nextPage,currentPage, totalPage }) => {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="pagination-container">

            <label>Select Page : </label>
           
            <select 
                className="pagination d-flex justify-content-center" 
                onChange={(e)=>paginate(e.target.value)}
                defaultValue={currentPage}                
            >
                {/* <li onClick={previousPage} className="page-number">
                    Prev
                </li> */}
                {[...Array(totalPage)].map((number,i) => (
                    <option
                        key={i}
                        value={i+1}
                        className={
							'page-number ' + (i+1 === currentPage ? 'active' : '')
						}
                    >
                        {i+1}
                    </option>
                ))}
                {/* <li onClick={nextPage} className="page-number">
                    Next
                </li> */}
            </select>
        </div>
    );
};

export default Paginate;