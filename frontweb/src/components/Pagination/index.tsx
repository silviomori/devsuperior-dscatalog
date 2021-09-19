import './styles.css';
import { ReactComponent as ArrowSvg } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';

const Pagination = () => {
  return (
    <ReactPaginate
      pageCount={10}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      activeLinkClassName="pagination-link-active"
      breakClassName="pagination-item"
      previousLabel={<ArrowSvg />}
      previousClassName="arrow-previous"
      nextLabel={<ArrowSvg />}
      nextClassName="arrow-next"
      disabledClassName="arrow-inactive"
    />
  );
};

export default Pagination;
