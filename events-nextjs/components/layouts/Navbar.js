

export default function Navbar() {

    return (
        <nav className="navbar">
            <div className="navbar__logo">
                <img src="https://img.icons8.com/avantgarde/100/medium-priority.png"
                    alt="medium-priority"
                    className="navbar__logo-img"
                />
                <span>Event Me</span>
            </div>

            <ul className="navbar__menu">
                <li>Events</li>
                <li>Your events</li>
            </ul>
        </nav>
    );
}