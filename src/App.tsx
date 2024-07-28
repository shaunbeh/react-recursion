import {
  ChevronRightIcon,
  DocumentIcon,
  FolderIcon,
} from '@heroicons/react/24/solid';
import clsx from 'clsx';
import { useState } from 'react';

type NodeT = {
  name: string;
  folders?: NodeT[];
};

const nodes: NodeT[] = [
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
        {nodes.map((node) => (
          <FileSystemItem key={node.name} node={node} />
        ))}
      </ul>
    </div>
  );
}

export default App;

const FileSystemItem = ({ node }: { node: NodeT }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen((isOpen) => !isOpen);

  return (
    <li className='my-1.5' key={node.name}>
      <span className='flex items-center gap-1.5'>
        {node.folders ? (
          <>
            {node.folders.length > 0 ? (
              <button onClick={toggle}>
                <ChevronRightIcon
                  className={clsx(
                    'size-4 anim text-gray-500',
                    isOpen ? 'rotate-90' : ''
                  )}
                />
              </button>
            ) : (
              <div className='w-4 invisible' />
            )}
            <FolderIcon className='size-6 text-sky-500' />
          </>
        ) : (
          <DocumentIcon className='ms-[22px] size-6 text-gray-700' />
        )}
        {node.name}
      </span>
      {isOpen && (
        <ul className='ps-6'>
          {node.folders?.map((node) => (
            <FileSystemItem key={node.name} node={node} />
          ))}
        </ul>
      )}
    </li>
  );
};
