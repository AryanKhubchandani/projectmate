import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SessionCard } from './SessionCard';
import { SessionLessCard } from './SessionLessCard';
import { NavRoutes } from './data';

const NavElements = NavRoutes.map((nav) => {
  return {
    id: nav.id,
    icon: nav.icon,
    link: nav.link,
    name: nav.title,
  };
});

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="hidden font-lato text-xl font-medium uppercase md:text-2xl lg:block">
        project<span className="text-primary-color">mate</span>
      </h1>
      <Image
        src={'/logo.svg'}
        height={24}
        className="block lg:hidden"
        width={24}
        alt="logo"
      />
    </Link>
  );
};

export const Sidebar = () => {
  const { data: session, status } = useSession();
  const { pathname } = useRouter();
  return (
    <div className="fixed inset-0 flex h-screen w-[11%] flex-col items-center px-2 pt-6 md:items-start md:px-8 lg:w-1/4">
      <Logo />
      <ul className="mt-16 flex w-full flex-col items-center justify-center gap-4 md:items-start">
        {NavElements.map((nav) => {
          const isActive = pathname === nav.link;
          return (
            <Link key={nav.id} href={nav.link}>
              <li
                className={`flex h-9 items-center justify-center gap-4 transition-all hover:text-gray-200 md:flex-row md:items-start ${
                  isActive ? 'text-gray-200' : 'text-gray-400'
                }`}
              >
                {nav.icon}
                <span className="hidden text-lg text-gray-400 hover:text-gray-300 lg:block ">
                  {nav.name}
                </span>
              </li>
            </Link>
          );
        })}
      </ul>
      <ul className="mt-4 flex w-full flex-col items-center gap-4 border-t border-gray-800 pt-4 transition-all md:items-start">
        {status === 'authenticated' ? (
          <SessionCard
            email={session.user?.email || ''}
            name={session.user?.name || ''}
            image={session.user?.image || ''}
          />
        ) : status === 'unauthenticated' ? (
          <SessionLessCard />
        ) : (
          <div>Loading..</div>
        )}
      </ul>
    </div>
  );
};
