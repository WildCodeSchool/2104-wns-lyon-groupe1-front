import search from '../assets/search.svg';
import './SearchBar.scss';

export default function SearchBar() {
  return (
    <div className="SearchBar">
      <img src={search} alt={search} />
    </div>
  );
}
