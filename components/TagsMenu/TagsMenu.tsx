'use client';

import { useEffect, useRef, useState } from 'react';
import css from './TagsMenu.module.css';
import Link from 'next/link';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(prev => !prev);

  // Закривання при кліку поза меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className={css.menuContainer}>
      <button onClick={toggleMenu} className={css.menuButton}>
        Notes ▾
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          {['all', 'Work', 'Personal', 'Meeting', 'Shopping', 'Todo'].map(
            tag => (
              <li key={tag} className={css.menuItem}>
                <Link
                  onClick={() => setIsOpen(false)}
                  href={`/notes/filter/${tag}`}
                  className={css.menuLink}
                >
                  {tag === 'all' ? 'All Notes' : tag}
                </Link>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}
