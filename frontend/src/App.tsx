import { NavLink, Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";

function App() {
    const {signer, isAuthLoading, signIn} = useAuth();

    const activeClass = (isActive: boolean) => {
        const baseClass = 'nav-link';

        return isActive ? baseClass + ' nav-link-active' : baseClass;
    }

    const handleClick = () => {
        if (!signer) {
            signIn();
        }
    }
    
    return (
        <div className="app">
            <aside className="aside">
                <ul>
                    <li>
                        <NavLink to={'/'} className={({isActive}) => activeClass(isActive)}>Pools</NavLink>
                    </li>
                    {signer && <li>
                        <NavLink to={'/stacking'} className={({isActive}) => activeClass(isActive)}>Stacking</NavLink>
                    </li>}
                    {signer && <li>
                        <NavLink to={'/profile'} className={({isActive}) => activeClass(isActive)}>Profile</NavLink>
                    </li>}
                    <li>
                        <NavLink to={'/info'} className={({isActive}) => activeClass(isActive)}>Info</NavLink>
                    </li>
                </ul>
            </aside>

            <div className="sub">
                <header className="header">
                    <button onClick={handleClick}>
                        {isAuthLoading ? 'Загрузка' : signer ? 'Профиль' : 'Войти'}
                    </button>
                </header>

                <main className="main">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default App