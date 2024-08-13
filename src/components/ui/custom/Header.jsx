import React from 'react';
import { Button } from '../button';

const Header = () => {
  return (
    <div className=' p-3 shadow-sm flex justify-between items-center px-5'>
      <img 
        src='https://images-platform.99static.com/zudNWGHtYiWa-sqd5jqXyVt6wBE=/0x0:1773x1773/500x500/top/smart/99designs-contests-attachments/133/133463/attachment_133463156' 
        alt='Logo'
        className='h-20 w-16 object-contain'
      />
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}

export default Header;
