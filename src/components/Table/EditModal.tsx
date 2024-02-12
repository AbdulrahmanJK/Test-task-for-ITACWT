import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import { TDataItem } from './Table';

interface EditModalProps {
  className?: string;
  dataItem: TDataItem;
  isOpen: boolean;
  onClose: () => void;
}

export const EditModal = ({ dataItem, isOpen, onClose }: EditModalProps) => {
  const keys: (keyof TDataItem)[] = Object.keys(dataItem); //
  const [formValues, setFormValues] = useState<TDataItem>({});

  useEffect(() => {
    setFormValues(
      keys.reduce((acc, key) => {
        acc[key] = dataItem[key];
        return acc;
      }, {} as TDataItem)
    );
  }, [dataItem]);
  function handleApplyUpdateDataItem() {
    Object.entries(formValues).forEach(([key, value]) => (dataItem[key] = value));

    onClose();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-[#3b3b3b] p-6 text-left align-middle shadow-xl transition-all'>
                <Dialog.Title as='h3' className='text-lg font-medium leading-6 '>
                  Edit
                </Dialog.Title>
                <div className='mt-2'>
                  <p className='text-base text-white-500'>Write new data.</p>
                  {keys
                    .filter((key) => typeof dataItem[key] === 'string')
                    .map((key) => (
                      <div>
                        <span className='capitalize'>{key}:</span>
                        <input
                          className='border-2 rounded px-1 border-[#3b3b3b] hover:border-white mx-1 pt-0.5 h-6'
                          value={formValues[key]}
                          onChange={(e) => setFormValues((prev) => ({ ...prev, [key]: e.target.value }))}
                          type='text'
                          placeholder={String(key)}
                        />
                      </div>
                    ))}
                </div>

                <div className='mt-4'>
                  <button
                    type='button'
                    className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                    onClick={handleApplyUpdateDataItem}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EditModal;
