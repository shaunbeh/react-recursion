import {
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';

type FolderT = {
  name: string;
  folders?: FolderT[];
};

const folders: FolderT[] = [
  {
    name: 'Home',
    folders: [
      {
        name: 'Movies',
        folders: [
          {
            name: 'Action',
            folders: [
              {
                name: '2000s',
                folders: [
                  { name: 'Gladiator.mp4' },
                  { name: 'American-Beauty.mp4' },
                ],
              },
              { name: '2010s', folders: [] },
            ],
          },
          { name: 'Comedy', folders: [{ name: '2000s', folders: [] }] },
        ],
      },
      {
        name: 'Music',
        folders: [
          { name: 'Rock', folders: [] },
          { name: 'Jazz', folders: [] },
        ],
      },
      { name: 'Pictures', folders: [] },
      { name: 'passwords.txt' },
    ],
  },
];

function App() {
  return (
    <div className='p-8 max-w-sm mx-auto'>
      <ul>
        {folders.map((folder) => (
          <Folder key={folder.name} folder={folder} />
        ))}
      </ul>
    </div>
  );
}

export default App;

const Folder = ({ folder }: { folder: FolderT }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((isOpen) => !isOpen);

  return (
    <li className='my-1.5' key={folder.name}>
      <span className='flex items-center gap-1.5'>
        {folder.folders ? (
          <>
            {folder.folders.length > 0 && (
              <button onClick={toggle}>
                <ChevronRightIcon className='size-4 text-gray-500' />
              </button>
            )}
            <FolderIcon className='size-6 text-sky-500' />
          </>
        ) : (
          <DocumentIcon className='size-6 text-gray-700' />
        )}
        {folder.name}
      </span>
      {isOpen && (
        <ul className='ps-6'>
          {folder.folders?.map((folder) => (
            <Folder key={folder.name} folder={folder} />
          ))}
        </ul>
      )}
    </li>
  );
};
