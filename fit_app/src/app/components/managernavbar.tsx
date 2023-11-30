// components/ManagerNavbar.tsx
import Image from 'next/image';
import Link from 'next/link';

const ManagerNavbar: React.FC = () => {

	return (
		<nav className="navbar">
			<div className="logo-container text-left">
				<Image src="/FitApp.png" alt="Logo" width={50} height={50} className="img-fluid logo" />
				<span className="hi-manager">Hi Manager! 💪🏻💪🏻</span>
			</div>
			<li className="navbar-item">
				<Link
					href='/login'>
					Log out↩
				</Link>
			</li>
		</nav>
	);
};

export default ManagerNavbar;
