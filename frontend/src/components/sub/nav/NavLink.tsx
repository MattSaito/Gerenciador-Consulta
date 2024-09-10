import Link
from "next/link";

interface NavLinkProps {
  path: string;
  title: string;
}

const NavLink: React.FC<NavLinkProps> = ({path, title }) => {
  return (
    <Link href={path} className="cursor-pointer block py-2 pl-3 pr-4 text-black sm:text-xl rounded md:p-0 hover:text-[#478DF7]">
        {title}
    </Link>
  );
};

export default NavLink;
