import { Link } from 'react-router-dom';

interface HeaderProps {
  setSearchValue: (value: string) => void;
}

const Header = ({ setSearchValue }: HeaderProps) => {
  return (
    <div className='flex justify-between bg-black p-3'>
      <div className='flex justify-between w-72'>
        <Link to='/'>
          <div>Product</div>
        </Link>
        <Link to='/pages'>
          <div>Pages</div>
        </Link>
        <Link to='/price-plans'>
          <div>Price plans</div>
        </Link>
      </div>
      <div>
        <input className=' px-2 border-2 rounded border-black hover:border-white' onChange={(e) => setSearchValue(e.target.value)} placeholder='Search' type='text' />
      </div>
    </div>
  );
};

export default Header;
