function PageHeader({ PageNumber }) {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Airline Reservation System</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className={PageNumber === 1 ? "nav-link active" : "nav-link"} href="/flights/list">
                                Flight List
                            </a>
                        </li>
                        <li className="nav-item">
                            <a className={PageNumber === 2 ? "nav-link active" : "nav-link"} href="/flights/create">
                                Create Flight
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default PageHeader;
