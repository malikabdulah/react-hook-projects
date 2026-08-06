import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const NavItems=({link})=>{
    const [isOpen, setIsOpen] = useState(false);
    
    const toggleChild = () => {
      setIsOpen(!isOpen);
    };
    
    return (
      <div>
        <div className='gap-2'>
          <a href={link.path} className='hover:underline'>
            {link.name}
          </a>
          {link.children && (
            <button onClick={toggleChild} className='focus:outline-none ml-1'>
              {isOpen ? '-' : '+'}
            </button>
          )}
          {link.children && link.children.length > 0 ? (
            <ul className={`ml-10  ${isOpen ? '' : 'hidden'} mt-1 mb-4`}>
              {link.children.map((child) => (
                <li key={child.name}>
                  <NavItems link={child}/>
                </li>
              ))}
            </ul>
          ) : null
          }
        </div>
      </div>
    );
  };

  const showChild = (e) => {
    e.preventDefault();
    const parentLink = e.target.closest('div');
    const childList = parentLink.querySelector('ul');
    if (childList) {
      childList.classList.toggle('hidden');
    }
  };

  const Navlinks = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'About',
      path: '/about'
    },
    {
      name: 'Services',
      path: '/services',
      children: [
        {
          name: 'Web Development',
          path: '/services/web-development',
          children: [
            {
              name: 'Frontend Development',
              path: '/services/web-development/frontend'
            },
            {
              name: 'Backend Development',
              path: '/services/web-development/backend'
            }
          ]
        },
        {
          name: 'App Development',
          path: '/services/app-development'
        }
      ]
    }
  ];

  return (
    <>
    <div className='flex flex-col items-center h-screen bg-red-200 dark:bg-[#1E1E1D] text-[#1E1E1D] dark:text-[#FFFBF4]'>
    <div className='navbar mt-4'>
      {Navlinks.map((link) => (
        <NavItems key={link.name} link={link} />
      ))}
      </div>
    </div>
    </>
  )
}

export default App
