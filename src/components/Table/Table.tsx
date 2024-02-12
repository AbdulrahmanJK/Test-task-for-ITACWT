import { useState } from 'react';
import EditModal from './EditModal';

export type TDataItem = { [k: string]: any };

interface TableProps {
  className?: string;
  data: TDataItem[];
  searchValue: string;
}
export const Table = ({ data, searchValue }: TableProps) => {
  if (!data.length) {
    return 'No data';
  }
  const [selectedItem, setSelectedItem] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const filteredData = data.filter((item) =>
    Object.values(item).some(
      (value) => typeof value === 'string' && value.toLowerCase().includes(searchValue.toLowerCase())
    )
  );
  

  function openModal(item: TDataItem) {
    setSelectedItem(item);
    setIsEditModalOpen(true);
  }

  const headers: (keyof TDataItem)[] = Object.keys(data[0]);

  return (
    <div className=''>
      <div className={` *:p-1 *:border  text-start grid grid-cols-${headers.length + 1} `}>
        {headers.map((headerKey) => (
          <div className='capitalize'>{headerKey}</div>
        ))}
        <div></div>
        {filteredData.map((item) => (
          <>
            {headers.map((key) => (
              <div>{String(item[key])}</div>
            ))}

            <div>
              <button onClick={() => openModal(item)}>Edit</button>
            </div>
          </>
        ))}
      </div>
      {filteredData.length === 0 ? <div>"Nothing found..."</div> : null}

      <EditModal onClose={() => setIsEditModalOpen(false)} isOpen={isEditModalOpen} dataItem={selectedItem} />
    </div>
  );
};
export default Table;
