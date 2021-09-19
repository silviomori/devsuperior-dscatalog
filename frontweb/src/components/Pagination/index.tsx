import './styles.css';
import { ReactComponent as ArrowSvg } from 'assets/images/arrow.svg';
import ReactPaginate from 'react-paginate';

type Props = {
  pageCount: number;
  range: number;
  onChange?: (pageNumber: number) => void;
  forcePage?: number;
};

const Pagination = ({ pageCount, range, onChange, forcePage }: Props) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={range}
      marginPagesDisplayed={1}
      containerClassName="pagination-container"
      pageLinkClassName="pagination-item"
      activeLinkClassName="pagination-link-active"
      breakClassName="pagination-item"
      previousLabel={<div className="pagination-arrow-container"><ArrowSvg /></div>}
      previousClassName="arrow-previous"
      nextLabel={<div className="pagination-arrow-container"><ArrowSvg /></div>}
      nextClassName="arrow-next"
      disabledClassName="arrow-inactive"
      onPageChange={(items) => onChange ? onChange(items.selected) : {}}
      forcePage={forcePage}
    />
  );
};

export default Pagination;
