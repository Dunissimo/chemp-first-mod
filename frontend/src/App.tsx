import { NavLink, Outlet } from "react-router";
import { useAuth } from "./hooks/useAuth";
import { useBalance } from "./hooks/useBalance";
import { useEffect, useState } from "react";

function App() {
    const {signer, isAuthLoading, signIn} = useAuth();
    const {balance} = useBalance();

    const [formattedBalance, setFormattedBalance] = useState<string | undefined>(undefined);

    const activeClass = (isActive: boolean) => {
        const baseClass = 'nav-link';

        return isActive ? baseClass + ' nav-link-active' : baseClass;
    }

    const handleClick = () => {
        if (!signer) {
            signIn();
        }
    }

    useEffect(() => {
        setFormattedBalance(Intl.NumberFormat('RU-ru').format(Number(balance)));
    }, [balance]);

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
                    <li>
                        <NavLink to={'/info'} className={({isActive}) => activeClass(isActive)}>Info</NavLink>
                    </li>
                </ul>
            </aside>

            <div className="sub">
                <header className="header">
                    <div>
                        {signer && <>Balance: {formattedBalance} Eth</>}
                    </div>

                    <button onClick={handleClick}>
                        {isAuthLoading ? 'Loading...' : signer ? 'Profile' : 'Sign in'}
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