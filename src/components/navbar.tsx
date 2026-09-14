'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react';
import { SearchIcon } from './icons';
import { usePortfolioSound } from './sound-feedback';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Work', href: '/work' },
  { label: 'Blog', href: '/blog' },
  { label: 'Resume', href: '/resume' },
];

const searchItems = [
  { label: 'Home', description: 'Profile, experience, notes and personal links', href: '/' },
  { label: 'Work', description: 'Projects and case studies', href: '/work' },
  { label: 'Blog', description: 'Writing and notes', href: '/blog' },
  { label: 'Resume', description: 'View and download my resume', href: '/resume' },
  { label: 'Experience', description: 'Jump to work experience', href: '/#experience' },
  { label: 'Development', description: 'Tools, setup and working notes', href: '/#development' },
  { label: 'Personal', description: 'Books, movies and other interests', href: '/#personal' },
];

function subscribeToPlatform() {
  return () => {};
}

function getPlatformShortcut() {
  const isApplePlatform = /Macintosh|Mac OS X|MacIntel|iPhone|iPad|iPod/i.test(
    `${navigator.userAgent} ${navigator.platform}`,
  );

  return isApplePlatform ? '⌘' : 'Ctrl';
}

function getServerShortcut() {
  return '⌘';
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { play } = usePortfolioSound();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const shortcutModifier = useSyncExternalStore(
    subscribeToPlatform,
    getPlatformShortcut,
    getServerShortcut,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const openSearch = useCallback(() => {
    if (searchOpen) return;
    play('interaction.toggle', { volume: 0.95 });
    setSearchOpen(true);
  }, [play, searchOpen]);

  const closeSearch = useCallback(() => {
    if (!searchOpen) return;
    play('interaction.toggle', { volume: 0.85 });
    setSearchOpen(false);
  }, [play, searchOpen]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (searchOpen) closeSearch();
        else openSearch();
      }
      if (event.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [closeSearch, openSearch, searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const id = window.setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.clearTimeout(id);
  }, [searchOpen]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return searchItems;
    return searchItems.filter((item) =>
      `${item.label} ${item.description}`.toLowerCase().includes(normalized),
    );
  }, [query]);

  const go = (href: string) => {
    play('interaction.tap');
    setSearchOpen(false);
    setQuery('');
    router.push(href);
  };

  return (
    <>
      <header className="site-header">
        <nav className="nav-inner" aria-label="Primary navigation">
          <div className="nav-links">
            {navItems.map((item) => {
              const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={active ? 'nav-link active' : 'nav-link'}
                  data-sound="interaction.tap"
                  data-sound-volume="0.9"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="nav-actions">
            <button className="search-trigger" onClick={openSearch} aria-label="Search this portfolio">
              <SearchIcon className="nav-icon" />
              <span className="search-hover-label">Search this portfolio</span>
              <span className="shortcut" aria-hidden="true">
                <span>{shortcutModifier}</span><span>K</span>
              </span>
            </button>
          </div>
        </nav>
      </header>

      {searchOpen && (
        <div className="search-backdrop" role="presentation" onMouseDown={closeSearch}>
          <section className="search-panel" role="dialog" aria-modal="true" aria-label="Search" onMouseDown={(e) => e.stopPropagation()}>
            <div className="search-input-row">
              <SearchIcon className="search-panel-icon" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  play('interaction.subtle', { volume: 0.72 });
                  setQuery(e.target.value);
                }}
                placeholder="Search pages and sections…"
                aria-label="Search pages and sections"
              />
              <kbd>ESC</kbd>
            </div>
            <div className="search-results">
              {filtered.length ? filtered.map((item) => (
                <button key={item.href + item.label} onClick={() => go(item.href)}>
                  <span>{item.label}</span>
                  <small>{item.description}</small>
                </button>
              )) : <p className="search-empty">Nothing found.</p>}
            </div>
          </section>
        </div>
      )}
    </>
  );
}
